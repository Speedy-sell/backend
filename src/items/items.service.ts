import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { iItem } from '../models/item/item.model';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item')
    private readonly itemModel: Model<iItem>,
  ) {}

  async create(item) {
    try {
      const newItem = new this.itemModel(item);
      return await newItem.save();
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    return await this.itemModel.find();
  }
}
