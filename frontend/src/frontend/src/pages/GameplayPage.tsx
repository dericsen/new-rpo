import { useState, useEffect } from 'react';
import { useMarkLevelCompleted } from '../hooks/useQueries';
import { levels } from '../game/levels';
import HiddenObjectScene from '../game/HiddenObjectScene';
import { Button } from '../components/ui/button';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '../game/useSoundEffects';

interface GameplayPageProps {
  level: number;
  onLevelComplete: (level: number) => void;
  onBackToLevelSelect: () => void;
}

export default function GameplayPage({ level, onLevelComplete, onBackToLevelSelect }: GameplayPageProps) {
  const levelData = levels.find(l => l.id === level);
  const { mutate: markCompleted } = useMarkLevelCompleted();
  const { isMuted, toggleMute, playFoundSound } = useSoundEffects();
  const [foundCount, setFoundCount] = useState(0);

  useEffect(() => {
    if (foundCount === levelData?.targetCount) {
      markCompleted(level, {
        onSuccess: () => {
          setTimeout(() => {
            onLevelComplete(level);
          }, 1000);
        },
      });
    }
  }, [foundCount, levelData?.targetCount, level, markCompleted, onLevelComplete]);

  if (!levelData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Level not found</p>
      </div>
    );
  }

  const handleObjectFound = () => {
    setFoundCount(prev => prev + 1);
    playFoundSound();
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={onBackToLevelSelect}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Levels
        </Button>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <HiddenObjectScene 
        level={levelData}
        onObjectFound={handleObjectFound}
        foundCount={foundCount}
      />
    </div>
  );
}
