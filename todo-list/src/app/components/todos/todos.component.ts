import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/Todo';
import { createNgModule } from '@angular/compiler/src/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];

  constructor(private todoService:TodoService) { }


  ngOnInit(){
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo){
    // Delete in UI
    this.todos = this.todos.filter(t => t.id !== todo.id)


    // Delete on Server
    this.todoService.deleteTodo(todo).subscribe(todo => {
      console.log(todo)
    })
  }

  addTodo(todo:Todo){

    // Add on Server
    this.todoService.addTodo(todo).subscribe(todo => {
      console.log(todo)

      // Add in UI
      this.todos.push(todo);
    })
  }

}
