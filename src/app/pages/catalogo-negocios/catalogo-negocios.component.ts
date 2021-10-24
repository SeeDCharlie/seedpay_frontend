import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Negocio } from 'src/app/interfaces/negocio';
import { Producto } from 'src/app/interfaces/producto';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-catalogo-negocios',
  templateUrl: './catalogo-negocios.component.html',
  styleUrls: ['./catalogo-negocios.component.scss']
})
export class CatalogoNegociosComponent implements OnInit {

  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo
  public palabra: String  ;
  public negocios: Negocio[];

  constructor(private _activatedRoute: ActivatedRoute,
              private busquedaService: BusquedaService,
              private _toast: ToastrService,
              private router:Router) {

    this.palabra = localStorage.getItem('palabraBusqueda');
    
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    
  }

  ngOnInit(): void {
    this.cargarNegocios();
  }


  private cargarNegocios(){
    this.busquedaService.buscarNegocioFiltroGeneral(this.palabra).subscribe(

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
