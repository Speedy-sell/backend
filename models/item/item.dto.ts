import { ApiProperty } from '@nestjs/swagger';
import { Item } from './item.interface';

export class CreateItemDTO implements Item {
  @ApiProperty() code: string;
  @ApiProperty() name: string;
  @ApiProperty() qty: string;
  @ApiProperty() rate: number;
}
