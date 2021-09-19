import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private _url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }

  buscarProductoIdNegocio(id: any): Observable<any>{
    return this._http.get<any>(`${this._url}/producto/?negocio=${id}`);
  }

  buscarProductoId(id: any): Observable<any>{
    return this._http.get<any>(`${this._url}/producto/${id}`);
  }

  guardarProducto(request: any): Observable<any>{
    return this._http.post(`${this._url}/producto/`, request);
  }

  actualizarProducto(id: string ,request: any ): Observable<any>{
    return this._http.put(`${this._url}/producto/${id}/`, request);
  }


}
