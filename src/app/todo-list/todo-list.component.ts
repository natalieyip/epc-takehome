import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo/todo.model';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  isLoadingTodoList = true; 
  
  constructor(private todoService: TodoService) {}
  
  ngOnInit(): void {
    setTimeout(() => {
      this.todoService.getTodos()
      .subscribe((todos: Todo[]) => {
        const futureTime = new Date(8640000000000000);
        this.todos = todos.sort((a, b) => {
           if (a.isComplete > b.isComplete) return 1; 
           if (b.isComplete > a.isComplete) return -1; 
           let dueDateA = a.dueDate ? +new Date(a.dueDate) : futureTime;
           let dueDateB = b.dueDate ? +new Date(b.dueDate) : futureTime;

          return +new Date(dueDateA) - +new Date(dueDateB);
        })
        this.isLoadingTodoList = false;
      });
    }, 2000)
  }

  updateTodo(id: string): void {
    const lastUpdated = this.todos.find((t) => t.id === id);
    lastUpdated!.isComplete = !lastUpdated?.isComplete;

    this.todoService.updateTodo(id, lastUpdated?.isComplete).subscribe();

    if (lastUpdated!.isComplete) {
      this.updateTodoListOrder(id);
    }
  }

  private updateTodoListOrder(id: string): void {
    const index = this.todos.findIndex((t) => t.id === id);
    const lastUpdated = this.todos.find((t) => t.id === id);
    this.todos.splice(index, 1);
    this.todos.push(lastUpdated!);
  }
}
