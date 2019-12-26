import { Document } from 'mongoose';

export interface Item extends Document {
  name: string;
  age: number;
  breed: string;
}
