import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  itemCode: { type: String, required: true, unique: true },
  name: { type: String },
  qty: { type: Number },
  rate: { type: Number },
  image: { type: Object },
  tags: { type: Object },
});
