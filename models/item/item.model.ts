import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface iItem {
  name: string;
  age: number;
  breed: string;
}

export class CreateItemDTO implements iItem {
  @ApiProperty() name: string;
  @ApiProperty() age: number;
  @ApiProperty() breed: string;
}

export const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
});
