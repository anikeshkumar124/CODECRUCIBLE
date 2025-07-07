
import type { TestCase } from './questions';

export type ExecutionOutput = {
  input?: string;
  stdout: string;
  stderr: string;
  time: string;
};

export type TestCaseResult = TestCase & {
  pass: boolean;
  actualOutput: string;
};

export type QualitySuggestion = {
  suggestion: string;
  rationale: string;
};
