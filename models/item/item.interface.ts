import { Document } from 'mongoose';

export interface iItem extends Document {
  name: string;
  age: number;
  breed: string;
}
