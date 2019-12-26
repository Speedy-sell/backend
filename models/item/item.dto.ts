import { ApiProperty } from '@nestjs/swagger';
import { Item } from './item.interface';

export class CreateItemDTO implements Item {
  @ApiProperty() name: string;
  @ApiProperty() age: number;
  @ApiProperty() breed: string;
}
