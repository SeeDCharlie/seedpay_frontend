import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Negocio } from '../interfaces/negocio';
import { PedidoVentaOnline } from '../interfaces/pedidoVentaOnline';
import { ResponseEpayco } from '../interfaces/responseEpayco';

@Injectable({
  providedIn: 'root'
})
export class VentasOnline {

  private _url = environment.url ;

  constructor(
    private _http: HttpClient
  ) { }


  responseEpayco(request: PedidoVentaOnline): Observable<any>{
    return this._http.post(`${this._url}/responseCompraEpayco/`, request);
  }

  responseEstateEpayco(referencia:string):Observable<ResponseEpayco>{
    return this._http.get<ResponseEpayco>(`https://secure.epayco.co/validation/v1/reference/${referencia}`);
  }

}