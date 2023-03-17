import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environment';
import { map, Observable } from 'rxjs';
import { Todo } from './todo/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  private getTodosUrl: string = environment.epcGetUrl
  private updateTodoUrl: string = environment.epcUpdateUrl

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    const headers = new HttpHeaders({'x-api-key': environment.epcApiKey});
    return this.httpClient.get<Todo[]>(this.getTodosUrl, {headers: headers})
      .pipe(
        map(todos => {      
          return todos;
        })
      )
  }

  updateTodo(id: string, isComplete: boolean | undefined) {
    const headers = new HttpHeaders({'x-api-key': environment.epcApiKey, 'content-type': 'application/json'});
    const completeUrl = `${this.updateTodoUrl}/${id}`;
    return this.httpClient.patch<Todo>(completeUrl, {'isComplete': isComplete}, {headers: headers});
  }
}
