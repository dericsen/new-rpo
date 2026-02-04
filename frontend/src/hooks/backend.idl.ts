// Very minimal IDL stub so TypeScript can compile.
// For real canister calls you should replace this with the generated IDL from `dfx generate backend`.

import { IDL } from '@dfinity/candid';

export const idlFactory: IDL.InterfaceFactory = ({ IDL }) => {
  const LevelProgress = IDL.Record({
    completed: IDL.Bool,
    lastUpdated: IDL.Int,
  });

  const UserProgress = IDL.Record({
    level1: LevelProgress,
    level2: LevelProgress,
    level3: LevelProgress,
  });

  const UserProfile = IDL.Record({
    name: IDL.Text,
  });

  return IDL.Service({
    getCallerUserProfile: IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    getUserProfile: IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], ['query']),
    saveCallerUserProfile: IDL.Func([UserProfile], [], []),
    markLevelCompleted: IDL.Func([IDL.Nat], [], []),
    getUserProgress: IDL.Func([], [UserProgress], ['query']),
    resetUserProgress: IDL.Func([], [], []),
    isLevelCompleted: IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
  });
};


