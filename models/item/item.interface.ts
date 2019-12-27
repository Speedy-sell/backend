import { Document } from 'mongoose';

export interface Item extends Document {
  itemCode: string;
  name: string;
  qty: number;
  rate: number;
}
export interface ImageProperties {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
