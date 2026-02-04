import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type LevelProgress = {
    completed : Bool;
    lastUpdated : Time.Time;
  };

  type UserProgress = {
    level1 : LevelProgress;
    level2 : LevelProgress;
    level3 : LevelProgress;
  };

  public type UserProfile = {
    name : Text;
  };

  let defaultLevelProgress : LevelProgress = {
    completed = false;
    lastUpdated = 0;
  };

  let userProgressMap = Map.empty<Principal, UserProgress>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Game progress functions
  public shared ({ caller }) func markLevelCompleted(level : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save progress");
    };

    if (level < 1 or level > 3) {
      Runtime.trap("Invalid level number");
    };

    let currentProgress = switch (userProgressMap.get(caller)) {
      case (?progress) { progress };
      case (null) {
        {
          level1 = defaultLevelProgress;
          level2 = defaultLevelProgress;
          level3 = defaultLevelProgress;
        };
      };
    };

    let updatedProgress = {
      level1 = if (level == 1) {
        { completed = true; lastUpdated = Time.now() };
      } else { currentProgress.level1 };
      level2 = if (level == 2) {
        { completed = true; lastUpdated = Time.now() };
      } else { currentProgress.level2 };
      level3 = if (level == 3) {
        { completed = true; lastUpdated = Time.now() };
      } else { currentProgress.level3 };
    };

    userProgressMap.add(caller, updatedProgress);
  };

  public query ({ caller }) func getUserProgress() : async UserProgress {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access progress");
    };

    switch (userProgressMap.get(caller)) {
      case (?progress) { progress };
      case (null) {
        {
          level1 = defaultLevelProgress;
          level2 = defaultLevelProgress;
          level3 = defaultLevelProgress;
        };
      };
    };
  };

  public shared ({ caller }) func resetUserProgress() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can reset progress");
    };

    userProgressMap.remove(caller);
  };

  public query ({ caller }) func isLevelCompleted(level : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check level completion");
    };

    if (level < 1 or level > 3) {
      Runtime.trap("Invalid level number");
    };

    switch (userProgressMap.get(caller)) {
      case (?progress) {
        switch (level) {
          case (1) { progress.level1.completed };
          case (2) { progress.level2.completed };
          case (3) { progress.level3.completed };
          case (_) { false };
        };
      };
      case (null) { false };
    };
  };
};
