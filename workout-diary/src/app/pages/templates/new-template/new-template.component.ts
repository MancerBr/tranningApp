import { Component, OnInit } from '@angular/core';
import {IExercise, ITemplate} from '../store/models';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss'],
})
export class NewTemplateComponent implements OnInit {

  template: ITemplate;
  exercises: IExercise[] = [];

  constructor() {}

  ngOnInit() {
    this.initTemplate();
  }

  add(ev): void {
    ev.preventDefault();
    this.exercises.push({
      name: '',
      steps: 0,
    });
    console.log('add', this.exercises);
  }

  remove(ev, id): void {
    ev.preventDefault();
    this.exercises.splice(id, 1);
    console.log('DELETE:', this.exercises);
  }

  create(): void {
    console.log('create!');
    this.template.exercises = [...this.exercises];
    console.log(this.template);
  }

  initTemplate(): void {
    this.template = {
      name: '',
      exercises: [],
    };
    this.exercises = [];
  }
}
