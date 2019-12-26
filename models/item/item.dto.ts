import { ApiProperty } from '@nestjs/swagger';
import { iItem } from './item.interface';

export class CreateItemDTO implements iItem {
  @ApiProperty() name: string;
  @ApiProperty() age: number;
  @ApiProperty() breed: string;
}
