import { useState, useRef, useEffect } from 'react';
import type { LevelDefinition } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import FoundFeedbackOverlay from '../components/game/FoundFeedbackOverlay';

interface HiddenObjectSceneProps {
  level: LevelDefinition;
  onObjectFound: () => void;
  foundCount: number;
}

export default function HiddenObjectScene({ level, onObjectFound, foundCount }: HiddenObjectSceneProps) {
  const [foundObjects, setFoundObjects] = useState<Set<number>>(new Set());
  const [feedbackPosition, setFeedbackPosition] = useState<{ x: number; y: number } | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const handleObjectClick = (objectId: number, event: React.MouseEvent) => {
    if (foundObjects.has(objectId)) return;

    setFoundObjects(prev => new Set([...prev, objectId]));
    onObjectFound();

    // Show feedback at click position
    const rect = sceneRef.current?.getBoundingClientRect();
    if (rect) {
      setFeedbackPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
      setTimeout(() => setFeedbackPosition(null), 1000);
    }
  };

  const progressPercentage = (foundCount / level.targetCount) * 100;
  const remainingCount = level.targetCount - foundCount;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{level.title}</CardTitle>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {foundCount} / {level.targetCount}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3 mt-4" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 text-muted-foreground">
            <img 
              src={level.targetSprite} 
              alt={level.targetType}
              className="w-8 h-8 object-contain"
            />
            <span>
              {remainingCount > 0 
                ? `Find ${remainingCount} more ${level.targetType.toLowerCase()}`
                : `All ${level.targetType.toLowerCase()} found!`
              }
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div 
            ref={sceneRef}
            className="relative w-full aspect-video bg-muted cursor-crosshair"
            style={{
              backgroundImage: `url(${level.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {level.targetPlacements.map((placement) => {
              const isFound = foundObjects.has(placement.id);
              const scale = placement.scale || 1;
              
              return (
                <button
                  key={placement.id}
                  onClick={(e) => handleObjectClick(placement.id, e)}
                  className={`absolute transition-all duration-300 ${
                    isFound 
                      ? 'opacity-30 cursor-default scale-110' 
                      : 'hover:scale-110 hover:drop-shadow-lg'
                  }`}
                  style={{
                    left: `${placement.x}%`,
                    top: `${placement.y}%`,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    width: '64px',
                    height: '64px',
                  }}
                  disabled={isFound}
                >
                  <img 
                    src={level.targetSprite}
                    alt={`${level.targetType} ${placement.id}`}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                  {isFound && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}

            {feedbackPosition && (
              <FoundFeedbackOverlay x={feedbackPosition.x} y={feedbackPosition.y} />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        💡 Tip: Click on the hidden objects to mark them as found
      </div>
    </div>
  );
}
