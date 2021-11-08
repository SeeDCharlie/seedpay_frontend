import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pedidos } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private _url = environment.url + "/pedidos/";

  constructor(
    private _http: HttpClient
  ) { }

  consultarPedidos(){
    return this._http.get<Pedidos[]>(`${this._url}`);
  }

  consultarPedidosPorId(id: number){
    return this._http.get<any>(`${this._url}${id}`);
  }

  consultarPedidosPorIdVendedor(id: number){
    return this._http.get<any>(`${this._url}vendedor/${id}`);
  }

}