import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Departamento } from '../interfaces/departamento';
import { Pedidos } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private _url = environment.url_useracount + "/departamento/";

  constructor(
    private _http: HttpClient
  ) { }

  consultarDepartamentos(){
    return this._http.get<Departamento[]>(`${this._url}`);
  }


}
