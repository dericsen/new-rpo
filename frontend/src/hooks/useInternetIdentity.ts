import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import type { Identity } from '@dfinity/agent';

type InternetIdentityContextValue = {
  identity: Identity | null;
  isInitializing: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const InternetIdentityContext = createContext<InternetIdentityContextValue | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export function InternetIdentityProvider({ children }: ProviderProps) {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const client = await AuthClient.create();
        if (!cancelled) {
          if (await client.isAuthenticated()) {
            setIdentity(client.getIdentity());
          }
        }
      } finally {
        if (!cancelled) {
          setIsInitializing(false);
        }
      }
    };

    void init();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async () => {
    const client = await AuthClient.create();

    await client.login({
      identityProvider:
        (import.meta as any).env.VITE_II_CANISTER_URL ??
        'https://identity.ic0.app',
      onSuccess: () => {
        setIdentity(client.getIdentity());
      },
    });
  };

  const logout = async () => {
    const client = await AuthClient.create();
    await client.logout();
    setIdentity(null);
  };

  const value: InternetIdentityContextValue = {
    identity,
    isInitializing,
    login,
    logout,
  };

  return (
    <InternetIdentityContext.Provider value={value}>
      {children}
    </InternetIdentityContext.Provider>
  );
}

export function useInternetIdentity(): InternetIdentityContextValue {
  const ctx = useContext(InternetIdentityContext);
  if (!ctx) {
    throw new Error('useInternetIdentity must be used within InternetIdentityProvider');
  }
  return ctx;
}


