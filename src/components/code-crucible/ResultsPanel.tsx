
'use client';

import type { ExecutionOutput, QualitySuggestion, TestCaseResult } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';
import QualityReportPanel from './QualityReportPanel';

type ResultsPanelProps = {
  output: ExecutionOutput | null;
  testResults: TestCaseResult[];
  qualitySuggestions: QualitySuggestion[];
  isLoading: boolean;
};

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  output,
  testResults,
  qualitySuggestions,
  isLoading,
}) => {
  const hasTestResults = testResults.length > 0;
  const hasQualitySuggestions = qualitySuggestions.length > 0;
  
  const activeTab = output ? 'output' : hasTestResults ? 'test-cases' : hasQualitySuggestions ? 'quality-report' : 'output';

  return (
    <Tabs defaultValue={activeTab} key={activeTab} className="h-full flex flex-col">
      <div className="p-4 pb-0">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="output">Run Output</TabsTrigger>
          <TabsTrigger value="test-cases">Submission Results</TabsTrigger>
          <TabsTrigger value="quality-report">Quality Report</TabsTrigger>
        </TabsList>
      </div>

      <div className="flex-grow p-4 overflow-auto">
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <Icons.spinner className="h-8 w-8" />
          </div>
        )}

        <TabsContent value="output" className="mt-0">
          {!isLoading && !output && (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <Icons.play className="h-12 w-12 mb-4" />
              <p className="font-semibold">Run code to see output</p>
              <p className="text-sm">Output from a single run will appear here.</p>
            </div>
          )}
          {output && (
            <Card>
              <CardContent className="p-4 text-sm">
                {output.stderr ? (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-lg text-destructive">
                      🔴 Error
                    </h3>
                    <pre className="font-code bg-destructive/10 text-destructive p-3 rounded-md whitespace-pre-wrap">
                      {output.stderr}
                    </pre>
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
        <TabsContent value="test-cases" className="mt-0">
            {!isLoading && !hasTestResults && (
                 <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                    <Icons.chevronRight className="h-12 w-12 mb-4" />
                    <p className="font-semibold">Submit code to run test cases</p>
                    <p className="text-sm">Pass/fail results for all test cases will appear here.</p>
                </div>
            )}
           {hasTestResults && (
            <div className="space-y-2">
                {testResults.map(result => (
                <Card key={result.id} className={cn(result.pass ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20")}>
                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                            {result.pass ? <Icons.check className="h-5 w-5 text-green-500" /> : <Icons.close className="h-5 w-5 text-red-500" />}
                            <span className="font-medium">{result.name}</span>
                            {result.hidden && <Badge variant="outline">Hidden</Badge>}
                        </div>
                        <div className="text-sm font-medium">
                            {result.pass ? <span className="text-green-600">Passed</span> : <span className="text-red-600">Failed</span>}
                        </div>
                    </div>
                    {!result.pass && (
                        <div className="border-t border-red-500/20 px-3 py-2 text-xs font-mono bg-red-500/5">
                            <p><span className="font-sans font-semibold">Input:    </span>{result.input}</p>
                            <p><span className="font-sans font-semibold">Expected: </span>{result.expectedOutput}</p>
                            <p><span className="font-sans font-semibold">Got:      </span>{result.actualOutput}</p>
                        </div>
                    )}
                </Card>
                ))}
            </div>
           )}
        </TabsContent>
        <TabsContent value="quality-report" className="mt-0">
            {!isLoading && !hasQualitySuggestions && (
                 <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                    <Icons.sparkles className="h-12 w-12 mb-4" />
                    <p className="font-semibold">Submit your code to get an AI quality report</p>
                    <p className="text-sm">Suggestions for improvement will appear here after a successful submission.</p>
                </div>
            )}
            {hasQualitySuggestions && (
                <QualityReportPanel suggestions={qualitySuggestions} />
            )}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ResultsPanel;
