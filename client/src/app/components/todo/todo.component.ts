import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todos.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: any[] = [];

  showAddForm: boolean = false;
  newTodoText: string = '';
  updatedTodoText: string = '';

  constructor(
    private todoService: TodoService,
    private router: Router,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(
      (data) => {
        this.todos = data;
        console.log(data);
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }

  showAddTodoForm(): void {
    this.showAddForm = true;
  }

  addTodo(): void {
    this.todoService.addTodo({ text: this.newTodoText }).subscribe(() => {
      this.loadTodos();

      this.newTodoText = '';
      this.showAddForm = false;
    });
  }

  cancelAddTodo(): void {
    this.showAddForm = false;
  }
  updateTodo(id: string, updatedTodoData: any): void {
    this.todoService.updateTodo(id, updatedTodoData).subscribe(
      (response) => {
        console.log('Todo updated successfully:', response);
        // Refresh the list after update
        this.loadTodos();
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(
      (response) => {
        console.log('Todo deleted successfully:', response);
        // Refresh the list after delete
        this.loadTodos();
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  startEditing(todo: any): void {
    // Set isEditing to true for the selected todo
    todo.isEditing = true;
    // Set the initial value of updatedTodoText
    this.updatedTodoText = todo.text;
  }

  cancelEditing(todo: any): void {
    // Set isEditing to false for the selected todo
    todo.isEditing = false;
    // Reset the updatedTodoText
    this.updatedTodoText = '';
  }
  completeTodo(id: string): void {
    this.todoService.completeTodo(id).subscribe(() => {
      // Reload todos after completing
      this.loadTodos();
    });
  }

  logout(): void {
    this.auth.removeToken();
    this.router.navigate(['/login']);
  }
}
