import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
  ) {}

  async create(userId: number, name: string): Promise<List> {
    const list = this.listsRepository.create({
      name,
      user: { id: userId },
    });
    return list;
  }

  async findOne(id: number, userId: number): Promise<List> {
    const list = await this.listsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['tasks'],
    });
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    return list;
  }

  async delete(id: number, userId: number): Promise<void> {
    const result = await this.listsRepository.delete({
      id,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
  }
}
