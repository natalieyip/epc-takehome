import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environment';
import { map, Observable } from 'rxjs';
import { Todo } from './todo/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  private getTodoUrl: string = environment.epcGetUrl

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    let headers = new HttpHeaders({'x-api-key': environment.epcApiKey});
    return this.httpClient.get<Todo[]>(this.getTodoUrl, {headers: headers})
      .pipe(
        map(todos => {      
          return todos;
        })
      )
  }
}
