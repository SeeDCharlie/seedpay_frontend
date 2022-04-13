import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ciudad } from '../interfaces/ciudad';
import { Pedidos } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private _url = environment.url_useracount + "/ciudad/";

  constructor(
    private _http: HttpClient
  ) { }

  consultarCiudades(){
    return this._http.get<Ciudad[]>(`${this._url}`);
  }

  consultarCiudadesPorDepartamento(idDepartamento:number){
    return this._http.get<Ciudad[]>(`${this._url}?departamento=${idDepartamento}`);
  }


}
