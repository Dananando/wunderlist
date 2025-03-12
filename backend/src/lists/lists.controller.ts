import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { List } from './list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
@UseGuards(AuthGuard)
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post()
  create(@Request() req, @Body('name') name: string): Promise<List> {
    return this.listsService.create(req.user.sub, name);
  }

  @Get(':id')
  findOne(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<List> {
    return this.listsService.findOne(id, req.user.sub);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.listsService.delete(id, req.user.sub);
  }
}
