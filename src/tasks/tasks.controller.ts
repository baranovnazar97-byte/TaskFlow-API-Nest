import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { type Request } from 'express';
import { AuthGuard } from '../auth/auth.guard.js';
import { RolesGuard } from '../roles/roles.guard.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('token')
  getToken() {
    return this.tasksService.createToken();
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('test')
  getAll(@Req() request: Request) {
    return request.user;
  }

  @Post()
  postTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.tasksService.getTaskById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(Number(id), dto);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }
}
