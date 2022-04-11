import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  private _url = environment.url_business + "/qr/";

  constructor(
    private _http: HttpClient
  ) { }

  qrNegocio(idNegocio): Observable<any> {
    return this._http.get(`${this._url}${idNegocio}/`)
  }


}
