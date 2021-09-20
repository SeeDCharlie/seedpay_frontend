import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-catalogo-negocios',
  templateUrl: './catalogo-negocios.component.html',
  styleUrls: ['./catalogo-negocios.component.scss']
})
export class CatalogoNegociosComponent implements OnInit {

  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo
  public nombreCategoria: String  ;

  constructor( private _activatedRoute: ActivatedRoute) {
    this.nombreCategoria = this._activatedRoute.snapshot.params.categoria;
  }

  ngOnInit(): void {
    
  }


  cargarNegocios(){

  }


}
