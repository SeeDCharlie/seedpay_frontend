import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { TkConfirm } from 'src/app/interfaces/tk-confirm';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLo: FormGroup;
  formRe: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _usuarioService: UsuarioService,
    private _router: Router,
    private usuarioService: UsuarioService
  ) {
      let usuarioSe:UsuarioSession = JSON.parse(sessionStorage.getItem("user") || "{}" ) as UsuarioSession
      let tkConf: TkConfirm = {usuario: usuarioSe.id, token:sessionStorage.getItem('token')}
      this.usuarioService.tokenConfirm(tkConf).subscribe(
        data => {
          if(data as boolean){
            this._router.navigate(['/inicio'])
          }
        },
        error => {
          console.log(error.error)
        }
      )
   }

  ngOnInit(): void {
    this.formLo = this._formBuilder.group({
      'email': ['', Validators.required],
      'pass': ['', Validators.required]
    })

    this.formRe = this._formBuilder.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'email2': ['', Validators.required],
      'pass2': ['', Validators.required],
      'pass3': ['', Validators.required]
    })
  }

  // METODO LOGIN
  loginUsuario() {
    if (this.formLo.valid) {

      let usuario: Usuario = {
      }

      usuario.username = this.formLo.controls.email.value;
      usuario.password = this.formLo.controls.pass.value;

      this._usuarioService.loginUsuario(usuario).subscribe(
        data => {

          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.user as UsuarioSession));
          this._router.navigate(['inicio']);
        },
        error => {
          this._toast.error("Los datos no coinciden con un usuario existente.", "Ha sucedido un inconveniente", {
            timeOut: 5000
          });
        }
      );

      // CAMPOS VACIOS
    } else {
      this._toast.error("Todos los campos del login son obligatorios.", "Ha sucedido un inconveniente", {
        timeOut: 5000
      });
    }
  }

  // METODO REGISTRAR USUARIO
  registrarUsuario() {
    if (this.formRe.valid) {
      let usuario: Usuario = {
      }

      usuario.nombre = this.formRe.controls.nombre.value;
      usuario.apellido = this.formRe.controls.apellido.value;
      usuario.email = this.formRe.controls.email2.value;

      // VALIDAR CONTRASE??AS IGUALES
      if (this.formRe.controls.pass2.value === this.formRe.controls.pass3.value) {
        usuario.password = this.formRe.controls.pass2.value;
        // REGISTRAR USUARIO
        this._usuarioService.registrarUsuario(usuario).subscribe(
          data => {
            this._toast.success("Ya puedes ingresar a SeedPay.", "Registro exitoso", {
              timeOut: 5000
            });
          },
          error => {
            // ERRORES
            if (error.error) {
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
        // CONTRASE??AS INVALIDAS
      } else {
        this.formRe.controls.pass2.setValue("");
        this.formRe.controls.pass3.setValue("");

        this._toast.error("Las contrase??as no coinciden, intenta nuevamente.", "Ha sucedido un inconveniente", {
          timeOut: 5000
        });
      }
      // CAMPOS VACIOS
    } else {
      this._toast.error("Todos los campos de registro son obligatorios.", "Ha sucedido un inconveniente", {
        timeOut: 5000
      });
    }
  }

}
