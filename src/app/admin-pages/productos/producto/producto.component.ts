import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { categoriaProducto } from 'src/app/interfaces/categoriaProducto';
import { Negocio } from 'src/app/interfaces/negocio';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoRequest } from 'src/app/interfaces/producto-request';
import { ResponseUploadImage } from 'src/app/interfaces/response-upload-image';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { CategoriaProductoService } from 'src/app/services/categoria-producto.service';
import { NegocioService } from 'src/app/services/negocio.service';
import { ProductoService } from 'src/app/services/producto.service';
import { S3ImagenesService } from 'src/app/services/s3-imagenes.service';

@Component({
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  productForm: FormGroup;
  negocios: Negocio[] = []
  files: File[] = [];
  producto: Producto = {} as Producto
  categoriasProducto: categoriaProducto[] = []
  idProducto:number = -1
  usuarioSession: UsuarioSession = {} as UsuarioSession
  counter: number = 0;
  lista_negocios: Negocio[] = []

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
    private fb: FormBuilder,
    private negocioService:NegocioService,
    private categoriaProductoService : CategoriaProductoService,
    private _toast: ToastrService,
    private storaService:S3ImagenesService,
    private productoSerice:ProductoService,
    private _router: Router,
    private _route:ActivatedRoute
    ) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, ]],
      precio: ['', [Validators.required, Validators.min(5000), Validators.max(9999999999)]],
      negocio: ['', [Validators.required, ]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      stock: ['', [Validators.nullValidator, ]],
      categorias:['', [Validators.required, ]],
      disponible : ['', [Validators.nullValidator, ]],

    })
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}')
    this.cargarNegocios()

    if(this._route.snapshot.paramMap.get('id')){
      this.idProducto = +this._route.snapshot.paramMap.get('id')
      this.cargarProducto()
    }
  }

  async guardarProducto(){

      if(this.files[0]){
        this.storaService.cargarImagenProducto(this.files[0]).subscribe({
          next: (data:ResponseUploadImage) => {
            if(this.productForm.valid){

              this.producto = this.productForm.value as Producto
              console.log("producto form : " + JSON.stringify(this.productForm.value))
              this.producto.categorias = this.getListadoIdForm(this.producto.categorias)
              this.producto.imagen_64 = data.urlImagen
              this.producto.stock = this.counter
              console.log("producto : " + JSON.stringify(this.producto))
              this.productoSerice.guardarProducto(this.producto).subscribe({
                next: (data:Producto) => {
                  this._toast.success("Producto creado exitosamente.", "Creación exitosa", {
                    timeOut: 5000
                  });
                  this._router.navigate(['/productos/lista'])
                },
                error: (error:any) => {
                  this._toast.error(JSON.stringify(error.error), "Ha sucedido un inconveniente", {
                    timeOut: 5000
                  });
                }
              })
            }
          },
          error: (error:any) => {
            this._toast.error(JSON.stringify(error.error), "Ha sucedido un inconveniente", {
              timeOut: 5000
            });
          }
        })
      }else{
        this._toast.error("No has cargado una foto para tu negocio", "", {
          timeOut: 5000
        });
      }

  }

  async cargarNegocios() {
    this.negocioService.buscarNegocioIdUsuario(this.usuarioSession.id).subscribe({
      next: (data:Negocio[]) => {
        this.lista_negocios = data
      },
      error: (error:any) => {
        this._toast.info(`Ocurrio un error al cargar tus negocios, itenta mas tarde ${error.error}`, "Informacion importante", {
          timeOut: 5000
        });
      }
    })
  }

  async cargarProducto(){
    this.productoSerice.buscarProductoId(this.idProducto).subscribe({
      next: (data:Producto) => {
        this.categoriaProductoService.consultarCategoriaProductoPorNegocio(data.negocio).subscribe({
          next: (newCat:categoriaProducto[]) => {
            this.categoriasProducto = newCat
            this.productForm.setValue({
              nombre:data.nombre,
              precio:data.precio,
              negocio:data.negocio,
              descripcion:data.descripcion,
              stock:data.stock,
              categorias:  this.getModelByIds(data.categorias, this.categoriasProducto) ,
              disponible:data.disponible,
            })
            this.producto = data
          },
          error: (error: any) => {}
        })

      },
      error: (error:any) => {}
    })
  }

  actualizarProducto(){
    this.productoSerice.actualizarProducto(this.idProducto,this.producto).subscribe({
      next: (data:Producto) => {
        this._toast.success("Producto actualizado exitosamente.", "Actualización exitosa", {
          timeOut: 5000
        });
        this._router.navigate(['/productos/lista'])
      },
      error: (error:any) => {
        this._toast.error(JSON.stringify(error.error), "Ha sucedido un inconveniente", {
          timeOut: 5000
        });
      }
    })
  }

  actualizarProductoConImagen(){
    let img = this.producto.imagen_64
      if(this.files[0]){
        this.producto = this.productForm.value as Producto
        this.producto.categorias = this.getListadoIdForm(this.producto.categorias)
        this.producto.stock = this.counter
        this.storaService.cargarImagenProducto(this.files[0]).subscribe({
          next: (data:ResponseUploadImage) => {
            this.producto.imagen_64 = data.urlImagen
            this.actualizarProducto()
          },
          error: (error:any) => {
            this._toast.error(JSON.stringify(error.error), "Ha sucedido un inconveniente", {
              timeOut: 5000
            });
          }
        })
      }else{
        this.producto.imagen_64 = img
        this.actualizarProducto()
      }
  }

  getModelByIds(ids:number[], objs:any[]){
    let l = []
    ids.forEach( idx => {
      objs.forEach(
        (val) =>{
          if(val.id === idx){
            l.push(val)
          }
        }
      )
    })
    return l
  }

  async cargarCategorias(idNegocio:number){
    this.categoriaProductoService.consultarCategoriaProductoPorNegocio(idNegocio).subscribe({
      next: (data:categoriaProducto[]) => {
        this.categoriasProducto = data
      },
      error: (error: any) => {}
    })
  }

  increment() {
    if(this.counter < 9999999 ){this.counter += 1};
  }

  decrement() {
    if(this.counter > 0 ){this.counter -= 1};
  }


  onSelect(event) {
    this.files = event.addedFiles
  }

  onRemove(event) {
    console.log(event);
    this.files = null
  }

  getListadoIdForm(formulario: any) {
    return formulario.map(({ id }) => id);
  }

  ngOnInit() {
  }

}
