import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('lists/:listId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(
    @Param('listId', ParseIntPipe) listId: number,
    @Body()
    createTaskDto: {
      shortDescription: string;
      longDescription?: string;
      dueDate?: Date;
    },
  ): Promise<Task> {
    return this.tasksService.create(listId, createTaskDto);
  }

  @Get()
  findAll(@Param('listId', ParseIntPipe) listId: number): Promise<Task[]> {
    return this.tasksService.findAllByList(listId);
  }

  @Get(':id')
  findOne(
    @Param('listId', ParseIntPipe) listId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.tasksService.findOne(id, listId);
  }

  @Patch(':id')
  update(
    @Param('listId', ParseIntPipe) listId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateTaskDto: {
      shortDescription?: string;
      longDescription?: string;
      dueDate?: Date;
    },
  ): Promise<Task> {
    return this.tasksService.update(id, listId, updateTaskDto);
  }
}
