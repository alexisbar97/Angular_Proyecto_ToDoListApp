// Importaciones necesarias para el servicio.
import { Injectable } from '@angular/core';                           // Decorador que permite inyectar el servicio en otros componentes.
import { HttpClient } from '@angular/common/http';                    // Módulo para realizar solicitudes HTTP.
import { Observable } from 'rxjs';                                    // Biblioteca para manejar flujos de datos asíncronos.
import { Task } from '../interfaces/task.interface';                  // Importa la interfaz `Task` para definir la estructura de las tareas.

// Decorador `@Injectable` que marca la clase como un servicio que puede ser inyectado.
// `providedIn: 'root'` asegura que el servicio esté disponible en toda la aplicación.
@Injectable({
  providedIn: 'root'
})

export class TodoService {
  // URL de la API simulada por `json-server`.
  // Esta URL apunta al endpoint `/tasks` en el servidor local.
  private apiUrl = 'http://localhost:3000/tasks';

  // Constructor del servicio.
  // Inyecta `HttpClient` para realizar solicitudes HTTP.
  constructor(private http: HttpClient) {}

  // Método para obtener todas las tareas.
  // Devuelve un `Observable` que emite un array de objetos `Task`.
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);                          // Realiza una solicitud GET a la API.
  }

  // Método para agregar una nueva tarea.
  // Recibe un objeto `task` (sin `id`, ya que es generado por el servidor).
  // Devuelve un `Observable` que emite la respuesta del servidor.
  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);                           // Realiza una solicitud POST a la API.
  }

  // Método para actualizar una tarea existente.
  // Recibe el `id` de la tarea y el objeto `updatedTask` con los nuevos datos.
  // Devuelve un `Observable` que emite la respuesta del servidor.
  updateTask(taskId: string, updatedTask: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}`, updatedTask);      // Realiza una solicitud PUT a la API.
  }

  // Método para eliminar una tarea.
  // Recibe el `id` de la tarea a eliminar.
  // Devuelve un `Observable` que emite la respuesta del servidor.
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`);                // Realiza una solicitud DELETE a la API.
  }
}
