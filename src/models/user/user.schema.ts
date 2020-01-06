import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailToken: { type: String, required: true },
  verified: { type: Boolean, required: true },
});
