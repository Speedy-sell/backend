import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
