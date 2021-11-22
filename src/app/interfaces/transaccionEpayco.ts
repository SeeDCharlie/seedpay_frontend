export interface TransaccionEpauco{
    name: string;
    description: string;
    invoice: string;
    currency: string;
    amount: string;
    tax_base: string;
    tax: string;
    tax_ico: string; //Hace referencia al impuesto nacional al consumo
    country: string;
    lang: string;

    //Onpage="false" - Standard="true"
    external: string;


    //Atributos opcionales, los parámetros extras deben ser enviados como un string
    extra1?: string;
    extra2?: string;
    extra3?: string;
    confirmation: string;
    response: string;

    //Atributos cliente
    name_billing: string;
    address_billing: string;
    type_doc_billing: string;
    mobilephone_billing: string;
    number_doc_billing: string;

    //atributo deshabilitación método de pago
    methodsDisable?: string[];

}