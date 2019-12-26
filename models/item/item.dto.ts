// tslint:disable: max-classes-per-file

import { ApiProperty } from '@nestjs/swagger';
import { Item, FileProperties } from './item.interface';

export class CreateItemDTO implements Item {
  @ApiProperty() code: string;
  @ApiProperty() name: string;
  @ApiProperty() qty: string;
  @ApiProperty() rate: number;
}
export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' }) file: FileProperties;
  @ApiProperty() code: string;
}
