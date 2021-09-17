import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Negocio } from 'src/app/interfaces/negocio';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss']
})
export class NegocioComponent implements OnInit {

  formNegocio: FormGroup;

  idUsuario: string = sessionStorage.getItem('id');

  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _negocioService: NegocioService

  ) { }

  ngOnInit(): void {
    this.formNegocio = this._formBuilder.group({
      'nombre': ['', Validators.required],
      'correo': ['', Validators.required],
      'telefono': ['', Validators.required],
      'direccion': '',
      'descripcion': ['', Validators.required],

    })
  }

  // METODO GUARDAR
  guardarDatos() {

    if (this.formNegocio.valid) {

      let negocio: Negocio = {
        usuario: Number(this.idUsuario),

        nombre: this.formNegocio.controls.nombre.value,
        correo: this.formNegocio.controls.correo.value,
        telefono: this.formNegocio.controls.telefono.value,
        direccion: this.formNegocio.controls.direccion.value,
        descripcion: this.formNegocio.controls.descripcion.value,
      }
      this._negocioService.guardarNegocio(negocio).subscribe(
        data => {
          // NEGOCIO CREADO
          this._toast.success("Negocio creado exitosamente.", "Creación exitosa", {
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
      );
      // CAMPOS OBLIGATORIOS
    } else {
      this._toast.error("Todos los campos son obligatorios.", "Ha sucedido un inconveniente", {
        timeOut: 5000
      });
    }
  }

  // METODO ACTUALIZAR
  actualizarDatos() {
    console.log("ACTUALIZAR");

  }

  prueba(){
    console.log("NEGOCIO");

  }
}
