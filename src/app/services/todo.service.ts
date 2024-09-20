import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../components/todo/todo.component'; // Import the Todo interface

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = '/api/todos';

  constructor(private http: HttpClient) { }

  // Get all todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // Add a new todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Specify content type
      }),
    });
  }

  // Delete a todo
  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTodo(id: string, todo: Partial<Todo>): Observable<Todo> {
    // Create a new object without the _id field
    const { _id, ...todoWithoutId } = todo;

    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todoWithoutId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}