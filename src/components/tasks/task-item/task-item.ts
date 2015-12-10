import { Component, CORE_DIRECTIVES, FORM_DIRECTIVES, Input, View } from 'angular2/angular2';
import { ITask } from '../../../core/task/task';
import { TaskService } from '../../../core/task/task-service';
import { Autofocus } from '../../../directives/autofocus-directive';

const styles = require('!raw!autoprefixer!sass!./task-item.scss');
const template = require('./task-item.html');


@Component({
  selector: 'task-item'
})

@View({
  directives: [
    Autofocus,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES
  ],
  styles: [styles],
  template
})

export class TaskItem {
  @Input() model: ITask;

  editing: boolean = false;
  title: string = '';

  constructor(private taskService: TaskService) {}

  delete(): void {
    this.taskService.deleteTask(this.model);
  }

  editTitle(): void {
    this.editing = true;
    this.title = this.model.title;
  }

  saveTitle(): void {
    if (this.editing) {
      const title: string = this.title.trim();
      if (title.length && title !== this.model.title) {
        this.taskService.updateTask(this.model, {title});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.taskService.updateTask(this.model, {
      completed: !this.model.completed
    });
  }
}
