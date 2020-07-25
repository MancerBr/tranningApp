import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ITemplate} from './store/models';
import {TEMPLATES} from './mock';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {

  templates: ITemplate[] = [];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.templates = TEMPLATES;
  }

  goToPage(path: string) {
    this.navCtrl.navigateForward(`templates/${path}`);
  }

  get isEmpty(): boolean {
    return !this.templates.length;
  }

}
