import { useResetUserProgress } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trophy, Home, RotateCcw } from 'lucide-react';

interface GameCompletePageProps {
  onBackToLevelSelect: () => void;
}

export default function GameCompletePage({ onBackToLevelSelect }: GameCompletePageProps) {
  const { mutate: resetProgress, isPending } = useResetUserProgress();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your progress? This will allow you to play all levels again.')) {
      resetProgress(undefined, {
        onSuccess: () => {
          onBackToLevelSelect();
        },
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-lg border-2 border-cny-gold shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Trophy className="w-24 h-24 text-cny-gold" />
          </div>
          <CardTitle className="text-4xl font-bold text-cny-red">
            Congratulations! 🎊
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-xl font-medium">
              You've completed all levels!
            </p>
            <p className="text-muted-foreground">
              You found all the hidden objects in the Chinese New Year celebration. 
              May the new year bring you prosperity and happiness!
            </p>
          </div>

          <div className="bg-cny-gold/10 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-center">Your Achievements:</h3>
            <ul className="text-sm space-y-1">
              <li>✅ Found 5 Red Envelopes (Angpao)</li>
              <li>✅ Found 5 Gold Coins</li>
              <li>✅ Found 5 Mochi</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={onBackToLevelSelect} size="lg" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Back to Level Select
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline" 
              size="lg" 
              className="w-full"
              disabled={isPending}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {isPending ? 'Resetting...' : 'Reset Progress'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
