import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Negocio } from 'src/app/interfaces/negocio';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

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

  listProductos: Negocio[] = [];
  negocio: Negocio;

  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _productoService: ProductoService
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

  // METODO GUARDAR
  guardarDatos() {
    if (this.formProducto.valid) {

      let producto: Producto = {
        negocio: Number(this.idNegocio),

        nombre: this.formProducto.controls.nombre.value,
        precio: this.formProducto.controls.precio.value,
        disponible: this.formProducto.controls.disponible.value,
        descripcion: this.formProducto.controls.descripcion.value,

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
        nombre: this.formProducto.controls.nombre.value,
        precio: this.formProducto.controls.precio.value,
        disponible: this.formProducto.controls.disponible.value,
        descripcion: this.formProducto.controls.descripcion.value,
      }
      this._productoService.actualizarProducto(this.idNegocio, producto).subscribe(
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
    sessionStorage.setItem('negocio', id);
    this.idNegocio = id;

    this._productoService.buscarProductoId(id).subscribe(
      data => {
        this.negocio = data;


        this.formProducto.controls.nombre.setValue(this.negocio.nombre);
        this.formProducto.controls.correo.setValue(this.negocio.correo);
        this.formProducto.controls.telefono.setValue(this.negocio.telefono);
        this.formProducto.controls.direccion.setValue(this.negocio.direccion);
        this.formProducto.controls.descripcion.setValue(this.negocio.descripcion);


        this._toast.info("Edita los datos del negocio seleccionado.", "Carga exitosa", {
          timeOut: 5000
        });
      }
    );


  }

  //METODO LIMPIAR FORMULARIO Y IDPRODUCTO (BOTON)
  limpiar() {
    sessionStorage.removeItem('negocio');
    this.idNegocio = null;

    this.formProducto.reset();
  }

}
