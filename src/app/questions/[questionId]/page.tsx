
'use client';

import { executeCode } from '@/ai/flows/execute-code-flow';
import { Icons } from '@/components/icons';
import CodeEditorPanel from '@/components/code-crucible/CodeEditorPanel';
import ResultsPanel from '@/components/code-crucible/ResultsPanel';
import ProblemDescriptionPanel from '@/components/ProblemDescriptionPanel';
import { useToast } from '@/hooks/use-toast';
import { questions, type Language, type Question, type TestCase } from '@/lib/questions';
import { notFound, useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

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

export default function QuestionPage() {
  const params = useParams<{ questionId: string }>();
  const [isMounted, setIsMounted] = useState(false);
  
  const question = questions.find(q => q.id === params.questionId);
  
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [customInput, setCustomInput] = useState<string>('');
  
  const [output, setOutput] = useState<ExecutionOutput | null>(null);
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);

  const [isLoadingRun, setIsLoadingRun] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    if (question) {
        // Load saved state from local storage
        try {
          const savedState = localStorage.getItem(`codeCrucible-${question.id}`);
          if (savedState) {
            const { code: savedCode, language: savedLang } = JSON.parse(savedState);
            if (savedCode) setCode(savedCode);
            if (savedLang) setLanguage(savedLang);
          } else {
            // Or set boilerplate
            setCode(question.boilerplate[language]);
          }
        } catch (error) {
          console.error('Failed to load state from localStorage', error);
          setCode(question.boilerplate[language]);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question?.id]);
  
  useEffect(() => {
    if (isMounted && question) {
      const stateToSave = JSON.stringify({ code, language });
      localStorage.setItem(`codeCrucible-${question.id}`, stateToSave);
    }
  }, [code, language, isMounted, question]);
  
  const handleLanguageChange = (newLang: Language) => {
    if (question) {
      setLanguage(newLang);
      setCode(question.boilerplate[newLang]);
      setOutput(null);
      setTestResults([]);
    }
  };

  if (!question) {
    notFound();
  }

  const handleRunCode = useCallback(async () => {
    if (!question) return;

    setIsLoadingRun(true);
    setOutput(null);
    try {
      const startTime = performance.now();
      
      let inputForDriver: string;
      const useDefaultInput = !customInput && question.testCases.length > 0;

      if (useDefaultInput) {
        inputForDriver = question.testCases[0].input;
      } else {
        // For problems expecting a string literal, we need to format it correctly.
        if (question.id === 'valid-parentheses') {
            // User types (), but driver needs "()". JSON.stringify handles this.
            inputForDriver = JSON.stringify(customInput);
        } else {
            // For 'two-sum', driver wraps input in quotes, so we pass raw value.
            inputForDriver = customInput;
        }
      }

      const fullCode = question.driverCode[language]
        .replace('{{{code}}}', code)
        .replace('{{{input}}}', inputForDriver);

      const result = await executeCode({
        code: fullCode,
        language,
        input: '',
      });
      const endTime = performance.now();
      const executionTime = ((endTime - startTime) / 1000).toFixed(2);
      
      const newOutput: ExecutionOutput = {
        input: customInput || question.testCases[0].input,
        stdout: result.stdout,
        stderr: result.stderr,
        time: `${executionTime}s`,
      };
      setOutput(newOutput);
      setTestResults([]); // Clear test results when running with custom input
    } catch (error) {
      toast({ variant: 'destructive', title: 'Execution Error', description: 'Something went wrong.' });
      setOutput({ input: customInput, stdout: '', stderr: 'An unexpected error occurred.', time: '0s' });
    } finally {
      setIsLoadingRun(false);
    }
  }, [code, language, customInput, toast, question]);

  const handleSubmitCode = async () => {
    if (!question) return;
    setIsLoadingSubmit(true);
    setTestResults([]);
    setOutput(null);

    try {
      const results: TestCaseResult[] = [];
      for (const tc of question.testCases) {
        const fullCode = question.driverCode[language]
            .replace('{{{code}}}', code)
            .replace('{{{input}}}', tc.input);

        const result = await executeCode({
          code: fullCode,
          language,
          input: '',
        });

        const pass = result.stdout.trim() === tc.expectedOutput.trim() && !result.stderr;
        results.push({
          ...tc,
          pass,
          actualOutput: result.stdout || result.stderr,
        });
      }

      setTestResults(results);
      const passCount = results.filter(r => r.pass).length;
      toast({ title: 'Submission Complete', description: `${passCount}/${results.length} test cases passed.` });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Submission Error', description: 'Could not run test cases.' });
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (event.shiftKey) {
            handleSubmitCode();
          } else {
            handleRunCode();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode, handleSubmitCode]);


  if (!isMounted || !question) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Icons.spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 p-2 md:p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-1 lg:w-3/5 flex flex-col gap-4">
          <ProblemDescriptionPanel question={question} />
          <Card>
            <CardHeader><CardTitle className="text-lg">Custom Input</CardTitle></CardHeader>
            <CardContent>
              <Textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter custom input for 'Run' action. If empty, first sample case will be used."
                  className="font-code h-24 bg-card"
                  aria-label="Custom Input"
                />
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 lg:w-2/5 flex flex-col gap-4">
          <CodeEditorPanel
            code={code}
            setCode={setCode}
            language={language}
            onLanguageChange={handleLanguageChange}
            onRun={handleRunCode}
            onSubmit={handleSubmitCode}
            isLoadingRun={isLoadingRun}
            isLoadingSubmit={isLoadingSubmit}
          />
          <Card className="flex-grow">
            <ResultsPanel
              output={output}
              testResults={testResults}
              isLoading={isLoadingRun || isLoadingSubmit}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
