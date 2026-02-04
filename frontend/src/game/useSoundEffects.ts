import { useState, useCallback, useEffect } from 'react';

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(() => {
    const stored = localStorage.getItem('cny-game-muted');
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('cny-game-muted', String(isMuted));
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const playFoundSound = useCallback(() => {
    if (isMuted) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [isMuted]);

  return {
    isMuted,
    toggleMute,
    playFoundSound,
  };
}
