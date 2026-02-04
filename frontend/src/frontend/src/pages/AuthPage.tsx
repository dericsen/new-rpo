import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useCurrentUserProfile';
import LoginLogoutButton from '../components/auth/LoginLogoutButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function AuthPage() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-lg border-2 border-cny-gold/20 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/assets/generated/ui-lantern.dim_256x256.png" 
              alt="Lantern" 
              className="w-24 h-24 object-contain"
            />
          </div>
          <CardTitle className="text-4xl font-bold text-cny-red">
            Chinese New Year
          </CardTitle>
          <CardDescription className="text-lg">
            Hidden Object Game
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-muted-foreground">
              Find hidden objects in festive Chinese New Year scenes! Complete all 3 levels to celebrate the new year.
            </p>
            {isAuthenticated && userProfile && (
              <p className="text-sm font-medium text-cny-red">
                Welcome back, {userProfile.name}! 🎉
              </p>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-sm">Game Features:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>🧧 Level 1: Find 5 Red Envelopes (Angpao)</li>
                <li>🪙 Level 2: Find 5 Gold Coins</li>
                <li>🍡 Level 3: Find 5 Mochi</li>
              </ul>
            </div>
            
            <div className="flex justify-center">
              <LoginLogoutButton />
            </div>
            
            {!isAuthenticated && (
              <p className="text-xs text-center text-muted-foreground">
                Sign in to save your progress and compete across sessions
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
