import { Module } from '@nestjs/common';
import { CatsController } from './items.controller';
import { CatsService } from './items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './model/item.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Item', // Has to be a capital letter `C`
        schema: CatSchema,
      },
    ]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
