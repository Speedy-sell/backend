export interface User {
  _id?: number;
  email: string;
  password: string;
  emailToken: string;
  verified: boolean;
}
