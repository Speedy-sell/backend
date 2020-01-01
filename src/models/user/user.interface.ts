import { Document } from 'mongoose';

export interface User extends Document {
  userId?: number;
  email: string;
  password: string;
}
