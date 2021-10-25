import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PetInforme, ReqInforme } from 'src/app/interfaces/informeVentas';
import { InformeVentasService } from 'src/app/services/informe-ventas.service';
import { calendario } from '../../interfaces/calendario';

@Component({
  selector: 'app-informe-venta',
  templateUrl: './informe-venta.component.html',
  styleUrls: ['./informe-venta.component.scss']
})
export class InformeVentaComponent implements OnInit {

  meses = calendario;

  informeNegocios: ReqInforme = {};

  idUsuario: string = sessionStorage.getItem('id');

  formReporte: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _informeVentas: InformeVentasService
  ) { }

  ngOnInit(): void {
    this.formReporte = this._formBuilder.group({
      'mes': ['', Validators.required],
      'anio': ['', Validators.required],
    })
  }



  // INFORME DE VENTAS
  consultarInforme() {

    if (this.formReporte.valid) {

      // PETICION OBJ
      let peticionInforme: PetInforme = {
        usuario: Number(this.idUsuario),
        mes: this.formReporte.controls.mes.value,
        año: this.formReporte.controls.anio.value
      }

      console.log(peticionInforme);


      // SERVICIO
      this._informeVentas.consultarInforme(peticionInforme).subscribe(
        data => {
          this.informeNegocios = data;
          console.log(this.informeNegocios);

          this._toast.success("Informe generado exitosamente.", "Carga exitosa", {
            timeOut: 5000
          });
        },
        error => {
          // ERRORES
          if (error.error) {
            console.log(error);

            for (let i in error.error) {
              this._toast.error(error.error[i], "Ha sucedido un inconveniente", {
                timeOut: 5000
              });
            }
          } else {
            this._toast.error("Algo ha salido mal en el proceso, lamentos los invoncenientes.", "Ha sucedido un inconveniente", {
              timeOut: 5000
            });
          }
        },
      )
    } else {
      this._toast.error("Datos introducidos invalidos", "Datos invalidos", {
        timeOut: 5000
      });
    }
  }

  num = (x) => Number(x);

}//END CLASS
