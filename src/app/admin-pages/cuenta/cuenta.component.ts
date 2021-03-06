import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TipoIdentificacion } from 'src/app/interfaces/tipoIdentificacion';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { TipoIdentificacionService } from 'src/app/services/tipo-identificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  formCuenta: FormGroup;
  formUsuario: FormGroup;

  usuarioSession: UsuarioSession = JSON.parse(sessionStorage.getItem('user') )   || ''  ;
  usuario: Usuario;
  listTipoIdentificacion: TipoIdentificacion[] = [];
  private _passC: string = "";

  public openDashboard: boolean = false;
  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }


  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _usuarioService: UsuarioService,
    private _tipoIdentificacion: TipoIdentificacionService,
  ) { }

  ngOnInit(): void {
    this.formCuenta = this._formBuilder.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'correo': [''],
      'passw': ['', Validators.required],
    });

    this.formUsuario = this._formBuilder.group({
      'direccion': ['', Validators.required],
      'telefono': ['', Validators.required],
      'identificacion': ['', Validators.required],

    })

    this.buscarUsuarioId(this.usuarioSession.id);
    this.getTipoIdentificacion();
    this.formCuenta.controls.correo.disable;
  }



  //METODO BUSCAR USUARIO ID
  buscarUsuarioId(id: number) {
    this._usuarioService.buscarUsuarioId(id).subscribe(
      data => {
        this.usuario = data;

        this.usuario.username = this.usuario.email;
        this._passC = this.usuario.password;

        // FORMULARIO CUENTA
        this.formCuenta.controls.nombre.setValue(this.usuario.nombre);
        this.formCuenta.controls.apellido.setValue(this.usuario.apellido);
        this.formCuenta.controls.correo.setValue(this.usuario.email);

        // FORMULARIO USUARIO
        this.formUsuario.controls.direccion.setValue(this.usuario.direccion);
        this.formUsuario.controls.identificacion.setValue(this.usuario.identificacion);
        this.formUsuario.controls.telefono.setValue(this.usuario.celular);

      }
    );
  }

  // METODO ACTUALIZAR
  actualizarDatos() {

    if (this.formCuenta.valid && this.formUsuario.valid) {

      this.usuario.nombre = this.formCuenta.controls.nombre.value;
      this.usuario.apellido = this.formCuenta.controls.apellido.value;
      this.usuario.password = this.formCuenta.controls.passw.value;

      this.usuario.direccion = this.formUsuario.controls.direccion.value;
      this.usuario.identificacion = this.formUsuario.controls.identificacion.value;
      this.usuario.celular = this.formUsuario.controls.telefono.value;

      // VALIDAR
      this._usuarioService.loginUsuario(this.usuario).subscribe(
        data => {
          this.usuario.password = this._passC;
          // CONTRASE??A VALIDA
          this._usuarioService.actualizarUsuario(this.usuarioSession.id, this.usuario).subscribe(
            data => {
              // DATOS ACTUALIZADOS
              this._toast.success("Datos actualizados exitosamente.", "Actualizaci??n exitosa", {
                timeOut: 5000
              });
            },
            error => {
              // ERROR INESPERADO
              this._toast.error("Algo ha salido mal en el proceso, lamentamos los inconvenientes.", "Ha sucedido un inconveniente", {
                timeOut: 5000
              });
            }
          );
        },
        // CONTRASE??A INCORRECTA
        error => {
          this.formCuenta.controls.passw.setValue("");
          this._toast.error("La contrase??a es incorrecta.", "Ha sucedido un inconveniente", {
            timeOut: 5000
          });
        }
      )
      // CAMPOS OBLIGATORIOS
    } else {
      this._toast.error("Todos los campos son obligatorios.", "Ha sucedido un inconveniente", {
        timeOut: 5000
      });
    }
  }

  //Metodo Tipos de identificaci??n
  getTipoIdentificacion() {
    this._tipoIdentificacion.getTipoIdentificacion().subscribe(
      data => {
        this.listTipoIdentificacion = data;
      }
    );
  }


}
