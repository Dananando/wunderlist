import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
  ) {}

  async create(userId: number, name: string): Promise<void> {
    await this.listsRepository.insert({
      name,
      userId,
    });
  }

  async findAll(userId: number): Promise<List[]> {
    const lists = await this.listsRepository.find({
      where: { userId },
      relations: ['tasks'],
    });

    return lists;
  }
}
