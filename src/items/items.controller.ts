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
  save(@Body() createitemDTO: CreateItemDTO) {
    return this.itemsService.create(createitemDTO);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    console.log(file);
    const path = 'src/resources/orange.jpg';

    // try {
    //   const results = await client.labelDetection(path);
    //   return results;
    // } catch (err) {
    //   console.error('ERROR:', err);
    // }

    // return path;
  }
}
