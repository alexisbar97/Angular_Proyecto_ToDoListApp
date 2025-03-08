import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Agregar una nueva tarea
  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  // Actualizar una tarea
  updateTask(taskId: string, updatedTask: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}`, updatedTask);
  }

  // Eliminar una tarea
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`);
  }
}
