import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { categoriaProducto } from 'src/app/interfaces/categoriaProducto';
import { Negocio } from 'src/app/interfaces/negocio';
import { Producto } from 'src/app/interfaces/producto';
import { CategoriaProductoService } from 'src/app/services/categoria-producto.service';
import { NegocioService } from 'src/app/services/negocio.service';
import { ProductoService } from 'src/app/services/producto.service';
import { QrService } from 'src/app/services/qr.service';
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
  listaCategorias: categoriaProducto[] = [];
  listaCategoriasNegocio: number[] = [];

  producto: Producto;

  file: File = null;
  img: any = null;
  qr: any = null;

  // CONFIGURACIÓN SELECT MULTI
  config = {
    displayKey: "nombre",
    search: true,
    height: 'auto',
    placeholder: "Selecciona las diferentes categorías que apliquen a tu producto",
    moreText: "Más...",
    searchPlaceholder: "Buscar categoría",
    noResultsFound: "No se encontraron resultados",
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _productoService: ProductoService,
    private _cateProductos: CategoriaProductoService,
    private _s3: S3ImagenesService,
    private _qr: QrService,
  ) { }

  ngOnInit(): void {
    this.formProducto = this._formBuilder.group({
      'nombre': ['', Validators.required],
      'precio': ['', Validators.required],
      'disponible': ['', Validators.required],
      'descripcion': ['', Validators.required],
      'categorias': ['', Validators.required],
    });
    this.buscarProductosId();
    this.consultarCategoriaNegocio();
    this.consultarQrNegocio();
  }

  // METODO CAPTURAR IMAGEN
  onChange($event: Event) {
    this.file = ($event.target as HTMLInputElement).files[0];

    console.log(this.file);

    // Preview IMG
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);

      reader.onload = () => {
        this.img = reader.result;
      }
    }
  }

  // METODO GET CATEGORIAS
  consultarCategoriaNegocio() {
    this._cateProductos.consultarCategoriaProducto(this.idNegocio).subscribe(
      data => {
        this.listaCategorias = data;
      });
  }

  // METODO RETORNA ARREGLO DE ID'S FORM SELECT
  getListadoIdForm(formulario: any) {
    return formulario.map(({ id }) => id);
  }

  // METODO GUARDAR
  guardarDatos() {
    if (this.formProducto.valid) {

      this._s3.cargarImagenNegocio(this.file).subscribe(dataImg => {

        let dtImg = dataImg;

        this.img = environment.amazonS3 + dtImg.urlImagen;

        // console.log(environment.amazonS3 + dtImg.urlImagen);
      });

      let listaIdCategoria: number[] = [];
      listaIdCategoria = this.getListadoIdForm(this.formProducto.controls.categorias.value);

      let producto: Producto = {
        negocio: Number(this.idNegocio),

        nombre: this.formProducto.controls.nombre.value,
        precio: this.formProducto.controls.precio.value,
        disponible: this.formProducto.controls.disponible.value,
        descripcion: this.formProducto.controls.descripcion.value,
        categorias: listaIdCategoria,
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

      this._s3.cargarImagenNegocio(this.file).subscribe(dataImg => {

        let dtImg = dataImg;

        this.img = environment.amazonS3 + dtImg.urlImagen;

        // console.log(environment.amazonS3 + dtImg.urlImagen);
      });

      let listaIdCategoria: number[] = [];
      listaIdCategoria = this.getListadoIdForm(this.formProducto.controls.categorias.value);

      let producto: Producto = {
        negocio: Number(this.idNegocio),

        nombre: this.formProducto.controls.nombre.value,
        precio: this.formProducto.controls.precio.value,
        disponible: this.formProducto.controls.disponible.value,
        descripcion: this.formProducto.controls.descripcion.value,
        categorias: listaIdCategoria,
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
    let listCategoriaFilter: categoriaProducto[] = [];

    this._productoService.buscarProductoId(id).subscribe(
      data => {
        this.producto = data;

        this.img = this.producto.imagen_64;

        this.formProducto.controls.nombre.setValue(this.producto.nombre);
        this.formProducto.controls.precio.setValue(Number(this.producto.precio));
        this.formProducto.controls.disponible.setValue(this.producto.disponible);
        this.formProducto.controls.descripcion.setValue(this.producto.descripcion);
        this.cargarListadoEspecifico(listCategoriaFilter, this.listaCategorias, this.producto.categorias);
        this.formProducto.controls.categorias.setValue(this.producto.descripcion);

        this._toast.info("Edita los datos del producto seleccionado.", "Carga exitosa", {
          timeOut: 5000
        });
      }
    );
  }

  // METODO PARA CARGAR UN LISTADO
  cargarListadoEspecifico(listaVacia: any[], listaSelector: any[], listaCargada: any[] = []) {
    listaCargada.forEach(id => {
      listaSelector.find(campo => {
        if (campo.id == id) {
          listaVacia.push(campo);
        }
      });
    });
  }

  //METODO LIMPIAR FORMULARIO Y IDPRODUCTO (BOTON)
  limpiar() {
    this.idProducto = null;
    this.img = null;

    this.formProducto.reset();
  }

  consultarQrNegocio() {
    this.qr = "http://127.0.0.1:8000/api/qr/" + this.idNegocio
  }


}
