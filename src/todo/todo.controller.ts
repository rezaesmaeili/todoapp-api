import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.findAll();
  }

  @Post()
  createTodo(@Body('text') text: string) {
    return this.todoService.create(text);
  }

  @Patch(':id')
  toggleTodo(@Param('id') id: number) {
    return this.todoService.toggle(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.remove(id);
  }
}
