import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  idNegocio: string = null;

  listNegocios: Negocio[] = [];
  negocio: Negocio;

  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _router: Router,
    private _negocioService: NegocioService

  ) {
    sessionStorage.removeItem('negocio');
  }

  ngOnInit(): void {
    this.formNegocio = this._formBuilder.group({
      'nombre': ['', Validators.required],
      'correo': ['', Validators.required],
      'telefono': ['', Validators.required],
      'direccion': '',
      'descripcion': ['', Validators.required],

    });

    this.buscarNegociosId();
  }

  // METODO GUARDAR
  guardarDatos() {
    if (this.formNegocio.valid) {

      let negocio: Negocio = {
        usuario: Number(this.idUsuario),

        nombre: this.formNegocio.controls.nombre.value,
        correo: this.formNegocio.controls.correo.value,
        telefono: this.formNegocio.controls.telefono.value,
        direccion: this.formNegocio.controls.direccion.value || "N/A",
        descripcion: this.formNegocio.controls.descripcion.value,
      }
      this._negocioService.guardarNegocio(negocio).subscribe(
        data => {
          // NEGOCIO CREADO
          this._toast.success("Negocio creado exitosamente.", "Creación exitosa", {
            timeOut: 5000
          });
          this.buscarNegociosId();
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
            this._toast.error("Algo ha salido mal en el proceso, lamentamos los inconvenientes.", "Ha sucedido un inconveniente", {
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

    if (this.formNegocio.valid) {

      let negocio: Negocio = {
        nombre: this.formNegocio.controls.nombre.value,
        correo: this.formNegocio.controls.correo.value,
        telefono: this.formNegocio.controls.telefono.value,
        direccion: this.formNegocio.controls.direccion.value || " ",
        descripcion: this.formNegocio.controls.descripcion.value,
      }
      this._negocioService.actualizarNegocio(this.idNegocio, negocio).subscribe(
        data => {
          // NEGOCIO ACTUALIZADO
          this.buscarNegociosId();

          this._toast.success("Negocio actualizado exitosamente.", "Actualización exitosa", {
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
            this._toast.error("Algo ha salido mal en el proceso, lamentamos los inconvenientes.", "Ha sucedido un inconveniente", {
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

  // METODO CARGAR TABLA
  async buscarNegociosId() {
    await this._negocioService.buscarNegocioIdUsuario(this.idUsuario).subscribe(
      data => {
        this.listNegocios = data;
        if (this.listNegocios.length > 0) {
          this._toast.info("Se han cargado tus negocios exitosamente.", "Carga exitosa", {
            timeOut: 5000
          });
        } else {
          this._toast.info("Crea tu negocio en esta sección.", "Creación de negocio", {
            timeOut: 5000
          });
        }
      }
    );
  }

  // METODO CARGAR DATOS
  cargarDatos(id) {
    sessionStorage.setItem('negocio', id);
    this.idNegocio = id;

    this._negocioService.buscarNegocioId(id).subscribe(
      data => {
        this.negocio = data;


        this.formNegocio.controls.nombre.setValue(this.negocio.nombre);
        this.formNegocio.controls.correo.setValue(this.negocio.correo);
        this.formNegocio.controls.telefono.setValue(this.negocio.telefono);
        this.formNegocio.controls.direccion.setValue(this.negocio.direccion);
        this.formNegocio.controls.descripcion.setValue(this.negocio.descripcion);


        this._toast.info("Edita los datos del negocio seleccionado.", "Carga exitosa", {
          timeOut: 5000
        });
      }
    );


  }

  //METODO GET ID NEGOCIO (CLICK REGISTRO)
  getIdNegocio(id) {
    sessionStorage.setItem('negocio', id);
    this.idNegocio = id;

    this._router.navigate(['producto']);
  }

  //METODO LIMPIAR FORMULARIO Y IDNEGOCIO (BOTON)
  limpiar() {
    sessionStorage.removeItem('negocio');
    this.idNegocio = null;

    this.formNegocio.reset();
  }
}
