import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private _url = environment.url + "/producto/";

  constructor(
    private _http: HttpClient
  ) { }

  buscarProductoIdNegocio(id: any): Observable<any>{
    return this._http.get<any>(`${this._url}?negocio=${id}`);
  }

  buscarProductoId(id: any): Observable<any>{
    return this._http.get<any>(`${this._url}${id}`);
  }

  guardarProducto(request: any): Observable<any>{
    return this._http.post(`${this._url}`, request);
  }

  actualizarProducto(id: string ,request: any ): Observable<any>{
    return this._http.put(`${this._url}${id}/`, request);
  }


}
