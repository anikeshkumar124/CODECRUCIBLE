'use client';

import type { ExecutionOutput, TestCaseResult } from '@/app/page';
import type { CodeQualityCheckOutput } from '@/ai/flows/code-quality-check';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type ResultsPanelProps = {
  output: ExecutionOutput | null;
  testResults: TestCaseResult[];
  qualitySuggestions: CodeQualityCheckOutput;
  isLoading: boolean;
};

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  output,
  testResults,
  qualitySuggestions,
  isLoading,
}) => {
  const hasTestResults = testResults.length > 0;
  const hasSuggestions = qualitySuggestions.length > 0;

  return (
    <Tabs defaultValue="output" className="h-full flex flex-col">
      <div className="p-4 pb-0">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="output">Output</TabsTrigger>
          <TabsTrigger value="test-cases" disabled={!hasTestResults}>
            Test Cases
            {hasTestResults && <Badge variant="secondary" className="ml-2">{testResults.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="quality" disabled={!hasSuggestions}>
            Code Quality
            {hasSuggestions && <Badge variant="secondary" className="ml-2">{qualitySuggestions.length}</Badge>}
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex-grow p-4 overflow-auto">
        {isLoading && !output && !hasTestResults && !hasSuggestions && (
          <div className="flex h-full items-center justify-center">
            <Icons.spinner className="h-8 w-8" />
          </div>
        )}

        <TabsContent value="output" className="h-full">
          {!output ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <Icons.play className="h-12 w-12 mb-4" />
              <p className="font-semibold">Run code to see output</p>
              <p className="text-sm">Output, errors, and execution details will appear here.</p>
            </div>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                <CardTitle className="text-sm font-medium">Execution Details</CardTitle>
                <div className="flex gap-4 text-sm">
                  <span>Time: <span className="font-mono">{output.time}</span></span>
                  <span>Memory: <span className="font-mono">{output.memory}</span></span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div>
                  <h3 className="font-semibold mb-2">Stdout:</h3>
                  <pre className="bg-muted p-3 rounded-md text-sm font-code whitespace-pre-wrap">{output.stdout || 'No standard output.'}</pre>
                </div>
                {output.stderr && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-destructive">Stderr:</h3>
                    <pre className="bg-destructive/10 text-destructive p-3 rounded-md text-sm font-code whitespace-pre-wrap">{output.stderr}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="test-cases">
           <div className="space-y-2">
            {testResults.map(result => (
              <div key={result.id} className={cn("flex items-center justify-between p-3 rounded-md", result.pass ? "bg-green-500/10" : "bg-red-500/10")}>
                <div className="flex items-center gap-3">
                    {result.pass ? <Icons.check className="h-5 w-5 text-green-500" /> : <Icons.close className="h-5 w-5 text-red-500" />}
                    <span className="font-medium">{result.name}</span>
                    <Badge variant="outline" className="capitalize">{result.tag}</Badge>
                </div>
                <div className="text-sm font-medium">
                    {result.pass ? <span className="text-green-600">Passed</span> : <span className="text-red-600">Failed</span>}
                </div>
              </div>
            ))}
           </div>
        </TabsContent>
        <TabsContent value="quality">
          <Accordion type="single" collapsible className="w-full">
            {qualitySuggestions.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-left">
                    <Icons.sparkles className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <span>{item.suggestion}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="prose prose-sm max-w-none text-muted-foreground px-2">
                    {item.rationale}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ResultsPanel;
