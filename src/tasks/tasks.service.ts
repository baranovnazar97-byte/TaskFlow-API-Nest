import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Injectable()
export class TasksService {
  tasks: any[] = [];

  getAllTasks() {
    return this.tasks
  }

  createTask(body: CreateTaskDto) {
    this.tasks.push(body);
    return;
  }
}
