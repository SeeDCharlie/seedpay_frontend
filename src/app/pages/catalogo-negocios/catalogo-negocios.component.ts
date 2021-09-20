import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Negocio } from 'src/app/interfaces/negocio';
import { Producto } from 'src/app/interfaces/producto';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-catalogo-negocios',
  templateUrl: './catalogo-negocios.component.html',
  styleUrls: ['./catalogo-negocios.component.scss']
})
export class CatalogoNegociosComponent implements OnInit {

  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo
  public nombreCategoria: String  ;
  public negocios: Negocio[];
  private productos: Producto[][];

  constructor(private _activatedRoute: ActivatedRoute,
              private negocioService: NegocioService,
              private _toast: ToastrService ) {

    this.nombreCategoria = this._activatedRoute.snapshot.params.categoria;

    
  }

  ngOnInit(): void {
    this.cargarNegocios();
  }


  private cargarNegocios(){
    this.negocioService.buscarNegociosPorNombreCategoria(this.nombreCategoria).subscribe(

      data => {
				this.negocios = data;
        console.log(this.negocios);
			},
			error => {
				this._toast.error("lista de negocios vacia", "no hay negocios que mostrar", {
					timeOut: 5000
				});
			}
    );
  }


}
