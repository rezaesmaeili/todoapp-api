import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  create(text: string): Promise<Todo> {
    const newTodo = this.todoRepository.create({ text });
    return this.todoRepository.save(newTodo);
  }

  async toggle(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (todo) {
      todo.completed = !todo.completed;
      return this.todoRepository.save(todo);
    }
    throw new Error('Todo not found');
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
