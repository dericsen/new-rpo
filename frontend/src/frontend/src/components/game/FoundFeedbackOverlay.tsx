import { useEffect, useState } from 'react';

interface FoundFeedbackOverlayProps {
  x: number;
  y: number;
}

export default function FoundFeedbackOverlay({ x, y }: FoundFeedbackOverlayProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="absolute pointer-events-none z-50 animate-ping"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-16 h-16 bg-cny-gold/50 rounded-full flex items-center justify-center">
        <span className="text-2xl">✨</span>
      </div>
    </div>
  );
}
