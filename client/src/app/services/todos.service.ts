// TODO Service Handles all the todos operations

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos`);
  }
  addTodo(newTodo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/todos`, newTodo);
  }
  updateTodo(id: string, updatedTodoData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/todos/${id}`, updatedTodoData);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todos/${id}`);
  }
  completeTodo(id: string): Observable<any> {
    const update = { completed: true };
    return this.http.put(`${this.apiUrl}/todos/${id}`, update);
  }
}
