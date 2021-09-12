import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
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
  ) { }

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
          this._router.navigate(['inicio']);

          sessionStorage.setItem("id", data.id);
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

      // VALIDAR CONTRASEÑAS IGUALES
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
            this._toast.error("Algo ha salido mal en el proceso, lamentos los invoncenientes.", "Ha sucedido un inconveniente", {
              timeOut: 5000
            });
          },
        );
        // CONTRASEÑAS INVALIDAS
      } else {
        this.formRe.controls.pass2.setValue("");
        this.formRe.controls.pass3.setValue("");

        this._toast.error("Las contraseñas no coinciden, intenta nuevamente.", "Ha sucedido un inconveniente", {
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
