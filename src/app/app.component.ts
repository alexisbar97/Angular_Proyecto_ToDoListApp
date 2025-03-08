import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  loadTasks() {
    this.todoService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.todoService.addTask(this.newTask).subscribe(() => {
        this.loadTasks();
        this.newTask = '';
      });
    }
  }

  editTask(index: number) {
    this.selectedTaskIndex = index;
    this.editedTask = this.tasks[index].task;
    this.openModal();
  }

  saveTask() {
    if (this.selectedTaskIndex !== null && this.editedTask.trim() !== '') {
      const taskId = this.tasks[this.selectedTaskIndex].id;
      this.todoService.updateTask(taskId, this.editedTask).subscribe(() => {
        this.loadTasks();
        this.closeModal();
      });
    }
  }

  deleteTask(index: number) {
    const taskId = this.tasks[index].id;
    this.todoService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  openModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

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
