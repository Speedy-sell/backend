import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDBConfig } from '../config/mongodb.config';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDBConfig.key, { useNewUrlParser: true }),
    CatsModule,
  ],
  /**
   * Try not import any controller in the main module
   * Each module has their separate controllers
   */
  controllers: [],
  /**
   * Try not import any provider in the main module
   * Each module has their separate providers
   */
  providers: [],
})
export class AppModule {}
