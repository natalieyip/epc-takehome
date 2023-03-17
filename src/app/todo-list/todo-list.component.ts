import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo/todo.model';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService) {}
  
  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe((todos: Todo[]) => {
        this.todos = todos.sort((a, b) => {
           if (a.isComplete > b.isComplete) return 1; 
           if (b.isComplete > a.isComplete) return -1; 
           
           return +new Date(b.dueDate) - +new Date(a.dueDate);
        })
      });
  }

}
