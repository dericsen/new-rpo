import { levels } from '../game/levels';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';

interface LevelCompletePageProps {
  level: number;
  onBackToLevelSelect: () => void;
  onNextLevel: () => void;
}

export default function LevelCompletePage({ level, onBackToLevelSelect, onNextLevel }: LevelCompletePageProps) {
  const levelData = levels.find(l => l.id === level);
  const hasNextLevel = level < 3;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-lg border-2 border-green-500/50 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="w-20 h-20 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-cny-red">
            Level Complete! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">
              You found all {levelData?.targetCount} {levelData?.targetType}!
            </p>
            <p className="text-muted-foreground">
              Great job completing {levelData?.title}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {hasNextLevel && (
              <Button onClick={onNextLevel} size="lg" className="w-full">
                Next Level
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            <Button onClick={onBackToLevelSelect} variant="outline" size="lg" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Back to Level Select
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
