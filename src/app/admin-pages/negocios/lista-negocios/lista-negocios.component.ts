import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Negocio } from 'src/app/interfaces/negocio';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { NegocioService } from 'src/app/services/negocio.service';
import { listPagesDB } from '../../shared/tables/list-pages';
import { environment } from 'src/environments/environment';
@Component({
  templateUrl: './lista-negocios.component.html',
  styleUrls: ['./lista-negocios.component.scss']
})
export class ListaNegociosComponent implements OnInit {

  lista_negocios: Negocio[] = []
  usuarioSession: UsuarioSession = JSON.parse('{}')
  public selected = [];

  constructor(
    private negocioService:NegocioService,
    private _toast: ToastrService,
  ) {
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}')
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  ngOnInit() {
    this.cargarNegocios()
  }

  async cargarNegocios() {
    this.negocioService.buscarNegocioIdUsuario(this.usuarioSession.id).subscribe({
      next: (data:Negocio[]) => {
        this.lista_negocios = data
        this._toast.info("Se han cargado tus negocios exitosamente.", "Carga exitosa", {
          timeOut: 5000
        });
      },
      error: (error:any) => {
        this._toast.info(`Ocurrio un error al cargar tus negocios, itenta mas tarde ${error.error}`, "Informacion importante", {
          timeOut: 5000
        });
      }
    })
  }

  async eliminarNegocio(id:number){
    this.negocioService.eliminarNegocio(id).subscribe({
      next: () => {
        this._toast.success(JSON.stringify("Negocio ELiminado"), "Accion Exitosa", {
        timeOut: 5000
      });
      this.cargarNegocios()
    },
      error: (error:any) => {}
    })
  }
}
