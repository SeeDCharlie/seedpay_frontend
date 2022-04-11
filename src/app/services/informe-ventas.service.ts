import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PetInforme, ReqInforme } from '../interfaces/informeVentas';

@Injectable({
  providedIn: 'root'
})
export class InformeVentasService {

  private _url = environment.url_business + '/informeVentas/';

  constructor(
    private _http: HttpClient
  ) { }

  consultarInforme(petInforme: PetInforme): Observable<any>{
    return this._http.post<ReqInforme>(`${this._url}`, petInforme)
  }

}
