'use server';
/**
 * @fileOverview An AI-powered code execution flow.
 *
 * - executeCode - Simulates the execution of code and returns the output.
 * - ExecuteCodeInput - The input type for the executeCode function.
 * - ExecuteCodeOutput - The return type for the executeCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExecuteCodeInputSchema = z.object({
  code: z.string().describe('The code to be executed.'),
  language: z.string().describe('The programming language of the code.'),
  input: z.string().optional().describe('The standard input to the code.'),
});
export type ExecuteCodeInput = z.infer<typeof ExecuteCodeInputSchema>;

const ExecuteCodeOutputSchema = z.object({
  stdout: z.string().describe('The standard output of the code execution.'),
  stderr: z.string().describe('The standard error of the code execution. If there are no errors, this should be an empty string.'),
});
export type ExecuteCodeOutput = z.infer<typeof ExecuteCodeOutputSchema>;

export async function executeCode(input: ExecuteCodeInput): Promise<ExecuteCodeOutput> {
  return executeCodeFlow(input);
}

const executeCodePrompt = ai.definePrompt({
  name: 'executeCodePrompt',
  input: {schema: ExecuteCodeInputSchema},
  output: {schema: ExecuteCodeOutputSchema},
  prompt: `You are a code execution engine. You will be given a piece of code in a specific language and optional standard input. Your task is to execute the code and provide the standard output (stdout) and standard error (stderr).

You must act as a realistic compiler and runtime for the given language. If the code runs successfully, provide the output in the stdout field. The stderr field should be empty. If the code has any compilation or runtime errors, provide the error message in the stderr field, and the stdout field should be empty. Do not provide any explanation, just the raw output.

Follow the specific validation rules for the provided language below.

*** C++ Validation Rules ***
- If required headers (e.g., <iostream>, <cstdio>) are present for I/O operations.
- main() function exists and is correctly defined.
- All statements end with semicolons.
- return 0; is used in main(), if applicable.
- All braces {} are balanced.
- Namespace usage (std::) is correct.
- No undefined variables or functions are used.
- Give detailed compiler-style errors. For example, if you are given C++ code that uses \`std::cout\` or \`std::cin\` without \`#include <iostream>\`, you MUST produce a compilation error in \`stderr\`. A suitable error would be \`error: 'std::cout' was not declared in this scope\`.

*** Python Validation Rules ***
- Check for correct indentation (multiples of 4 spaces).
- Ensure that all variables are declared before use.
- Check for missing colons in if, for, while, def, and class statements.
- Ensure proper use of parentheses and brackets.
- Validate function definitions and calls.
- Catch common runtime issues like division by zero or use of None.
- Output Python-style error messages with line numbers.

*** JavaScript Validation Rules ***
- Ensure all variables are declared using let, const, or var.
- Check for missing semicolons where needed.
- Detect undeclared variables or functions.
- Check for mismatched or unclosed {}, (), or [].
- Ensure if, for, while, and function declarations use correct syntax.
- Validate use of return in functions where expected.
- Detect common pitfalls like == vs ===.
- Output JS-style console errors.

---

Language: {{{language}}}
{{~#if input}}
Standard Input:
{{{input}}}
{{~else}}
Standard Input: (none)
{{~/if}}

Code to execute:
\`\`\`{{{language}}}
{{{code}}}
\`\`\`
`,
});

const executeCodeFlow = ai.defineFlow(
  {
    name: 'executeCodeFlow',
    inputSchema: ExecuteCodeInputSchema,
    outputSchema: ExecuteCodeOutputSchema,
  },
  async input => {
    const {output} = await executeCodePrompt(input);
    return output!;
  }
);
