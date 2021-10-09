import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { Negocio } from 'src/app/interfaces/negocio';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { S3ImagenesService } from 'src/app/services/s3-imagenes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  formProducto: FormGroup;

  // idUsuario: string = sessionStorage.getItem('id');
  idNegocio: string = sessionStorage.getItem('negocio');
  idProducto: string = null;

  listProductos: Producto[] = [];
  producto: Producto;

  img: string = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _productoService: ProductoService,
    private _s3: S3ImagenesService
  ) {
  }

  ngOnInit(): void {
    this.formProducto = this._formBuilder.group({
      'nombre': ['', Validators.required],
      'precio': ['', Validators.required],
      'disponible': ['', Validators.required],
      'descripcion': ['', Validators.required],

    });
    this.buscarProductosId();
  }

  // METODO CAPTURAR IMAGEN
  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];

    console.log(file);

    this._s3.cargarImagenNegocio(file).subscribe( dataImg => {

      let dtImg = dataImg;

      this.img = environment.amazonS3 + dtImg.urlImagen;

      // console.log(environment.amazonS3 + dtImg.urlImagen);
    })
  }

  // METODO GUARDAR
  guardarDatos() {
    if (this.formProducto.valid) {

      let producto: Producto = {
        negocio: Number(this.idNegocio),

        nombre: this.formProducto.controls.nombre.value,
        precio: this.formProducto.controls.precio.value,
        disponible: this.formProducto.controls.disponible.value,
        descripcion: this.formProducto.controls.descripcion.value,
        imagen_64: this.img || null,

      }
      this._productoService.guardarProducto(producto).subscribe(
        data => {
          // PRODUCTO CREADO
          this._toast.success("Producto creado exitosamente.", "Creación exitosa", {
            timeOut: 5000
          });
          this.buscarProductosId();
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

    if (this.formProducto.valid) {

      let producto: Producto = {
        negocio: Number(this.idNegocio),

        nombre: this.formProducto.controls.nombre.value,
        precio: this.formProducto.controls.precio.value,
        disponible: this.formProducto.controls.disponible.value,
        descripcion: this.formProducto.controls.descripcion.value,
        imagen_64: this.img || null,
      }
      this._productoService.actualizarProducto(this.idProducto, producto).subscribe(
        data => {
          // NEGOCIO ACTUALIZADO
          this.buscarProductosId();

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
  async buscarProductosId() {
    await this._productoService.buscarProductoIdNegocio(this.idNegocio).subscribe(
      data => {
        this.listProductos = data;
        if (this.listProductos.length > 0) {
          this._toast.info("Se han cargado tus productos exitosamente.", "Carga exitosa", {
            timeOut: 5000
          });
        }
        else {
          this._toast.info("Crea tus productos en esta sección.", "Creación de negocio", {
            timeOut: 5000
          });
        }
      }
    );
  }

  // METODO CARGAR DATOS
  cargarDatos(id) {
    this.idProducto = id;

    this._productoService.buscarProductoId(id).subscribe(
      data => {
        this.producto = data;

        this.img = this.producto.imagen_64;

        this.formProducto.controls.nombre.setValue(this.producto.nombre);
        this.formProducto.controls.precio.setValue(Number(this.producto.precio));
        this.formProducto.controls.disponible.setValue(this.producto.disponible);
        this.formProducto.controls.descripcion.setValue(this.producto.descripcion);

        this._toast.info("Edita los datos del producto seleccionado.", "Carga exitosa", {
          timeOut: 5000
        });
      }
    );


  }

  //METODO LIMPIAR FORMULARIO Y IDPRODUCTO (BOTON)
  limpiar() {
    this.idProducto = null;
    this.img = null;

    this.formProducto.reset();
  }

}
