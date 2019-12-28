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
  ImageAnnotatorResult,
  LabelAnnotation,
} from '../../models/item';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { storage, imageFieldName } from 'src/utils/image-upload';

const imageAnnotatorClient = new ImageAnnotatorClient({
  keyFilename: 'config/google-cloud-vision.json',
});

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
      const results: ImageAnnotatorResult[] = await imageAnnotatorClient.labelDetection(
        image.path,
      );
      const tags = this.getLabelAnnotationsDescriptions(
        results[0].labelAnnotations,
      );
      return this.itemsService.create({ itemCode, image, tags });
    } catch (err) {
      return err;
    }
  }

  getLabelAnnotationsDescriptions(
    labelAnnotations: LabelAnnotation[],
  ): string[] {
    return labelAnnotations.map(
      (labelAnnotation) => labelAnnotation.description,
    );
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
