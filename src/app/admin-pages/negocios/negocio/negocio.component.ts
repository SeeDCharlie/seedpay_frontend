import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaNegocio } from 'src/app/interfaces/categoriaNegocio';
import { Ciiu } from 'src/app/interfaces/ciiu';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { Departamento } from 'src/app/interfaces/departamento';
import { Negocio } from 'src/app/interfaces/negocio';
import { ResponseUploadImage } from 'src/app/interfaces/response-upload-image';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { CategoriaNegocioService } from 'src/app/services/categoria-negocio.service';
import { CiiuService } from 'src/app/services/ciiu.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { NegocioService } from 'src/app/services/negocio.service';
import { S3ImagenesService } from 'src/app/services/s3-imagenes.service';

@Component({
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss']
})
export class NegocioComponent implements OnInit {

  departamentos: Departamento[] = []
  ciudades: Ciudad[] = []
  categoriasNegocio: CategoriaNegocio[] = []
  ciiuNegocio: Ciiu[] = []
  files: File[] = [];
  negocio: Negocio = {} as Negocio
  idNegocio:number = -1
  formNegocio: FormGroup;
  usuarioSession: UsuarioSession = {} as UsuarioSession

  // CONFIGURACIÓN SELECT MULTI
  config = {
    displayKey: "nombre",
    search: true,
    height: 'auto',
    placeholder: "Selecciona las diferentes categorías que apliquen a tu negocio",
    moreText: "Más...",
    searchPlaceholder: "Buscar categoría",
    noResultsFound: "No se encontraron resultados",
  }

  // CONFIGURACIÓN SELECT MULTI
  configCiiu = {
    displayKey: "ciiu",
    search: true,
    height: 'auto',
    placeholder: "Selecciona las diferentes CIIU que apliquen a tu negocio",
    moreText: "Más...",
    searchPlaceholder: "Buscar CIIU",
    noResultsFound: "No se encontraron resultados",

  }

