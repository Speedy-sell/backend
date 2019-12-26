import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDTO, FileUploadDto } from '../../models/item/item.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { FileProperties } from '../../models/item/item.interface';

const client = new ImageAnnotatorClient({
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  async uploadFile(@Body() body, @UploadedFile() file: FileProperties) {
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
