import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacturaFull } from '../interfaces/factura-full';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private _url = environment.url_business + '/factura/';
  constructor(
    private _http: HttpClient
  ) { }

  consultarFacturasPorVendedor(id: number): Observable<FacturaFull[]>{
    return this._http.get<FacturaFull[]>(`${this._url}facturaFull/?vendedor=${id}`)
  }

}
