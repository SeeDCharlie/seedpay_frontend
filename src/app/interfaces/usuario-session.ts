import { Time } from "@angular/common";
import { Timestamp } from "rxjs";

export interface UsuarioSession {
  id:number,
  nombre:string,
  apellido:string,
  email:string,
  celular:number,
  fecha_creacion: Date,
  fecha_modificacion: Date
}

