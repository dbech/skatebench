// Runs one model on a local OpenAI-compatible server instead of the OpenRouter list.
// Configure LOCAL_BASE_URL, LOCAL_MODEL and LOCAL_API_KEY in bench/.env (see .env.example).
export const OUTPUT_DIRECTORY = process.env.SKATE_OUTPUT_DIR ?? "./results";

// A single local GPU usually serves one request at a time; fewer repeats than upstream's 30.
export const MAX_CONCURRENCY = 1;
export const TEST_RUNS_PER_MODEL = Number(process.env.SKATE_RUNS ?? 10);
export const TIMEOUT_SECONDS = 900;
export const STAGGER_DELAY_MS = 0;

import { type LanguageModel } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set; copy bench/.env.example to bench/.env`);
  return value;
}

export type RunnableModel = {
  name: string;
  llm: LanguageModel;
  providerOptions?: any;
  reasoning?: boolean;
};

// skatebench sends no output limit, so local servers would allow the whole context.
const MAX_TOKENS = Number(process.env.SKATE_MAX_TOKENS ?? 8192);
const capped: typeof fetch = async (input, init) => {
  if (init?.body && typeof init.body === "string") {
    const body = JSON.parse(init.body);
    body.max_tokens ??= MAX_TOKENS;
    init = { ...init, body: JSON.stringify(body) };
  }
  // Bun's fetch gives up after 300 s; long-reasoning local answers need longer.
  // skatebench's own TIMEOUT_SECONDS still bounds each answer.
  return fetch(input, { ...init, timeout: false } as RequestInit);
};

const local = createOpenAICompatible({
  name: "local",
  baseURL: requireEnv("LOCAL_BASE_URL"),
  apiKey: process.env.LOCAL_API_KEY,
  fetch: capped,
});

const name = process.env.LOCAL_MODEL;
if (!name) throw new Error("Set LOCAL_MODEL");

export const modelsToRun: RunnableModel[] = [{ name, llm: local(name), reasoning: true }];
