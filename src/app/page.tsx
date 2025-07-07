
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { questions } from '@/lib/questions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function QuestionListPage() {
  const difficultyColor = {
    Easy: 'bg-green-500/10 text-green-700 border-green-500/20 hover:bg-green-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 hover:bg-yellow-500/20',
    Hard: 'bg-red-500/10 text-red-700 border-red-500/20 hover:bg-red-500/20',
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="bg-primary text-primary-foreground py-12 px-6 text-center">
        <h1 className="text-5xl font-bold font-headline">Code Crucible</h1>
        <p className="mt-2 text-lg opacity-90">Sharpen Your Coding Skills</p>
      </header>
      
      <main className="container mx-auto max-w-4xl py-8 px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">Select a Challenge</h2>
        <div className="space-y-4">
          {questions.map((q) => (
            <Link key={q.id} href={`/questions/${q.id}`} passHref>
              <Card className="hover:shadow-lg hover:border-primary/50 transition-all duration-200 group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{q.title}</CardTitle>
                    <Badge className={cn('text-sm', difficultyColor[q.difficulty])}>
                      {q.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="pt-2">{q.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center text-sm text-primary group-hover:underline">
                        Start Coding <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
