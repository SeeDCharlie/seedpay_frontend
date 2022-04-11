import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false

  public stick: boolean = false;
  public usuario: UsuarioSession;

  constructor(
    private _route: Router,
    private usuarioService: UsuarioService,
  ) {
    this._route.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.usuario = JSON.parse(sessionStorage.getItem('user')) || null;
  }

  ngOnInit(): void {
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) {
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

  logout(){
    this.usuarioService.logoutUsuario(this.usuario.id).subscribe(_response => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      this._route.navigate(['inicio']);
    });
  }

}
