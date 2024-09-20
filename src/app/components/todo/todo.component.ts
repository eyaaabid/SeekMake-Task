import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

export interface Todo {
  _id?: string;
  task: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  task: Todo = { task: '', description: '', dueDate: '', completed: false };
  isFormOpen = false;
  isEditing = false;
  taskExists = false;
  taskAdded = false;

  constructor(private todoService: TodoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      (data: Todo[]) => {
        this.todos = data;
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  openForm(): void {
    this.isFormOpen = true;
    this.isEditing = false;
    this.resetTask();
    this.taskExists = false;
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.resetTask();
    this.taskExists = false;
  }

  resetTask(): void {
    this.task = { task: '', description: '', dueDate: '', completed: false };
  }

  addTask(): void {
    if (this.todos.some(todo => todo.task.toLowerCase() === this.task.task.toLowerCase())) {
      this.taskExists = true;
      return;
    }

    this.taskExists = false;

    const newTask: Todo = { ...this.task, completed: this.task.completed ?? false };

    this.todoService.addTodo(newTask).subscribe(
      () => {
        this.getTodos();
        this.taskAdded = true;
        setTimeout(() => { this.taskAdded = false; }, 3000);
        this.closeForm();
      },
      (error) => {
        console.error('Error adding todo:', error);
      }
    );
  }

  editTask(todo: Todo): void {
    console.log('Editing task:', todo);
    if (!todo._id) {
      console.warn('No ID provided for editing');
      return;
    }
    
    this.isEditing = true;
    this.isFormOpen = true;
    this.task = { ...todo }; 
  }

  updateTask(): void {
    if (!this.task._id) {
      console.warn('No ID provided for update');
      return;
    }

    const updatedTask: Todo = { ...this.task, completed: this.task.completed ?? false };

    this.todoService.updateTodo(this.task._id, updatedTask).subscribe(
      () => {
        this.getTodos();
        this.closeForm();
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }

  deleteTodo(id?: string): void {
    if (!id) {
      console.warn('No ID provided for deletion');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this task?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.todoService.deleteTodo(id).subscribe(
          () => {
            this.getTodos();
          },
          (error) => {
            console.error('Error deleting todo:', error);
          }
        );
      }
    });
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;

    if (!todo._id) {
      console.warn('No ID provided for toggling completion');
      return;
    }

    this.todoService.updateTodo(todo._id, todo).subscribe(
      () => {
        this.getTodos();
      },
      (error) => {
        console.error('Error toggling completion:', error);
      }
    );
  }
}