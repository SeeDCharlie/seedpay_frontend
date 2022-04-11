import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoIdentificacion } from '../interfaces/tipoIdentificacion';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  private _url = environment.url_useracount + "/tipoIdentificacion/";

  constructor(
    private _http: HttpClient
  ) { }

    getTipoIdentificacion(): Observable<TipoIdentificacion[]>{
      return this._http.get<TipoIdentificacion[]>(`${this._url}`);
    }
}
