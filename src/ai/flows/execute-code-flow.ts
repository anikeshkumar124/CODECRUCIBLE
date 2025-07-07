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
