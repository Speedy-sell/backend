import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDTO } from './model/item.model';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Items')
@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('items')
  getAll() {
    return this.itemsService.getAll();
  }

  @Post('items')
  save(@Body() createitemDTO: CreateItemDTO) {
    return this.itemsService.create(createitemDTO);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return 'hey';
  }
}
