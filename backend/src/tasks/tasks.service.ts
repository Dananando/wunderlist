import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(
    listId: number,
    data: {
      shortDescription: string;
      longDescription?: string;
      dueDate?: Date;
    },
  ): Promise<Task> {
    const task = this.tasksRepository.create({
      ...data,
      list: { id: listId },
    });
    return this.tasksRepository.save(task);
  }

  async findOne(id: number, listId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, list: { id: listId } },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async findAllByList(listId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { list: { id: listId } },
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    id: number,
    listId: number,
    data: {
      shortDescription?: string;
      longDescription?: string;
      dueDate?: Date;
    },
  ): Promise<Task> {
    const task = await this.findOne(id, listId);
    Object.assign(task, data);
    return this.tasksRepository.save(task);
  }
}
