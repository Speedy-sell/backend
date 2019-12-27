// tslint:disable: max-classes-per-file

import { ApiProperty } from '@nestjs/swagger';
import { Item, ImageProperties } from './index';

export class CreateItemDTO implements Item {
  @ApiProperty() code: string;
  @ApiProperty() name: string;
  @ApiProperty() qty: string;
  @ApiProperty() rate: number;
}
export class ImageUploadDTO {
  @ApiProperty({ type: 'string', format: 'binary' }) file: ImageProperties;
  @ApiProperty() code: string;
}
