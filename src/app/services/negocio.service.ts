import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Negocio } from '../interfaces/negocio';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private _url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }

  guardarNegocio(request: Negocio): Observable<any>{
    return this._http.post(`${this._url}/negocio/`, request);
  }
}
