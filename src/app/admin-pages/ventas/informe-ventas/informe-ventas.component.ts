import { Component, OnInit } from '@angular/core';
import { PetInforme, ReqInforme } from 'src/app/interfaces/informeVentas';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { InformeVentasService } from 'src/app/services/informe-ventas.service';
import * as chartData from '../../shared/data/chart';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './informe-ventas.component.html',
  styleUrls: ['./informe-ventas.component.scss']
})
export class InformeVentasComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  doughnutChartColorScheme =  {
    domain: [],
  };
  doughnutChartGradient = chartData.doughnutChartGradient;
  doughnutChartTooltip = chartData.doughnutChartTooltip;
  doughnutData = chartData.doughnutData;

  usuarioSession: UsuarioSession = {} as UsuarioSession
  peticionInforme: PetInforme = {} as PetInforme
  informe: ReqInforme = {} as ReqInforme

  constructor(
    private informeVentasService:InformeVentasService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private config: NgbDatepickerConfig,
    private modalService: NgbModal
  ) {
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}') as UsuarioSession
    this.peticionInforme.usuario = this.usuarioSession.id
    //configuracion para el datepicker, no deja selecionar las fechas posteriores a la actual
    const current = new Date();
    config.maxDate = { year: current.getFullYear(), month:
    current.getMonth() + 1, day: current.getDate() };
      //config.maxDate = { year: 2099, month: 12, day: 31 };
    config.outsideDays = 'hidden';

  }

  ngOnInit(): void {

  }

  solicitarInforme(){

    this.informeVentasService.consultarInforme(this.peticionInforme).subscribe({
      next: (data:ReqInforme) => {
        this.informe = data as ReqInforme
        this.createColors()
      },
      error: (error:any) => {
        console.log("error informe" + JSON.stringify(error.error))
      }
    })
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#'; // <-----------
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color
  }

  getValoresProductosNegocioGrafica(idxNegocio:number){
    let valores = []
    this.informe.negocios[idxNegocio].productos.forEach(obj => {
      valores.push({'name':obj.nombreProducto,'value':obj.valorTotal})
    })
    return valores
  }

  getValoresGrafica(){
    let valores = []
    this.informe.negocios.forEach(obj => {
      valores.push({'name':obj.negocio.nombre,'value':obj.total})
    })

    return valores
  }

  createColors(){
    for(let i = 0; i < this.informe.negocios.length; i++){
      this.doughnutChartColorScheme.domain.push(this.getRandomColor())
    }
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if(this.formatter && this.toDate){
      this.peticionInforme.fechaInicio = this.getFormatDate(this.fromDate);
      this.peticionInforme.fechaFin = this.getFormatDate(this.toDate);
      this.solicitarInforme()
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  getFromDate(){
    if(this.fromDate) return this.getFormatDate(this.fromDate)
    else 'Desde'
  }
  getToDate(){
    if(this.toDate) return  this.getFormatDate(this.toDate)
    return 'Hasta'
  }
  getFormatDate(date){
    return date.year+"-"+('0'+date.month).slice(-2)+"-"+('0'+date.day).slice(-2)
  }

  openModalGraficaBarras(content) {
    this.modalService.open(content, {scrollable: true, centered: true , size: 'lg', ariaLabelledBy: 'modal-basic-title'})
  }
}
