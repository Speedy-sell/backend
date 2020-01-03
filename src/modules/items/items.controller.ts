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
} from '../../models';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, imageFieldName } from '../../utils';
import { ImageRecognitionService } from '../../services/image-recognition/image-recognition.service';

@ApiTags('Items')
@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private imageRecognitionService: ImageRecognitionService,
  ) {}

  @Post('item') // API Path
  @UseInterceptors(FileInterceptor(imageFieldName, { storage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateItemDTO })
  async uploadFile(@Body() body: Item, @UploadedFile() image: ImageProperties) {
    const { itemCode } = body;
    try {
      const tags = await this.imageRecognitionService.getTags(image.path);
      return await this.itemsService.create({ itemCode, image, tags });
    } catch (err) {
      return err;
    }
  }

  @Put('items')
  save(@Body() updateItemDTO: UpdateItemDTO) {
    // tslint:disable-next-line: no-console
    console.log('update', updateItemDTO);
    // return this.itemsService.create(updateItemDTO);
  }

  @Get('items')
  getAll() {
    return this.itemsService.getAll();
  }
}
