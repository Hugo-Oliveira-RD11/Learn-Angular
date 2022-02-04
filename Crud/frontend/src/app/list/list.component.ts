import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Todo } from '../models/todo';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private todoService: TodoService) { }
  todo = {} as Todo;

  todos: Array<Todo> = new Array();

  ngOnInit(): void {
    this.listarTodo();
  }
  listarTodo(){
    this.todoService.getTodo().subscribe(todos => {
      this.todos = todos;
      console.log(todos);
    })
  }
  postTodo(form: NgForm){
    this.todoService.postTodo(this.todo).subscribe(() => {
      this.cleanForm(form)
      console.log(form)
      this.listarTodo()

    })
  }
  deleteTodo(todo: Todo){
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.listarTodo()
    })
  }
  cleanForm(form: NgForm) {
    form.resetForm();
    this.todo = {} as Todo;
  }
}
