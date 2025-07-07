'use client';

import React from 'react';
import type { Language } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '../icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type CodeEditorPanelProps = {
  code: string;
  setCode: (code: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  customInput: string;
  setCustomInput: (input: string) => void;
  autoRun: boolean;
  setAutoRun: (auto: boolean) => void;
  onRun: () => void;
  onSubmit: () => void;
  onQualityCheck: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDownload: () => void;
  isLoadingRun: boolean;
  isLoadingSubmit: boolean;
  isLoadingQuality: boolean;
};

const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  code,
  setCode,
  language,
  onLanguageChange,
  customInput,
  setCustomInput,
  autoRun,
  setAutoRun,
  onRun,
  onSubmit,
  onQualityCheck,
  onFileUpload,
  onFileDownload,
  isLoadingRun,
  isLoadingSubmit,
  isLoadingQuality,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Card className="h-full shadow-lg">
      <CardHeader className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold font-headline text-primary">Code Crucible</h1>
          <div className="flex items-center gap-2">
            <Label htmlFor="language-select" className="sr-only">Language</Label>
            <Select value={language} onValueChange={(val) => onLanguageChange(val as Language)}>
              <SelectTrigger id="language-select" className="w-[120px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="code-editor" className="mb-2 block font-medium">Code Editor</Label>
            <Textarea
              id="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="font-code min-h-[40vh] bg-card text-base"
              aria-label="Code Editor"
            />
          </div>
          <div>
            <Label htmlFor="custom-input" className="mb-2 block font-medium">Custom Input</Label>
            <Textarea
              id="custom-input"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Provide custom input for your code..."
              className="font-code h-24 bg-card"
              aria-label="Custom Input"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button onClick={onRun} disabled={isLoadingRun || isLoadingSubmit}>
                {isLoadingRun ? <Icons.spinner /> : <Icons.play />}
                Run Code
                <span className="text-muted-foreground text-xs">(Ctrl+Enter)</span>
              </Button>
              <Button onClick={onSubmit} disabled={isLoadingRun || isLoadingSubmit} variant="secondary">
                {isLoadingSubmit ? <Icons.spinner /> : <Icons.chevronRight />}
                Submit
                <span className="text-muted-foreground text-xs">(Ctrl+Shift+Enter)</span>
              </Button>
              <Button onClick={onQualityCheck} disabled={isLoadingQuality} variant="ghost" className="text-primary hover:text-primary">
                {isLoadingQuality ? <Icons.spinner /> : <Icons.sparkles className="text-amber-400" />}
                Check Quality
              </Button>
            </div>
            <TooltipProvider>
              <div className="flex items-center gap-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="icon">
                        <Icons.upload className="h-4 w-4" />
                        <span className="sr-only">Upload Test Cases</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Upload Test Cases (JSON)</TooltipContent>
                </Tooltip>
                <input type="file" ref={fileInputRef} onChange={onFileUpload} className="hidden" accept=".json" />
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button onClick={onFileDownload} variant="outline" size="icon">
                            <Icons.download className="h-4 w-4" />
                            <span className="sr-only">Download Test Cases</span>
                         </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download Test Cases (JSON)</TooltipContent>
                </Tooltip>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-run-switch" checked={autoRun} onCheckedChange={setAutoRun} />
                  <Label htmlFor="auto-run-switch">Auto-run</Label>
                </div>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditorPanel;
