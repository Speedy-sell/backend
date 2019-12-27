import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  itemCode: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  qty: { type: Number, required: false },
  rate: { type: Number, required: false },
  image: { type: Object, required: false },
});
