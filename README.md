## Local OpenCode runner

The model under test runs through OpenCode 2.1.4 using the ai-at-home monorepo's `bench/harness/opencode_client.py`. There is no direct SDK contestant loop. The adapter creates a fresh standalone OpenCode server and private configuration/session storage per trial. Set `BENCH_OPENCODE_CLIENT` when using this fork outside the monorepo. Existing SDK dependencies remain for the surrounding UI and helper/judge roles.

# skatebench

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
