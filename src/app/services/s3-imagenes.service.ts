import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Archivo } from '../interfaces/archivo';

@Injectable({
  providedIn: 'root'
})
export class S3ImagenesService {

  private _url = environment.urlS3;

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Cookie': 'csrftoken=94iHNosxOaWYDo1nVVwT71yq8XV9gcp3wN9fKJTLsj8kxIffoq6sLJkCKT0yDMS4'
  //   })
  // };

  httpOptions = {
    headers: new HttpHeaders({
 
    })
  };

  constructor(
    private _http: HttpClient
  ) { }

  cargarImagenNegocio(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append("media", archivo);

    return this._http.post<any>(`${this._url}/negocios`, formData, this.httpOptions)
  }

}
