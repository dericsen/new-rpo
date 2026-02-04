import type { LevelDefinition } from './types';

export const levels: LevelDefinition[] = [
  {
    id: 1,
    title: 'Red Envelope Hunt',
    description: 'Find all the lucky red envelopes (angpao) hidden in the festive scene',
    targetType: 'Red Envelopes',
    targetCount: 5,
    backgroundImage: '/assets/generated/cny-scene-level1.dim_1920x1080.png',
    targetSprite: '/assets/generated/obj-angpao.dim_256x256.png',
    targetPlacements: [
      { id: 1, x: 15, y: 25, scale: 0.8 },
      { id: 2, x: 35, y: 60, scale: 0.9 },
      { id: 3, x: 55, y: 35, scale: 0.7 },
      { id: 4, x: 75, y: 70, scale: 0.85 },
      { id: 5, x: 85, y: 20, scale: 0.75 },
    ],
  },
  {
    id: 2,
    title: 'Golden Coin Quest',
    description: 'Discover all the golden coins scattered throughout the celebration',
    targetType: 'Gold Coins',
    targetCount: 5,
    backgroundImage: '/assets/generated/cny-scene-level2.dim_1920x1080.png',
    targetSprite: '/assets/generated/obj-coin.dim_256x256.png',
    targetPlacements: [
      { id: 1, x: 20, y: 40, scale: 0.8 },
      { id: 2, x: 40, y: 65, scale: 0.9 },
      { id: 3, x: 50, y: 20, scale: 0.85 },
      { id: 4, x: 70, y: 55, scale: 0.75 },
      { id: 5, x: 88, y: 30, scale: 0.8 },
    ],
  },
  {
    id: 3,
    title: 'Mochi Mystery',
    description: 'Locate all the delicious mochi treats hidden among the decorations',
    targetType: 'Mochi',
    targetCount: 5,
    backgroundImage: '/assets/generated/cny-scene-level3.dim_1920x1080.png',
    targetSprite: '/assets/generated/obj-mochi.dim_256x256.png',
    targetPlacements: [
      { id: 1, x: 18, y: 50, scale: 0.85 },
      { id: 2, x: 38, y: 30, scale: 0.9 },
      { id: 3, x: 58, y: 68, scale: 0.8 },
      { id: 4, x: 72, y: 25, scale: 0.75 },
      { id: 5, x: 82, y: 60, scale: 0.85 },
    ],
  },
];
