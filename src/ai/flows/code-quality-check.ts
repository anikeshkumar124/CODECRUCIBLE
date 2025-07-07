'use server';

/**
 * @fileOverview AI-powered code quality checker flow.
 *
 * - codeQualityCheck - Analyzes code and provides suggestions for improvements.
 * - CodeQualityCheckInput - The input type for the codeQualityCheck function.
 * - CodeQualityCheckOutput - The return type for the codeQualityCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeQualityCheckInputSchema = z.object({
  code: z.string().describe('The code to be analyzed.'),
  language: z.string().describe('The programming language of the code.'),
  problemStatement: z.string().optional().describe('The problem statement the code is trying to solve.'),
  testCaseCoverageInfo: z.string().optional().describe('Information about the test case coverage of the code.'),
});
export type CodeQualityCheckInput = z.infer<typeof CodeQualityCheckInputSchema>;

const CodeQualityCheckOutputSchema = z.array(
  z.object({
    suggestion: z.string().describe('The suggestion for improving the code.'),
    rationale: z.string().describe('The rationale behind the suggestion.'),
  })
);
export type CodeQualityCheckOutput = z.infer<typeof CodeQualityCheckOutputSchema>;

export async function codeQualityCheck(input: CodeQualityCheckInput): Promise<CodeQualityCheckOutput> {
  return codeQualityCheckFlow(input);
}

const codeQualityCheckPrompt = ai.definePrompt({
  name: 'codeQualityCheckPrompt',
  input: {schema: CodeQualityCheckInputSchema},
  output: {schema: CodeQualityCheckOutputSchema},
  prompt: `You are an AI-powered code quality checker. Analyze the given code and provide suggestions for improvements.

  Respond with an array of suggestions. Each suggestion should have a suggestion and a rationale behind that suggestion. Only include suggestions that will be of benefit to the user.

  Language: {{{language}}}
  Code:
  \`\`\`{{{language}}}
  {{{code}}}
  \`\`\`
  {{~#if problemStatement}}
  Problem Statement: {{{problemStatement}}}
  {{~/if}}
  {{~#if testCaseCoverageInfo}}
  Test Case Coverage Info: {{{testCaseCoverageInfo}}}
  {{~/if}}
  `,
});

const codeQualityCheckFlow = ai.defineFlow(
  {
    name: 'codeQualityCheckFlow',
    inputSchema: CodeQualityCheckInputSchema,
    outputSchema: CodeQualityCheckOutputSchema,
  },
  async input => {
    const {output} = await codeQualityCheckPrompt(input);
    return output!;
  }
);
