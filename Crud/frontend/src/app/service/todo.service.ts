import { Injectable } from '@angular/core';
import { Todo } from '../../app/models/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }
  url = 'https://localhost:7028/'

  getTodo(): Observable<Todo[]>{
    return this.httpClient.get<Todo[]>(`${this.url}/v1/todos`)
  }

}
