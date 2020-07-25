import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private cdRef: ChangeDetectorRef,
    private screenOrientation: ScreenOrientation,
  ) { }

  ngOnInit() {
  }

}
