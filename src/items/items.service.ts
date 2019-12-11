import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { iItem } from './model/item.model';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item')
    private readonly catModel: Model<iItem>,
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
