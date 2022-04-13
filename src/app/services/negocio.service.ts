import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Negocio } from '../interfaces/negocio';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private _url = environment.url_business + "/negocio/";

  constructor(
    private _http: HttpClient
  ) { }

  buscarNegociosPorNombreCategoria(palabra: String){
    return this._http.get<any>(`${this._url}?categorias__nombre=${palabra}`);
  }

  buscarNegocioIdUsuario(id: number): Observable<Negocio[]>{
    return this._http.get<Negocio[]>(`${this._url}?usuario=${id}`);
  }

  buscarNegocioId(id: any): Observable<any>{
    return this._http.get<any>(`${this._url}${id}`);
  }

  guardarNegocio(request: Negocio): Observable<Negocio>{
    return this._http.post<Negocio>(`${this._url}`, request);
  }

  actualizarNegocio(id: number ,request: Negocio): Observable<Negocio>{
    return this._http.put<Negocio>(`${this._url}${id}/`, request);
  }

  getNegocios():Observable<Negocio[]>{
    return this._http.get<Negocio[]>(`${this._url}`);
  }

  eliminarNegocio(id:number):Observable<any>{
    return this._http.delete<any>(`${this._url}${id}`);
  }

}
