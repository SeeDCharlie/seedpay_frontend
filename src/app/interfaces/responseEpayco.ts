export interface ResponseEpayco{
    
    x_cust_id_cliente: number;
    x_description:number;
    x_amount:number;
    x_id_invoice:number;
    x_currency_code:string;
    x_transaction_date: Date;
    x_transaction_id:number;
    x_ref_payco:string;
    x_cod_transaction_state:string;
    x_transaction_state:string;
    x_signature:string;
    x_test_request:boolean;
}