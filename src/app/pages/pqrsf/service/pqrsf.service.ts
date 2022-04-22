import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Motivopqrsf } from '../models/motivopqrsf';
import { Pqrsf } from '../models/pqrsf';

@Injectable({
  providedIn: 'root'
})
export class PqrsfService {

  private _url = environment.url_useracount;

  constructor(
    private _http: HttpClient
  ) { }

  obtenerMotivosPqrsf():Observable<Motivopqrsf[]>{
    return this._http.get<Motivopqrsf[]>(`${this._url}/motivo_pqrsf/`)
  }

  guardarPqrsf(pqrsf:Pqrsf):Observable<Pqrsf>{
    return this._http.post<Pqrsf>(`${this._url}/pqrsf/`, pqrsf)
  }

}
