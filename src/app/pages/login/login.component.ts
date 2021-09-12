import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private _toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.formLo = this._formBuilder.group({
      'email': ['', Validators.required],
      'pass': ['', Validators.required]
    })

    this.formRe = this._formBuilder.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'nacimiento': ['', Validators.required],
      'email2': ['', Validators.required],
      'pass2': ['', Validators.required],
      'pass3': ['', Validators.required]
    })
  }

}
