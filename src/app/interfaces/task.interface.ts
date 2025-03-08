// Define la estructura de una tarea en la aplicación.
export interface Task {
  id: string;                           // Identificador único de la tarea.
  task: string;                         // Descripción de la tarea.
  state: 'Pending' | 'Completed';       // Estado: 'Pending' (Pendiente) o 'Completed' (Completada).
}
