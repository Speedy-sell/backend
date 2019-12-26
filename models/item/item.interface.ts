import { Document } from 'mongoose';

export interface Item extends Document {
  code: string;
  name: string;
  qty: string;
  rate: number;
}
export interface FileProperties {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
