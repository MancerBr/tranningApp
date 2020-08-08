import { Component, OnInit } from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';

import {MENU} from './menu.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuItems = MENU;

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {}

  goToPage(pathName: string): void {
    this.menu.toggle();
    this.navCtrl.navigateRoot(`/${pathName}`, { animated: false });
    // this.router.navigate([`/${pathName}`]);
  }

}
