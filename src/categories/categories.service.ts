import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private model: Model<CategoryDocument>) {}

  async create(name: string) {
    const cat = new this.model({ name });
    return cat.save();
  }

  async findAll() {
    return this.model.find();
  }

  async update(id: string, name: string) {
    return this.model.findByIdAndUpdate(id, { name }, { new: true });
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
