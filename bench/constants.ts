// Runs one model on a local OpenAI-compatible server instead of the OpenRouter list.
// Configure LOCAL_BASE_URL, LOCAL_MODEL and LOCAL_API_KEY in bench/.env (see .env.example).
export const OUTPUT_DIRECTORY = process.env.SKATE_OUTPUT_DIR ?? "./results";

// A single local GPU usually serves one request at a time; fewer repeats than upstream's 30.
export const MAX_CONCURRENCY = 1;
export const TEST_RUNS_PER_MODEL = Number(process.env.SKATE_RUNS ?? 10);
export const TIMEOUT_SECONDS = 900;
export const STAGGER_DELAY_MS = 0;

export type RunnableModel = {
  name: string;
  providerOptions?: any;
  reasoning?: boolean;
};
const name = process.env.LOCAL_MODEL;
if (!name || !process.env.LOCAL_BASE_URL) throw new Error("Set LOCAL_MODEL and LOCAL_BASE_URL");
export const modelsToRun: RunnableModel[] = [{ name, reasoning: true }];
