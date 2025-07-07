
'use client';

import { codeQualityCheck } from '@/ai/flows/code-quality-check';
import { executeCode } from '@/ai/flows/execute-code-flow';
import CodeEditorPanel from '@/components/code-crucible/CodeEditorPanel';
import ResultsPanel from '@/components/code-crucible/ResultsPanel';
import { Icons } from '@/components/icons';
import ProblemDescriptionPanel from '@/components/ProblemDescriptionPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { questions, type Language, type Question } from '@/lib/questions';
import type { ExecutionOutput, QualitySuggestion, TestCaseResult } from '@/lib/types';
import { debounce } from '@/lib/utils';
import { notFound, useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function QuestionPage() {
  const params = useParams<{ questionId: string }>();
  const [isMounted, setIsMounted] = useState(false);

  const question = questions.find(q => q.id === params.questionId);

  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [customInput, setCustomInput] = useState<string>('');

  const [output, setOutput] = useState<ExecutionOutput | null>(null);
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [qualitySuggestions, setQualitySuggestions] = useState<QualitySuggestion[]>([]);

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
      setQualitySuggestions([]);
    }
  };

  if (!question) {
    notFound();
  }

  const executeRun = useCallback(async () => {
    if (!question) {
      setIsLoadingRun(false);
      return;
    }

    try {
      const startTime = performance.now();

      const useDefaultInput = !customInput && question.testCases.length > 0;
      let inputForDriver: string;
      let displayInput: string;

      if (useDefaultInput) {
        inputForDriver = question.testCases[0].input;
        displayInput = question.testCases[0].input;
      } else {
        displayInput = customInput;
        inputForDriver = customInput;
      }

      let fullCode: string;
      if (language === 'cpp' && question.id === 'two-sum') {
        try {
            const parsedInput = JSON.parse(displayInput);
            const nums = parsedInput[0];
            const target = parsedInput[1];
            const nums_vector = `{${nums.join(', ')}}`;
            const target_value = `${target}`;
            fullCode = question.driverCode[language]
              .replace('{{{code}}}', code)
              .replace('{{{nums_vector}}}', nums_vector)
              .replace('{{{target_value}}}', target_value);
        } catch(e) {
            setOutput({
                input: customInput,
                stdout: '',
                stderr: 'Invalid custom input for Two Sum. Expected format: [[1,2,3], 5]',
                time: '0s',
              });
            setIsLoadingRun(false);
            return;
        }
      } else {
        fullCode = question.driverCode[language]
          .replace('{{{code}}}', code)
          .replace('{{{input}}}', inputForDriver);
      }

      const result = await executeCode({
        code: fullCode,
        language,
        input: '',
      });
      const endTime = performance.now();
      const executionTime = ((endTime - startTime) / 1000).toFixed(2);

      const newOutput: ExecutionOutput = {
        input: displayInput,
        stdout: result.stdout,
        stderr: result.stderr,
        time: `${executionTime}s`,
      };
      setOutput(newOutput);
      setTestResults([]);
      setQualitySuggestions([]);
    } catch (error: any) {
      console.error(error);
      let title = 'Execution Error';
      let description = 'An unexpected error occurred while running your code.';

      if (error.message && error.message.includes('429')) {
        title = 'API Rate Limit Exceeded';
        description =
          'You have made too many requests and may have exceeded your daily quota. Please wait a moment or try again later.';
      }

      toast({
        variant: 'destructive',
        title: title,
        description: description,
      });
      setOutput({
        input: customInput,
        stdout: '',
        stderr: description,
        time: '0s',
      });
    } finally {
      setIsLoadingRun(false);
    }
  }, [code, language, customInput, toast, question]);

  const debouncedRunCode = useMemo(() => debounce(executeRun, 800), [executeRun]);

  const handleRunCode = useCallback(() => {
    setIsLoadingRun(true);
    setOutput(null);
    setTestResults([]);
    setQualitySuggestions([]);
    debouncedRunCode();
  }, [debouncedRunCode]);

  const handleSubmitCode = async () => {
    if (!question) return;
    setIsLoadingSubmit(true);
    setTestResults([]);
    setOutput(null);
    setQualitySuggestions([]);

    try {
      const results: TestCaseResult[] = [];
      for (const tc of question.testCases) {
        let fullCode: string;

        if (language === 'cpp' && question.id === 'two-sum') {
          const parsedInput = JSON.parse(tc.input);
          const nums = parsedInput[0];
          const target = parsedInput[1];
          const nums_vector = `{${nums.join(', ')}}`;
          const target_value = `${target}`;
          fullCode = question.driverCode[language]
            .replace('{{{code}}}', code)
            .replace('{{{nums_vector}}}', nums_vector)
            .replace('{{{target_value}}}', target_value);
        } else {
          fullCode = question.driverCode[language].replace('{{{code}}}', code).replace('{{{input}}}', tc.input);
        }

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

        // Add a small delay to avoid hitting API rate limits
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setTestResults(results);
      const passCount = results.filter(r => r.pass).length;
      toast({ title: 'Submission Complete', description: `${passCount}/${results.length} test cases passed.` });

      if (passCount === results.length) {
        const qualityResult = await codeQualityCheck({
          code,
          language,
          problemStatement: question.description,
          testCaseCoverageInfo: 'All test cases passed.',
        });
        setQualitySuggestions(qualityResult);
      }
    } catch (error: any) {
      console.error(error);
      let title = 'Submission Error';
      let description = 'Could not run test cases due to an unexpected error.';

      if (error.message && error.message.includes('429')) {
        title = 'API Rate Limit Exceeded';
        description =
          'Submission failed because you may have exceeded your daily request quota. Please try again later.';
      }
      toast({ variant: 'destructive', title: title, description: description });
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
            <CardHeader>
              <CardTitle className="text-lg">Custom Input</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
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
              qualitySuggestions={qualitySuggestions}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
