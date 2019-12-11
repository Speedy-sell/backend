import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './model/item.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Item', // Has to be a capital letter `C`
        schema: ItemSchema,
      },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class CatsModule {}
