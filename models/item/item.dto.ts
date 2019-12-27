// tslint:disable: max-classes-per-file

import { ApiProperty } from '@nestjs/swagger';
import { Item, ImageProperties } from './index';

export class CreateItemDTO implements Partial<Item> {
  @ApiProperty({ type: 'string', format: 'binary' }) image: ImageProperties;
  @ApiProperty() itemCode: string;
  tags: string[];
}

export class UpdateItemDTO implements Partial<Item> {
  @ApiProperty() itemCode: string;
  @ApiProperty() name: string;
  @ApiProperty() qty: number;
  @ApiProperty() rate: number;
}
