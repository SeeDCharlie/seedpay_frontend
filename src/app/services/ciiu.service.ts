import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ciiu } from '../interfaces/ciiu';

@Injectable({
  providedIn: 'root'
})
export class CiiuService {


  private _url = environment.url + '/ciiu/';

  constructor(
    private _http: HttpClient
  ) { }

  consultarCiiu(): Observable<Ciiu[]>{
    return this._http.get<Ciiu[]>(this._url);
  }

  consultarCiiuPorId(id: any): Observable<any>{
    return this._http.get<any>(`${this._url}${id}`);
  }
}
