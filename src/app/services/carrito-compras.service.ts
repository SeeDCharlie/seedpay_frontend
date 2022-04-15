import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Factura } from '../interfaces/factura';
import { ProductoCarrito, RegistrarVenta } from '../interfaces/productoCarrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {

  private _url = environment.url_business + '/ventas/';

  constructor(
    private _http: HttpClient
  ) { }

  registrarVenta(carrito: RegistrarVenta): Observable<Factura> {
    return this._http.post<Factura>(`${this._url}`, carrito);
  }
}
