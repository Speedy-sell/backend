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
import { ImageAnnotatorClient } from '@google-cloud/vision';
const client = new ImageAnnotatorClient({
  keyFilename: 'config/google-cloud-vision.json',
});

@ApiTags('Items')
@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image', { dest: 'uploads/' }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateItemDTO })
  async uploadFile(@Body() body: Item, @UploadedFile() image: ImageProperties) {
    const { itemCode } = body;
    return this.itemsService.create({ itemCode, image });
    // todo: save the image labels
    // const path = file.path;
    // try {
    //   const results = await client.labelDetection(path);
    //   return results;
    // } catch (err) {
    //   // tslint:disable-next-line: no-console
    //   console.error('Unable to fetch the label of the image', err);
    // }
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
