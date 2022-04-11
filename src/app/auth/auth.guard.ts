import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { TkConfirm } from '../interfaces/tk-confirm';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  private tkConfirm: TkConfirm = JSON.parse("{}")
  private confirmTk: boolean

  constructor(private _router: Router,
              private authService:UsuarioService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | UrlTree | Promise<boolean> | UrlTree | boolean | UrlTree {
    return this.checkToken();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | UrlTree | Promise<boolean> | UrlTree | boolean | UrlTree {
    return this.checkToken();
  }

  checkToken():boolean{
    let usuarioSe:Usuario = JSON.parse(sessionStorage.getItem("user") || "{}" ) as Usuario
    this.tkConfirm.usuario = usuarioSe.id
    this.tkConfirm.token = sessionStorage.getItem('token') || ''
    this.authService.tokenConfirm(this.tkConfirm).subscribe(
      data => {
        this.confirmTk = data
        if(this.confirmTk){
          this._router.navigate(['/inicio'])
        }
      }, error => {
        console.log("Fallo al conectarse : " + JSON.stringify(error.error));
        this.confirmTk = false
        this._router.navigate(['auth/login'])
      });
    return this.confirmTk
  }
}
