import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { List } from './list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
@UseGuards(AuthGuard)
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post()
  async create(@Request() req, @Body('name') name: string): Promise<void> {
    await this.listsService.create(req.user.sub, name);
  }

  @Get()
  findAll(@Request() req): Promise<List[]> {
    return this.listsService.findAll(req.user.sub);
  }
}
