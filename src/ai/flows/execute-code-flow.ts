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
  prompt: `You are a code execution engine. Your task is to act as a realistic compiler and runtime for the given language. You will execute the provided code and return the standard output (stdout) and standard error (stderr).

- If the code runs successfully, provide the output in the 'stdout' field. The 'stderr' field must be an empty string.
- If the code has any compilation or runtime errors, provide the exact error message in the 'stderr' field. The 'stdout' field must be an empty string.
- Do not add any explanations, introductory text, or summaries. Provide only the raw output as specified.
- For C++, if the code contains a main() function, that is the intended entry point. The surrounding code is part of a driver program and should not be considered an error.

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
