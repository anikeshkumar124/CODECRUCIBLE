
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Question } from '@/lib/questions';

type ProblemDescriptionPanelProps = {
  question: Question;
};

const ProblemDescriptionPanel: React.FC<ProblemDescriptionPanelProps> = ({ question }) => {
  const difficultyColor = {
    Easy: 'bg-green-500/10 text-green-700 border-green-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
    Hard: 'bg-red-500/10 text-red-700 border-red-500/20',
  };

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{question.title}</CardTitle>
          <Badge className={cn('text-sm', difficultyColor[question.difficulty])}>
            {question.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: question.description }}
        />
      </CardContent>
    </Card>
  );
};

export default ProblemDescriptionPanel;
