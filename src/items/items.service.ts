import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, CreateItemDTO } from '../../models/item';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item')
    private readonly itemModel: Model<Item>,
  ) {}

  async create(item: CreateItemDTO) {
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
