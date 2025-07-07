
'use client';

import React from 'react';
import type { Language } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '../icons';

type CodeEditorPanelProps = {
  code: string;
  setCode: (code: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onRun: () => void;
  onSubmit: () => void;
  isLoadingRun: boolean;
  isLoadingSubmit: boolean;
};

const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  code,
  setCode,
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  isLoadingRun,
  isLoadingSubmit,
}) => {
  return (
    <Card className="h-full shadow-lg">
      <CardHeader className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-xl">Code Editor</CardTitle>
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
            <Label htmlFor="code-editor" className="sr-only">Code</Label>
            <Textarea
              id="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="font-code min-h-[50vh] bg-card text-base"
              aria-label="Code Editor"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button onClick={onRun} disabled={isLoadingRun || isLoadingSubmit}>
                {isLoadingRun ? <Icons.spinner /> : <Icons.play />}
                Run
                <span className="text-muted-foreground text-xs ml-1">(Ctrl+Enter)</span>
              </Button>
              <Button onClick={onSubmit} disabled={isLoadingRun || isLoadingSubmit} variant="secondary">
                {isLoadingSubmit ? <Icons.spinner /> : <Icons.chevronRight />}
                Submit
                <span className="text-muted-foreground text-xs ml-1">(Ctrl+Shift+Enter)</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditorPanel;
