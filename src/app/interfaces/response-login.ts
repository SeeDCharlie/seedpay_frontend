import { UsuarioSession } from "./usuario-session";

export interface ResponseLogin {
  user: UsuarioSession,
  token: string
}
