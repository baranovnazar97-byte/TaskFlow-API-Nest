import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';

type Task = {
  id: number,
  title: string;
  completed: boolean
}

@Injectable()
export class TasksService {
  tasks: Task[] = [];
  nextId: number = 0

  getAllTasks() {
    return this.tasks
  }

  createTask(body: CreateTaskDto) {
    const task: Task = {
      id: this.nextId++,
      title: body.title,
      completed: false
    }

    this.tasks.push(task);

    return task;
  }
}
