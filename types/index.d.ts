export interface GoogleUserProp {
  name: string;
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  photo: string;
}
export interface BackendUserProp {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  profilePicture: {
    fileId: string;
    url: strig;
  };
  bannerImage: {
    fileId: sttrig;
    url: string;
  };
  bio: string;
  location: string;
  oauthId: string;
  oauthProvider: string;
  roles?: string[];
  updatedAt: Date;
  createdAt: Date;
  permission: string[];
}
export interface TokenProp {
  token: string;
}

export type UserProps = BackendUserProp | GoogleUserProp;
