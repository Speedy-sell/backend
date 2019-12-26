import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  name: { type: String, required: true, unique: false },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
});
