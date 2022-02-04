import { Injectable } from '@angular/core';
import { Todo } from '../../app/models/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }
  url = 'https://localhost:7028'

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  getTodo(): Observable<Todo[]>{
    return this.httpClient.get<Todo[]>(`${this.url}/v1/todos`)
  }
  postTodo(todo: Todo): Observable<Todo>{
    return this.httpClient.post<Todo>(`${this.url}/v1/create`,JSON.stringify(todo),this.httpOptions);
  }
  deleteTodo(todo: Todo): Observable<Todo>{
    return this.httpClient.delete<Todo>(`${this.url}/v1/delete/${todo.id}`,this.httpOptions)
  }

}
