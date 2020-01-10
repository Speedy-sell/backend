import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDBConfig } from '../../config';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDBConfig.key, mongoDBConfig.options),
    ItemsModule,
    UsersModule,
  ],
  /**
   * Try NOT import any controller in the main module
   * Each module has their separate controllers.
   */
  controllers: [],
  /**
   * Try NOT import any provider in the main module
   * Each module has their separate providers
   */
  providers: [],
})
export class AppModule {}
