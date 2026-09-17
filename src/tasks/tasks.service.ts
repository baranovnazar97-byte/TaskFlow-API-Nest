import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

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

  getTaskById(id: number) {
    const find = this.tasks.find((item) => item.id === id);

    if (!find) {
      throw new NotFoundException('Task not found')
    }

    return find
  }

  updateTask(id: number, dto: UpdateTaskDto) {
    const find = this.tasks.find((item) => item.id === id);

    if (!find) {
      throw new NotFoundException('Task not found');
    }

    return Object.assign(find, dto);
  }

  deleteTask(id: number) {
    const index = this.tasks.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Task not found')
    }

    this.tasks.splice(index, 1);

    return;
  }
}
