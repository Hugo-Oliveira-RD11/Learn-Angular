import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private todoService: TodoService) { }
  todos: Array<Todo> = new Array();

  ngOnInit(): void {
    this.listarTodo()
  }
  listarTodo(){
    this.todoService.getTodo().subscribe(todo => {
      this.todos = todo;
    })
  }
}
