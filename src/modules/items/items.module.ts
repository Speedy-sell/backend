import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService, ImageRecognitionService } from '../../services';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from '../../models';
import { mongoDBConfig } from '../../../config';

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
