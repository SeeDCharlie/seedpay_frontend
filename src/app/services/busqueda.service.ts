import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Negocio } from '../interfaces/negocio';

@Injectable({
    providedIn: 'root'
})
export class BusquedaService {

    private _url = environment.url 

    constructor(
        private _http: HttpClient
    ) { }



  buscarNegocioFiltroGeneral(palabra: String){
    return this._http.get<any>(`${this._url}/buscar/${palabra}`);
  }

}