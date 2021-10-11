import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoCarrito, registrarVenta } from '../interfaces/productoCarrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {

  private _url = environment.url + '/carritoCompra/';

  constructor(
    private _http: HttpClient
  ) { }

  registrarVenta(carrito: registrarVenta): Observable<any> {
    return this._http.post<any>(`${this._url}`, carrito);

  }
}
