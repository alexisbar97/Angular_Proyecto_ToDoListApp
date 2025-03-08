import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ToDoListApp';
  tasks: any[] = [];
  newTask: string = '';
  editedTask: string = '';
  selectedTaskIndex: number | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
  }

  // Cargar las tareas desde el servicio
  loadTasks() {
    this.todoService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // Agregar una nueva tarea
  addTask() {
    if (this.newTask.trim() !== '') {
      const newTask = {
        task: this.newTask,
        state: 'Pending'        // Por defecto, la tarea se agrega como "Pending"
      };
      this.todoService.addTask(newTask).subscribe(() => {
        this.loadTasks();       // Recargar la lista de tareas
        this.newTask = '';      // Limpiar el input
      });
    }
  }

  // Función para detectar la tecla Enter
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {    // Verificar si la tecla presionada es Enter
      this.addTask();               // Llamar a la función addTask
    }
  }

  // Cambiar el estado de la tarea (Pending/Completed)
  toggleTaskState(index: number) {
    const task = this.tasks[index];
    const newState = task.state === 'Pending' ? 'Completed' : 'Pending';    // Cambiar el estado
    const updatedTask = { ...task, state: newState };                       // Crear una copia de la tarea con el nuevo estado

    this.todoService.updateTask(task.id, updatedTask).subscribe(() => {
      this.loadTasks();             // Recargar la lista de tareas
    });
  }

  // Editar una tarea
  editTask(index: number) {
    this.selectedTaskIndex = index;
    this.editedTask = this.tasks[index].task;
    this.openModal();               // Abrir el modal
  }

  // Guardar la tarea editada
  saveTask() {
    if (this.selectedTaskIndex !== null && this.editedTask.trim() !== '') {
      const task = this.tasks[this.selectedTaskIndex];
      const updatedTask = { ...task, task: this.editedTask };     // Crear una copia de la tarea con el texto editado

      this.todoService.updateTask(task.id, updatedTask).subscribe(() => {
        this.loadTasks();         // Recargar la lista de tareas
        this.closeModal();        // Cerrar el modal
      });
    }
  }

  // Eliminar una tarea
  deleteTask(index: number) {
    const taskId = this.tasks[index].id;
    this.todoService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();           // Recargar la lista de tareas
    });
  }

  // Abrir el modal de edición
  openModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  // Cerrar el modal de edición
  closeModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
    this.selectedTaskIndex = null;
    this.editedTask = '';
  }
}
