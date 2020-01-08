import { Document } from 'mongoose';

export interface User extends Document {
  _id?: number;
  email: string;
  password: string;
  emailToken: string;
  verified: boolean;
}
