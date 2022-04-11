import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private _url = environment.url_business + "/producto/";
  public Currency = { name: 'Peso', currency: 'COP', price: 1 }

  constructor(
    private _http: HttpClient
  ) { }

  buscarProductoIdNegocio(id: any): Observable<any> {
    return this._http.get<any>(`${this._url}?negocio=${id}`);
  }

  buscarProductoId(id: any): Observable<any> {
    return this._http.get<any>(`${this._url}${id}`);
  }

  guardarProducto(request: any): Observable<any> {
    return this._http.post(`${this._url}`, request);
  }

  actualizarProducto(id: string, request: any): Observable<any> {
    return this._http.put(`${this._url}${id}/`, request);
  }


  // Sorting Filter
  public sortProducts(products: Producto[], payload: string): any {

    if (payload === 'ascending') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'a-z') {
      return products.sort((a, b) => {
        if (a.nombre < b.nombre) {
          return -1;
        } else if (a.nombre > b.nombre) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'z-a') {
      return products.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return -1;
        } else if (a.nombre < b.nombre) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.precio < b.precio) {
          return -1;
        } else if (a.precio > b.precio) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.precio > b.precio) {
          return -1;
        } else if (a.precio < b.precio) {
          return 1;
        }
        return 0;
      })
    }
  }


  /*
---------------------------------------------
------------- Product Pagination  -----------
---------------------------------------------
*/
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 16) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }


}
