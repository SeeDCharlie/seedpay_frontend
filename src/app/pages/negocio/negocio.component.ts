import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Negocio } from 'src/app/interfaces/negocio';
import { NegocioService } from 'src/app/services/negocio.service';
import imageToBase64 from 'image-to-base64/browser';
import { Observable, Subscribable, Subscriber } from 'rxjs';
import { CategoriaNegocio } from 'src/app/interfaces/categoriaNegocio';
import { CategoriaNegocioService } from 'src/app/services/categoria-negocio.service';

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
  listaCategorias: CategoriaNegocio[] = [];
  negocio: Negocio;

  img: string = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _router: Router,
    private _negocioService: NegocioService,
    private _cateNegoService: CategoriaNegocioService,

  ) {
    sessionStorage.removeItem('negocio');
  }

  ngOnInit(): void {
    this.formNegocio = this._formBuilder.group({
      'nombre': ['', Validators.required],
      'correo': ['', Validators.required],
      'telefono': ['', Validators.required],
      'direccion': '',
      'categoria': ['', Validators.required],
      'descripcion': ['', Validators.required],
    });

    this.buscarNegociosId();
    this.consultarCategoriaNegocio();
  }

  // METODO CAPTURAR IMAGEN
  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    console.log($event.target);
    this.convertBase64(file)

  }

  // METODO RETORNA IMAGEN
  convertBase64(file: File) {
    const obs = new Observable((sub: Subscriber<any>) => {

      this.readFile(file, sub);

    });
    obs.subscribe(data => {
      // console.log(data);
      this.img = data;
    });

  }

  // METODO LEER ARCHIVO IMAGEN
  readFile(file: File, sub: Subscriber<any>) {

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      sub.next(fileReader.result);
      sub.complete();
    };

    fileReader.onerror = (err) => {
      sub.error(err);
      sub.complete();
    };
  }

  // METODO GUARDAR
  guardarDatos() {
    if (this.formNegocio.valid) {

      let listCateNego: number[] = []

      listCateNego.push(this.formNegocio.controls.categoria.value);

      let negocio: Negocio = {
        usuario: Number(this.idUsuario),

        nombre: this.formNegocio.controls.nombre.value,
        correo: this.formNegocio.controls.correo.value,
        telefono: this.formNegocio.controls.telefono.value,
        direccion: this.formNegocio.controls.direccion.value || "N/A",
        descripcion: this.formNegocio.controls.descripcion.value,
        imagen_64: this.img || null,
        categorias: listCateNego,
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

    if (this.formNegocio.valid) {

      let listCateNego: number[] = []

      listCateNego.push(this.formNegocio.controls.categoria.value);


      let negocio: Negocio = {
        nombre: this.formNegocio.controls.nombre.value,
        correo: this.formNegocio.controls.correo.value,
        telefono: this.formNegocio.controls.telefono.value,
        direccion: this.formNegocio.controls.direccion.value || " ",
        descripcion: this.formNegocio.controls.descripcion.value,
        imagen_64: this.img || null,
        categorias: listCateNego,
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

        this.img = this.negocio.imagen_64;

        this.formNegocio.controls.nombre.setValue(this.negocio.nombre);
        this.formNegocio.controls.correo.setValue(this.negocio.correo);
        this.formNegocio.controls.telefono.setValue(this.negocio.telefono);
        this.formNegocio.controls.direccion.setValue(this.negocio.direccion);
        this.formNegocio.controls.descripcion.setValue(this.negocio.descripcion);
        this.formNegocio.controls.categoria.setValue(this.negocio.categorias[0]);

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
    this.img = null;

    this.formNegocio.reset();
  }

  // METODO GET CAPTEGORIAS
  consultarCategoriaNegocio() {
    this._cateNegoService.consultarCategoriaNegocio().subscribe(
      data => {
        this.listaCategorias = data;
      }
    )
  }
}
