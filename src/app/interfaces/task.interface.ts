export interface Task {
  id: string;
  task: string;
  state: 'Pending' | 'Completed';
}