  constructor(
    private departamentoService: DepartamentoService,
    private ciudadService: CiudadService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router:Router,
    private categoriaNegocioService: CategoriaNegocioService,
    private ciiuService:CiiuService,
    private storaService:S3ImagenesService,
    private negocioService:NegocioService,
    private _toast: ToastrService,
  ) {

    this.formNegocio = this._formBuilder.group({
      'nombre': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]],
      'descripcion': ['', [Validators.required, Validators.maxLength(200)]],
      'correo': ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
      'direccion': ['', [Validators.required, Validators.maxLength(100)]],
      'telefono': ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      'telefono1': ['', [Validators.nullValidator]],
      'telefono2': ['', [Validators.nullValidator]],
      'ciudad':['', [Validators.required, ]],
      'categorias':['', [Validators.required, ]],
      'negocio_ciiu':['', [Validators.required, ]],
    })
    this.cargarDepartamentos()

    this.cargarCiiuNegoco()
    this.cargarCategoriasNegocio()
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}') as UsuarioSession
    if(this._route.snapshot.paramMap.get('id')){
      this.cargarNegocio(+this._route.snapshot.paramMap.get('id'))
    }

  }

  ngOnInit(): void {

  }

  async cargarNegocio(id:number){
    this.negocioService.buscarNegocioId(id).subscribe({
      next: (data:Negocio) => {
        this.formNegocio.setValue({
          nombre:data.nombre,
          descripcion:data.descripcion,
          correo: data.correo,
          direccion:data.direccion,
          telefono:data.telefono,
          telefono1:data.telefono1,
          telefono2:data.telefono2,
          ciudad:data.ciudad,
          categorias:this.getModelByIds(data.categorias, this.categoriasNegocio),
          negocio_ciiu:this.getModelByIds(data.negocio_ciiu, this.ciiuNegocio),

        })
        this.idNegocio = data.id
        this.negocio = data

      },
      error: (error:any) => {
        alert("error :" + JSON.stringify(error))
      }
    })
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

  onSelect(event) {
    this.files = event.addedFiles
  }

  onRemove(event) {
    console.log(event);
    this.files = null
  }


  async cargarDepartamentos() {
    this.departamentoService.consultarDepartamentos().subscribe({
      next: (departamentos: Departamento[]) => { this.departamentos = departamentos },
      error: () => { }
    })
  }

  async cargarCiudades(idDep: number) {
    this.ciudadService.consultarCiudadesPorDepartamento(idDep).subscribe({
      next: (ciudades: Ciudad[]) => { this.ciudades = ciudades },
      error: () => { }
    })
  }

  async cargarCategoriasNegocio(){
    this.categoriaNegocioService.consultarCategoriaNegocio().subscribe({
      next: (data:CategoriaNegocio[]) => {this.categoriasNegocio = data as CategoriaNegocio[]},
      error: () => {}
    })
  }

  async cargarCiiuNegoco(){
    this.ciiuService.consultarCiiu().subscribe({
      next: (data:Ciiu[]) => {this.ciiuNegocio = data as Ciiu[]},
      error: () => {}
    })
  }

  async guardarNegocioConImagen(){
    if(this.files[0]){
      this.storaService.cargarImagenNegocio(this.files[0]).subscribe({
        next: (data:ResponseUploadImage) => {
          if(this.formNegocio.valid){
            this.negocio = this.formNegocio.value as Negocio
            this.negocio.usuario = this.usuarioSession.id
            this.negocio.categorias = this.getListadoIdForm(this.negocio.categorias)
            this.negocio.negocio_ciiu = this.getListadoIdForm(this.negocio.negocio_ciiu)
            this.negocio.imagen_64 = data.urlImagen
            console.log("negocio : " + JSON.stringify(this.negocio))
            this.negocioService.guardarNegocio(this.negocio).subscribe({
              next: (data:Negocio) => {
                this._toast.success("Negocio creado exitosamente.", "Creación exitosa", {
                  timeOut: 5000
                });
                this._router.navigate(['/negocios/lista'])
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

  async actualizarNegocioConImagen(){
    if(this.files[0]){
      this.storaService.cargarImagenNegocio(this.files[0]).subscribe({
        next: (data:ResponseUploadImage) => {
          if(this.formNegocio.valid){
            this.negocio = this.formNegocio.value as Negocio
            this.negocio.usuario = this.usuarioSession.id
            this.negocio.categorias = this.getListadoIdForm(this.negocio.categorias)
            this.negocio.negocio_ciiu = this.getListadoIdForm(this.negocio.negocio_ciiu)
            this.negocio.imagen_64 = data.urlImagen
            console.log("negocio : " + JSON.stringify(this.negocio))
            this.negocioService.actualizarNegocio(this.idNegocio, this.negocio).subscribe({
              next: (data:Negocio) => {
                this._toast.success("Negocio Actualizado exitosamente.", "Actualizacion exitosa", {
                  timeOut: 5000
                });
                this._router.navigate(['/negocios/lista'])
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
      let img = this.negocio.imagen_64
      if(this.formNegocio.valid){
        this.negocio = this.formNegocio.value as Negocio
        this.negocio.usuario = this.usuarioSession.id
        this.negocio.categorias = this.getListadoIdForm(this.negocio.categorias)
        this.negocio.negocio_ciiu = this.getListadoIdForm(this.negocio.negocio_ciiu)
        this.negocio.imagen_64 = img
        console.log("negocio : " + JSON.stringify(this.negocio))
        this.negocioService.actualizarNegocio(this.idNegocio, this.negocio).subscribe({
          next: (data:Negocio) => {
            this._toast.success("Negocio Actualizado exitosamente.", "Actualizacion exitosa", {
              timeOut: 5000
            });
            this._router.navigate(['/negocios/lista'])
          },
          error: (error:any) => {
            this._toast.error(JSON.stringify(error.error), "Ha sucedido un inconveniente", {
              timeOut: 5000
            });
          }
        })
      }

    }
  }

  async eliminarNegocio(id:number){
    this.negocioService.eliminarNegocio(id).subscribe({
      next: () => {},
      error: (error:any) => {}
    })
  }

  getListadoIdForm(formulario: any) {
    return formulario.map(({ id }) => id);
  }

}
