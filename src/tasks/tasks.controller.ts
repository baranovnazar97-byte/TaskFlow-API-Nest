import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.getAllTasks()
  }

  @Post()
  postTask(@Body() body: any) {
    return this.tasksService.createTask(body);
  }
}
