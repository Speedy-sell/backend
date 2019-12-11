import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './cat.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Cat', // Has to be a capital letter `C`
        schema: CatSchema,
      },
    ]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
