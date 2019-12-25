import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDTO } from '../../models/item/item.model';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'config/google-cloud-vision.json',
});

@ApiTags('Items')
@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('items')
  getAll() {
    return this.itemsService.getAll();
  }

  @Post('items')
  save(@Body() createItemDTO: CreateItemDTO) {
    return this.itemsService.create(createItemDTO);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  async uploadFile(@UploadedFile() file) {
    // todo: save the image details
    // Eg: file name, type, size, etc.
    const path = file.path;
    try {
      const results = await client.labelDetection(path);
      return results;
    } catch (err) {
      // tslint:disable-next-line: no-console
      console.error('Unable to fetch the label of the image', err);
    }
  }
}
