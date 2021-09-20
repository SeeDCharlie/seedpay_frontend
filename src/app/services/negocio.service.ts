import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Negocio } from '../interfaces/negocio';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private _url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }

  buscarNegociosPorNombreCategoria(nombre: String){
    return this._http.get<any>(`${this._url}/negocio/?categorias__nombre=${nombre}`);
  }

  buscarNegocioIdUsuario(id: any): Observable<any>{
    return this._http.get<any>(`${this._url}/negocio/?usuario=${id}`);
  }

  buscarNegocioId(id: any): Observable<any>{
    return this._http.get<any>(`${this._url}/negocio/${id}`);
  }

  guardarNegocio(request: Negocio): Observable<any>{
    return this._http.post(`${this._url}/negocio/`, request);
  }

  actualizarNegocio(id: string ,request: Negocio): Observable<any>{
    return this._http.put(`${this._url}/negocio/${id}/`, request);
  }

}
