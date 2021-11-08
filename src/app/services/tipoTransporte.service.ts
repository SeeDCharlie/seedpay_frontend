import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoIdentificacion } from '../interfaces/tipoIdentificacion';
import { TipoTransporte } from '../interfaces/tipoTransporte';

@Injectable({
  providedIn: 'root'
})
export class TipoTransporteService {

  private _url = environment.url + "/tipoTransporte/";

  constructor(
    private _http: HttpClient
  ) { }

    getTiposTransporte(): Observable<TipoTransporte[]>{
      return this._http.get<TipoTransporte[]>(`${this._url}`);
    }
}
