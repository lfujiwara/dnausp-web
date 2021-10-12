import { GoogleAuthData, RawGoogleAuthData } from "./google-auth-data";

export const GoogleAuthDataReducer = (value: RawGoogleAuthData):GoogleAuthData => ({
  accessToken: value.tokenObj.access_token,
  idToken: value.tokenObj.id_token,
  scope: value.tokenObj.scope,
  profile: {
    email: value.profileObj.email,
    givenName: value.profileObj.givenName,
    familyName: value.profileObj.familyName,
    name: value.profileObj.name,
    imageUrl: value.profileObj.imageUrl,  
  }
})