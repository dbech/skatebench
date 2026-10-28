// Non-interactive skatebench run against the local model (see constants.ts).
import { loadSuiteFromFile, testRunner } from "./index";

const file = process.argv[2] ?? "./tests/skate-trick-test.json";
const suite = await loadSuiteFromFile(file);
await testRunner({ suite, suiteFilePath: file, silent: false });
