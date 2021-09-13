import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-cuenta',
  templateUrl: './menu-cuenta.component.html',
  styleUrls: ['./menu-cuenta.component.scss']
})
export class MenuCuentaComponent implements OnInit {

  public openDashboard: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

}
