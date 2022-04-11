import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TkConfirm } from '../interfaces/tk-confirm';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _url = environment.url_useracount;

  constructor(
    private _http: HttpClient
  ) { }

  // BUSCAR POR ID
  buscarUsuarioId(id: string): Observable<any> {
    return this._http.get<any>(`${this._url}/usuarios/${id}/`)
  }

  // BUSCAR NEGOCIOS Y SUS PRODUCTOS POR ID USUARIO
  buscarNegociosProductos(id: string): Observable<any> {
    return this._http.get<any>(`${this._url}/usuarios/${id}/negociosProductos/`)
  }

  // LOGIN
  loginUsuario(request: Usuario): Observable<any> {
    return this._http.post<any>(`${this._url}/login/`, request);
  }

  tokenConfirm(dats:TkConfirm):Observable<boolean>{
    return this._http.post<boolean>(`${this._url}isAuthenticate/`,dats)
  }

  //Logout
  logoutUsuario():Observable<any>{
    return this._http.get<any>(`${this._url}/logout/`);
  }

  // REGISTRO
  registrarUsuario(request: Usuario): Observable<any> {
    return this._http.post<any>(`${this._url}/usuarios/`, request);
  }


  // ACTUALIZAR
  actualizarUsuario(id: string, request: Usuario): Observable<any> {
    return this._http.put<any>(`${this._url}/usuarios/${id}/`, request)
  }


}
