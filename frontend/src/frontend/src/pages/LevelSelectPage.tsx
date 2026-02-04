import { useEffect } from 'react';
import { useGetUserProgress } from '../hooks/useQueries';
import { useGetCallerUserProfile } from '../hooks/useCurrentUserProfile';
import { levels } from '../game/levels';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, Lock, Play } from 'lucide-react';
import LoginLogoutButton from '../components/auth/LoginLogoutButton';

interface LevelSelectPageProps {
  onPlayLevel: (level: number) => void;
  onGameComplete: () => void;
}

export default function LevelSelectPage({ onPlayLevel, onGameComplete }: LevelSelectPageProps) {
  const { data: progress, isLoading } = useGetUserProgress();
  const { data: userProfile } = useGetCallerUserProfile();

  const allLevelsCompleted = progress?.level1.completed && progress?.level2.completed && progress?.level3.completed;

  useEffect(() => {
    if (allLevelsCompleted) {
      onGameComplete();
    }
  }, [allLevelsCompleted, onGameComplete]);

  const getLevelStatus = (levelNum: number) => {
    if (!progress) return { completed: false, locked: false };
    
    switch (levelNum) {
      case 1:
        return { completed: progress.level1.completed, locked: false };
      case 2:
        return { completed: progress.level2.completed, locked: false };
      case 3:
        return { completed: progress.level3.completed, locked: false };
      default:
        return { completed: false, locked: false };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading your progress...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-cny-red mb-2">Select a Level</h1>
          {userProfile && (
            <p className="text-muted-foreground">Welcome, {userProfile.name}!</p>
          )}
        </div>
        <LoginLogoutButton />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {levels.map((level) => {
          const status = getLevelStatus(level.id);
          
          return (
            <Card 
              key={level.id} 
              className={`border-2 transition-all hover:shadow-lg ${
                status.completed 
                  ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20' 
                  : status.locked 
                  ? 'border-muted opacity-60' 
                  : 'border-cny-gold/30 hover:border-cny-gold'
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={status.completed ? 'default' : 'outline'} className="text-xs">
                    Level {level.id}
                  </Badge>
                  {status.completed && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {status.locked && (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="text-xl">{level.title}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={level.backgroundImage} 
                    alt={level.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <img 
                    src={level.targetSprite} 
                    alt={level.targetType}
                    className="w-6 h-6 object-contain"
                  />
                  <span>Find {level.targetCount} {level.targetType}</span>
                </div>
                <Button 
                  onClick={() => onPlayLevel(level.id)}
                  disabled={status.locked}
                  className="w-full"
                  variant={status.completed ? 'outline' : 'default'}
                >
                  {status.completed ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play Again
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Level
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
