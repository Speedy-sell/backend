import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}

export interface Cat {
  name: string;
  age: number;
  breed: string;
}

export const CatSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
});
