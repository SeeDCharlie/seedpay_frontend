import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Archivo } from '../interfaces/archivo';
import { ResponseUploadImage } from '../interfaces/response-upload-image';

@Injectable({
  providedIn: 'root'
})
export class S3ImagenesService {

  private _url = environment.url_storage + 'uploadimage';

  constructor(
    private _http: HttpClient
  ) { }

  // NEGOCIO
  cargarImagenNegocio(archivo: File): Observable<ResponseUploadImage> {
    const formData = new FormData();
    formData.append("media", archivo);

    return this._http.post<ResponseUploadImage>(`${this._url}/negocios`, formData)
  }

  // PRODUCTO
  cargarImagenProducto(archivo: File): Observable<ResponseUploadImage> {
    const formData = new FormData();
    formData.append("media", archivo);

    return this._http.post<ResponseUploadImage>(`${this._url}/productos`, formData)
  }

}
