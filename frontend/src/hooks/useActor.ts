import { useEffect, useState } from 'react';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as backendIdl } from './backend.idl';
import type { BackendActor } from '../backend';
import { useInternetIdentity } from './useInternetIdentity';

type UseActorResult = {
  actor: BackendActor | null;
  isFetching: boolean;
};

const BACKEND_CANISTER_ID =
  (import.meta as any).env.VITE_BACKEND_CANISTER_ID ??
  (import.meta as any).env.CANISTER_ID_BACKEND ??
  '';

export function useActor(): UseActorResult {
  const { identity } = useInternetIdentity();
  const [actor, setActor] = useState<BackendActor | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const setup = async () => {
      if (!BACKEND_CANISTER_ID) {
        setActor(null);
        return;
      }

      setIsFetching(true);
      try {
        const agent = new HttpAgent({
          identity: identity ?? undefined,
        });

        if ((import.meta as any).env.DEV) {
          // In local development, fetch the root key for certificate validation
          await agent.fetchRootKey().catch(() => {
            // ignore if not available
          });
        }

        const createdActor = Actor.createActor<BackendActor>(backendIdl, {
          agent,
          canisterId: BACKEND_CANISTER_ID,
        });

        if (!cancelled) {
          setActor(createdActor);
        }
      } finally {
        if (!cancelled) {
          setIsFetching(false);
        }
      }
    };

    void setup();

    return () => {
      cancelled = true;
    };
  }, [identity]);

  return { actor, isFetching };
}


