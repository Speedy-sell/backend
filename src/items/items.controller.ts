import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDTO } from './model/item.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Items')
@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('items')
  getAllcats() {
    return this.itemsService.getAllcats();
  }

  @Post('items')
  savecats(@Body() createCatDto: CreateItemDTO) {
    return this.itemsService.create(createCatDto);
  }
}
