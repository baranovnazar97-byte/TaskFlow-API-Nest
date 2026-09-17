import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  tasks: any[] = [];

  getAllTasks() {
    return this.tasks
  }

  createTask(body: any) {
    this.tasks.push(body);
    return;
  }
}
