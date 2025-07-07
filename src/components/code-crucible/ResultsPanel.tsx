'use client';

import type { ExecutionOutput, TestCaseResult } from '@/app/page';
import type { CodeQualityCheckOutput } from '@/ai/flows/code-quality-check';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';

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
              <CardContent className="p-4 text-sm">
                {output.stderr ? (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-lg text-destructive">
                      🔴 Compilation/Error Output
                    </h3>
                    <div>
                      <p className="font-semibold mb-1">💥 Error:</p>
                      <pre className="font-code bg-destructive/10 text-destructive p-3 rounded-md whitespace-pre-wrap">
                        {output.stderr}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2 text-lg text-green-600">
                      🟢 Execution Result
                    </h3>
                    
                    {output.input && (
                      <div>
                        <p className="font-semibold mb-1">📥 Input:</p>
                        <pre className="font-code bg-muted p-3 rounded-md whitespace-pre-wrap">{output.input}</pre>
                      </div>
                    )}
                    
                    <div>
                      <p className="font-semibold mb-1">📤 Output:</p>
                      <pre className="font-code bg-muted p-3 rounded-md whitespace-pre-wrap">
                        {output.stdout || 'No output returned.'}
                      </pre>
                    </div>
                    
                    <p className="font-semibold">⏱️ Execution Time: {output.time || 'N/A'}</p>
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
