import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PetInforme, ReqInforme, RespVentasPorNegocios } from '../interfaces/informeVentas';

@Injectable({
  providedIn: 'root'
})
export class InformeVentasService {

  private _url = environment.url_business ;

  constructor(
    private _http: HttpClient
  ) { }

  consultarInforme(petInforme: PetInforme): Observable<any>{
    return this._http.post<ReqInforme>(`${this._url}/informeVentas/`, petInforme)
  }

  reporteVentasUsrNegocio(petInforme: PetInforme): Observable<RespVentasPorNegocios[]>{
    return this._http.post<RespVentasPorNegocios[]>(`${this._url}/informeVentasUsrNegocio/`, petInforme)
  }

  productosDisponiblesporUsuario(id: number): Observable<number>{
    return this._http.get<number>(`${this._url}/productosDisponiblesPorUsr/${id}`)
  }


}
