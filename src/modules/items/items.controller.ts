import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import {
  CreateItemDTO,
  ImageProperties,
  UpdateItemDTO,
  Item,
} from '../../models/item';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, imageFieldName } from 'src/utils/image-upload';
import { getTags } from 'src/utils/image-recognition';

@ApiTags('Items')
@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('item') // API Path
  @UseInterceptors(FileInterceptor(imageFieldName, { storage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateItemDTO })
  async uploadFile(@Body() body: Item, @UploadedFile() image: ImageProperties) {
    const { itemCode } = body;
    try {
      const tags = await getTags(image.path);
      return this.itemsService.create({ itemCode, image, tags });
    } catch (err) {
      return err;
    }
  }

  @Put('items')
  save(@Body() updateItemDTO: UpdateItemDTO) {
    console.log('update', updateItemDTO);
    // return this.itemsService.create(updateItemDTO);
  }

  @Get('items')
  getAll() {
    return this.itemsService.getAll();
  }
}
