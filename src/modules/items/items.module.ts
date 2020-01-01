import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from '../../models';
import { ImageRecognitionService } from '../../services/image-recognition/image-recognition.service';
import { mongoDBConfig } from '../../../config/mongodb.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: mongoDBConfig.collectionName.item,
        schema: ItemSchema,
      },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ImageRecognitionService],
})
export class ItemsModule {}
