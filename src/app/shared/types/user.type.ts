export interface LoginUserInput {
  email: string;
  password: string;
}

export interface RegisteUserInput {
  email: string;
  password: string;
  displayName: string;
}

export interface User {
  uid: string;
  displayName: string;
  email: string;
  role: userRoles;
}

export enum userRoles {
  ADMIN = 'ADMIN',
  DEFAULT = 'DEFAULT',
}
