import { Document } from 'mongoose';

export interface Item extends Document {
  code: string;
  name: string;
  qty: string;
  rate: number;
}
