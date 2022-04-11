import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {

  private _url = environment.url_business + '/categoriaProducto/negocio/';


  constructor(
    private _http: HttpClient
  ) { }

  consultarCategoriaProducto(idNegocio: string): Observable<any> {
    return this._http.get(`${this._url}${idNegocio}`);
  }

}
