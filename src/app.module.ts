import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDBConfig } from '../config/mongodb.config';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDBConfig.key, { useNewUrlParser: true }),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
