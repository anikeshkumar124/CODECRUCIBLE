'use client';

import { codeQualityCheck, type CodeQualityCheckOutput } from '@/ai/flows/code-quality-check';
import { executeCode } from '@/ai/flows/execute-code-flow';
import { Icons } from '@/components/icons';
import CodeEditorPanel from '@/components/code-crucible/CodeEditorPanel';
import ResultsPanel from '@/components/code-crucible/ResultsPanel';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCallback, useEffect, useRef, useState } from 'react';

const defaultCode = {
  javascript: `// Welcome to Code Crucible!
function solve() {
    const input = 'World';
    console.log('Hello, ' + input);
}
solve();`,
  python: `# Welcome to Code Crucible!
def solve():
    name = 'World'
    print(f'Hello, {name}')

solve()`,
  cpp: `// Welcome to Code Crucible!
#include <iostream>
#include <string>

int main() {
    std::string name = "World";
    std::cout << "Hello, " << name << std::endl;
    return 0;
}`,
};

export type Language = keyof typeof defaultCode;

export type ExecutionOutput = {
  input?: string;
  stdout: string;
  stderr: string;
  time: string;
  memory: string;
};

export type TestCase = {
  id: number;
  name: string;
  input: string;
  expectedOutput: string;
  tag: 'easy' | 'edge' | 'boundary';
  hidden: boolean;
  exitCode: number;
};

export type TestCaseResult = TestCase & {
  pass: boolean;
  actualOutput: string;
};

export default function CodeCruciblePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [code, setCode] = useState<string>(defaultCode.javascript);
  const [language, setLanguage] = useState<Language>('javascript');
  const [customInput, setCustomInput] = useState<string>('');
  const [autoRun, setAutoRun] = useState<boolean>(false);
  const [problemStatement, setProblemStatement] = useState<string>('A simple hello world program.');

  const [output, setOutput] = useState<ExecutionOutput | null>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, name: 'Sample Case 1', input: '5', expectedOutput: 'Hello, 5', tag: 'easy', hidden: false, exitCode: 0 },
    { id: 2, name: 'Edge Case', input: '0', expectedOutput: 'Hello, 0', tag: 'edge', hidden: false, exitCode: 0 },
  ]);
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [qualitySuggestions, setQualitySuggestions] = useState<CodeQualityCheckOutput>([]);

  const [isLoadingRun, setIsLoadingRun] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingQuality, setIsLoadingQuality] = useState(false);

  const { toast } = useToast();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedState = localStorage.getItem('codeCrucibleState');
      if (savedState) {
        const { code: savedCode, language: savedLang, customInput: savedInput } = JSON.parse(savedState);
        if (savedCode) setCode(savedCode);
        if (savedLang) setLanguage(savedLang);
        if (savedInput) setCustomInput(savedInput);
      }
    } catch (error) {
      console.error('Failed to load state from localStorage', error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      const stateToSave = JSON.stringify({ code, language, customInput });
      localStorage.setItem('codeCrucibleState', stateToSave);
    }
  }, [code, language, customInput, isMounted]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setCode(defaultCode[newLang]);
    setOutput(null);
    setTestResults([]);
    setQualitySuggestions([]);
  };

  const handleRunCode = useCallback(async () => {
    setIsLoadingRun(true);
    setOutput(null);
    try {
      const startTime = performance.now();
      const result = await executeCode({
        code,
        language,
        input: customInput,
      });
      const endTime = performance.now();
      const executionTime = ((endTime - startTime) / 1000).toFixed(2);
      
      const newOutput: ExecutionOutput = {
        input: customInput,
        stdout: result.stdout,
        stderr: result.stderr,
        time: `${executionTime}s`,
        memory: 'N/A',
      };
      setOutput(newOutput);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Execution Error', description: 'Something went wrong.' });
      setOutput({ input: customInput, stdout: '', stderr: 'An unexpected error occurred.', time: '0s', memory: '0MB' });
    } finally {
      setIsLoadingRun(false);
    }
  }, [code, language, customInput, toast]);

  useEffect(() => {
    if (autoRun && isMounted) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        handleRunCode();
      }, 800);
    }
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [code, customInput, autoRun, handleRunCode, isMounted]);

  const handleSubmitCode = async () => {
    setIsLoadingSubmit(true);
    setTestResults([]);
    try {
      const results: TestCaseResult[] = [];
      for (const tc of testCases) {
        const result = await executeCode({
          code,
          language,
          input: tc.input,
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

  const handleQualityCheck = async () => {
    setIsLoadingQuality(true);
    setQualitySuggestions([]);
    try {
      const suggestions = await codeQualityCheck({
        code,
        language,
        problemStatement,
      });
      setQualitySuggestions(suggestions);
      if (suggestions.length === 0) {
        toast({ title: 'Code Quality Check', description: 'No suggestions found. Your code looks great!' });
      } else {
        toast({ title: 'Code Quality Check', description: `Found ${suggestions.length} suggestions for improvement.` });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'AI Error', description: 'Could not perform quality check.' });
    } finally {
      setIsLoadingQuality(false);
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          if (typeof content === 'string') {
            const json = JSON.parse(content);
            // Basic validation
            if (Array.isArray(json) && json.every(item => 'id' in item && 'name' in item)) {
              setTestCases(json);
              toast({ title: "Success", description: `Loaded ${json.length} test cases.` });
            } else {
              throw new Error("Invalid test case format.");
            }
          }
        } catch (err) {
          toast({ variant: 'destructive', title: 'Error loading file', description: (err as Error).message });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileDownload = () => {
    const jsonString = JSON.stringify(testCases, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-cases.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  if (!isMounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Icons.spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 p-2 md:p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-1 lg:w-3/5">
          <CodeEditorPanel
            code={code}
            setCode={setCode}
            language={language}
            onLanguageChange={handleLanguageChange}
            customInput={customInput}
            setCustomInput={setCustomInput}
            autoRun={autoRun}
            setAutoRun={setAutoRun}
            onRun={handleRunCode}
            onSubmit={handleSubmitCode}
            onQualityCheck={handleQualityCheck}
            onFileUpload={handleFileUpload}
            onFileDownload={handleFileDownload}
            isLoadingRun={isLoadingRun}
            isLoadingSubmit={isLoadingSubmit}
            isLoadingQuality={isLoadingQuality}
          />
        </div>
        <div className="flex-1 lg:w-2/5">
          <Card className="h-full min-h-[60vh] lg:min-h-0">
            <ResultsPanel
              output={output}
              testResults={testResults}
              qualitySuggestions={qualitySuggestions}
              isLoading={isLoadingRun || isLoadingSubmit || isLoadingQuality}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
