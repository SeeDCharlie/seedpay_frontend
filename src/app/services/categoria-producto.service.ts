import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { categoriaProducto } from '../interfaces/categoriaProducto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {

  private _url = environment.url_business + '/categoriaProducto/';


  constructor(
    private _http: HttpClient
  ) { }

  consultarCategoriaProductoPorNegocio(idNegocio: number): Observable<categoriaProducto[]> {
    return this._http.get<categoriaProducto[]>(`${this._url}negocio/${idNegocio}`);
  }

}
