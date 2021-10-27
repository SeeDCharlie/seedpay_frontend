export interface Pedidos {
    id: number;
    estado: string;
    metodo_pago:string;
    fecha_creacion: Date;
    valor_total: number;
}