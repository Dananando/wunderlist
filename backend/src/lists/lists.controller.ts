import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { CreateListDto } from './dtos/create-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
@UseGuards(AuthGuard)
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createListDto: CreateListDto,
  ): Promise<void> {
    const { name } = createListDto;
    await this.listsService.create(req.user.sub, name);
  }

  @Get()
  findAll(@Request() req) {
    return this.listsService.findAll(req.user.sub);
  }
}
