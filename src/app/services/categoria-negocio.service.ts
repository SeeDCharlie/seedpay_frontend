import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaNegocio } from '../interfaces/categoriaNegocio';
import { Negocio } from '../interfaces/negocio';

@Injectable({
  providedIn: 'root'
})
export class CategoriaNegocioService {

  private _url = environment.url + '/categoriaNegocio/';

  constructor(
    private _http: HttpClient
  ) { }

  consultarCategoriaNegocio(): Observable<CategoriaNegocio[]>{
    return this._http.get<CategoriaNegocio[]>(this._url);
  }

}