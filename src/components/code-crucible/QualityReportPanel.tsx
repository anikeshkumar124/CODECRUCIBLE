'use client';

import type { QualitySuggestion } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Icons } from '../icons';
import { Lightbulb } from 'lucide-react';

type QualityReportPanelProps = {
  suggestions: QualitySuggestion[];
};

const QualityReportPanel: React.FC<QualityReportPanelProps> = ({ suggestions }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Icons.sparkles className="h-6 w-6" />
          AI Quality Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((item, index) => (
            <div key={index} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <p className="flex-grow">{item.suggestion}</p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size="sm" className="flex-shrink-0">Why?</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Rationale</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.rationale}
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityReportPanel;
