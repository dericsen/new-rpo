import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useActor } from './hooks/useActor';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import AuthPage from './pages/AuthPage';
import LevelSelectPage from './pages/LevelSelectPage';
import GameplayPage from './pages/GameplayPage';
import LevelCompletePage from './pages/LevelCompletePage';
import GameCompletePage from './pages/GameCompletePage';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import CnyLayout from './components/layout/CnyLayout';
import { ThemeProvider } from 'next-themes';

type Screen = 'auth' | 'level-select' | 'gameplay' | 'level-complete' | 'game-complete';

function App() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [completedLevel, setCompletedLevel] = useState<number>(1);

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Navigate to level select after authentication and profile setup
  useEffect(() => {
    if (isAuthenticated && userProfile && currentScreen === 'auth') {
      setCurrentScreen('level-select');
    }
  }, [isAuthenticated, userProfile, currentScreen]);

  // Reset to auth screen when logged out
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentScreen('auth');
    }
  }, [isAuthenticated]);

  const handlePlayLevel = (level: number) => {
    setSelectedLevel(level);
    setCurrentScreen('gameplay');
  };

  const handleLevelComplete = (level: number) => {
    setCompletedLevel(level);
    setCurrentScreen('level-complete');
  };

  const handleBackToLevelSelect = () => {
    setCurrentScreen('level-select');
  };

  const handleGameComplete = () => {
    setCurrentScreen('game-complete');
  };

  const handleNextLevel = () => {
    if (completedLevel < 3) {
      setSelectedLevel(completedLevel + 1);
      setCurrentScreen('gameplay');
    } else {
      setCurrentScreen('level-select');
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CnyLayout>
        {showProfileSetup && <ProfileSetupDialog />}
        
        {currentScreen === 'auth' && <AuthPage />}
        
        {currentScreen === 'level-select' && isAuthenticated && (
          <LevelSelectPage onPlayLevel={handlePlayLevel} onGameComplete={handleGameComplete} />
        )}
        
        {currentScreen === 'gameplay' && isAuthenticated && (
          <GameplayPage 
            level={selectedLevel} 
            onLevelComplete={handleLevelComplete}
            onBackToLevelSelect={handleBackToLevelSelect}
          />
        )}
        
        {currentScreen === 'level-complete' && isAuthenticated && (
          <LevelCompletePage 
            level={completedLevel}
            onBackToLevelSelect={handleBackToLevelSelect}
            onNextLevel={handleNextLevel}
          />
        )}
        
        {currentScreen === 'game-complete' && isAuthenticated && (
          <GameCompletePage onBackToLevelSelect={handleBackToLevelSelect} />
        )}
      </CnyLayout>
    </ThemeProvider>
  );
}

export default App;
