import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }

  // LOGIN
  loginUsuario(request: Usuario): Observable<any> {
    return this._http.post<any>(`${this._url}/token-auth/`, request);
  }

  // REGISTRO
  registrarUsuario(request: Usuario): Observable<any> {
    return this._http.post<any>(`${this._url}/usuarios/`, request);
  }

}
