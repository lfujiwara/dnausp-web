export type RawGoogleAuthData = {
  profileObj: {
    googleId: string;
    name: string;
    givenName: string;
    familyName: string;
    email: string;
    imageUrl: string;
  };
  tokenObj: {
    access_token: string;
    id_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
  };
};

export type GoogleAuthData = {
  accessToken: string;
  idToken: string;
  scope: string;
  profile: {
    email: string;
    name: string;
    givenName: string;
    familyName: string;
    imageUrl: string;
  };
};

export type GoogleAuthManager = {
  signIn: () => void;
  signOut: () => void;
  isAuthLoaded: boolean;
  isSignedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  data: GoogleAuthData;
};
