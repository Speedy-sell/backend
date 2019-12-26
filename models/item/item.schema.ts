import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
});
