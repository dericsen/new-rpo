export interface LevelDefinition {
  id: number;
  title: string;
  description: string;
  targetType: string;
  targetCount: number;
  backgroundImage: string;
  targetSprite: string;
  targetPlacements: TargetPlacement[];
}

export interface TargetPlacement {
  id: number;
  x: number;
  y: number;
  scale?: number;
}
