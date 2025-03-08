// Importaciones necesarias para el componente.
import { Component, OnInit } from '@angular/core';                                      // Decoradores para definir un componente y manejar el ciclo de vida.
import { FormsModule } from '@angular/forms';                                           // Módulo para el manejo de formularios y two-way data binding.
import { CommonModule } from '@angular/common';                                         // Módulo para directivas comunes como *ngFor y *ngIf.
import { TodoService } from './services/todo.service';                                  // Servicio para interactuar con la API de tareas.
import { Task } from './interfaces/task.interface';

// Decorador `@Component` que define el componente.
// Selecciona el selector 'app-root', que se usa en el archivo `index.html`.
// Especifica la plantilla HTML (`app.component.html`) y los estilos CSS (`app.component.css`).
@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],                                                 // Importa módulos necesarios para la plantilla.
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // Propiedad `title` que representa el título de la aplicación.
  title = 'ToDoListApp';

  // Propiedad `tasks` que almacena la lista de tareas.
  // Es un array de objetos que siguen la interfaz `Task`.
  tasks: Task[] = [];

  // Propiedad `newTask` que almacena el texto de la nueva tarea ingresada por el usuario.
  newTask: string = '';

  // Propiedad `editedTask` que almacena el texto de la tarea que se está editando.
  editedTask: string = '';

  // Propiedad `selectedTaskIndex` que almacena el índice de la tarea seleccionada para editar.
  selectedTaskIndex: number | null = null;

  // Constructor del componente.
  // Inyecta el servicio `TodoService` para interactuar con la API.
  constructor(private todoService: TodoService) {}

  // Método del ciclo de vida `ngOnInit`.
  // Se ejecuta cuando el componente se inicializa.
  ngOnInit() {
    this.loadTasks();                                                                   // Carga las tareas al iniciar el componente.
  }

  // Método para cargar las tareas desde el servicio.
  loadTasks() {
    this.todoService.getTasks().subscribe(tasks => {
      this.tasks = tasks;                                                               // Asigna las tareas obtenidas a la propiedad `tasks`.
    });
  }

  // Método para agregar una nueva tarea.
  addTask() {
    if (this.newTask.trim() !== '') {                                                   // Verifica que el texto no esté vacío.
      const newTask = {
        task: this.newTask,
        state: 'Pending'                                                                // Por defecto, la tarea se agrega como "Pending".
      };
      this.todoService.addTask(newTask).subscribe(() => {
        this.loadTasks();                                                               // Recarga la lista de tareas después de agregar una nueva.
        this.newTask = '';                                                              // Limpia el input.
      });
    }
  }

  // Método para detectar la tecla Enter.
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {                                                        // Verifica si la tecla presionada es Enter.
      this.addTask();                                                                   // Llama a la función `addTask`.
    }
  }

  // Método para cambiar el estado de una tarea (Pending/Completed).
  toggleTaskState(index: number) {
    const task = this.tasks[index];
    const newState = task.state === 'Pending' ? 'Completed' : 'Pending';                // Cambia el estado.
    const updatedTask = { ...task, state: newState };                                   // Crea una copia de la tarea con el nuevo estado.

    this.todoService.updateTask(task.id, updatedTask).subscribe(() => {
      this.loadTasks();                                                                 // Recarga la lista de tareas.
    });
  }

  // Método para editar una tarea.
  editTask(index: number) {
    this.selectedTaskIndex = index;                                                     // Almacena el índice de la tarea seleccionada.
    this.editedTask = this.tasks[index].task;                                           // Asigna el texto de la tarea a `editedTask`.
    this.openModal();                                                                   // Abre el modal de edición.
  }

  // Método para guardar la tarea editada.
  saveTask() {
    if (this.selectedTaskIndex !== null && this.editedTask.trim() !== '') {
      const task = this.tasks[this.selectedTaskIndex];
      const updatedTask = { ...task, task: this.editedTask };                           // Crea una copia de la tarea con el texto editado.

      this.todoService.updateTask(task.id, updatedTask).subscribe(() => {
        this.loadTasks();                                                               // Recarga la lista de tareas.
        this.closeModal();                                                              // Cierra el modal.
      });
    }
  }

  // Método para eliminar una tarea.
  deleteTask(index: number) {
    const taskId = this.tasks[index].id;
    this.todoService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();                                                                 // Recarga la lista de tareas.
    });
  }

  // Método para abrir el modal de edición.
  openModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.add('show');                                                      // Muestra el modal.
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  // Método para cerrar el modal de edición.
  closeModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.remove('show');                                                   // Oculta el modal.
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
    this.selectedTaskIndex = null;                                                      // Reinicia el índice seleccionado.
    this.editedTask = '';                                                               // Limpia el texto editado.
  }
}
