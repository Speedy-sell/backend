import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { iCat } from './cat.model';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cat')
    private readonly catModel: Model<iCat>,
  ) {}

  async create(cat) {
    try {
      const newCat = new this.catModel(cat);
      return await newCat.save();
    } catch (error) {
      return error;
    }
  }

  async getAllcats() {
    return await this.catModel.find();
  }
}
