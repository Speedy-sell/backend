import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from '../../models/item';
import { ImageRecognitionService } from '../../services/image-recognition/image-recognition.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Item', // Collection Name: has to match exactly with the database including the case
        schema: ItemSchema,
      },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ImageRecognitionService],
})
export class ItemsModule {}
