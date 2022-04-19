import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NegociosInforme, PetInforme, ReqInforme, RespVentasPorNegocios } from 'src/app/interfaces/informeVentas';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { InformeVentasService } from 'src/app/services/informe-ventas.service';
import * as chartData from '../shared/data/chart';
import * as Chart from 'chart.js';
@Component({
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  usuarioSession: UsuarioSession = {} as UsuarioSession
  peticionInforme: PetInforme = {} as PetInforme
  informe: ReqInforme = {} as ReqInforme
  reporteVentas: RespVentasPorNegocios[] = []
  noProductosDisponibles = 0

  // lineChart
  public lineChartData :any[] = [];
  public lineChartLabels : any[] = [];
  public lineChartOptions = chartData.lineChartOptions;
  public lineChartColors = chartData.lineChartColors;
  public lineChartLegend = chartData.lineChartLegend;
  public lineChartType = chartData.lineChartType;


  // lineChart
  public smallLineChartData = chartData.smallLineChartData;
  public smallLineChartLabels = chartData.smallLineChartLabels;
  public smallLineChartOptions = chartData.smallLineChartOptions;
  public smallLineChartColors = chartData.smallLineChartColors;
  public smallLineChartLegend = chartData.smallLineChartLegend;
  public smallLineChartType = chartData.smallLineChartType;

  // lineChart
  public smallLine3ChartData = chartData.smallLine3ChartData;
  public smallLine3ChartLabels = chartData.smallLine3ChartLabels;
  public smallLine3ChartOptions = chartData.smallLine3ChartOptions;
  public smallLine3ChartColors = chartData.smallLine3ChartColors;
  public smallLine3ChartLegend = chartData.smallLine3ChartLegend;
  public smallLine3ChartType = chartData.smallLine3ChartType;

  // lineChart
  public smallLine2ChartData = chartData.smallLine2ChartData;
  public smallLine2ChartLabels = chartData.smallLine2ChartLabels;
  public smallLine2ChartOptions = chartData.smallLine2ChartOptions;
  public smallLine2ChartColors = chartData.smallLine2ChartColors;
  public smallLine2ChartLegend = chartData.smallLine2ChartLegend;
  public smallLine2ChartType = chartData.smallLine2ChartType;

  constructor(
    private informeVentasService: InformeVentasService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private config: NgbDatepickerConfig,
    private modalService: NgbModal
  ) {
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}') as UsuarioSession
    this.peticionInforme.usuario = this.usuarioSession.id
    //configuracion para el datepicker, no deja selecionar las fechas posteriores a la actual
    const current = new Date();
    config.maxDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate()
    };
    config.outsideDays = 'hidden';

    this.fromDate = {
      year: current.getFullYear(), month:
      current.getMonth() + 1, day: 1
    } as NgbDate;


    this.toDate = {
      year: current.getFullYear(), month:
      current.getMonth() + 1, day: current.getDate() + 1
    } as NgbDate;

    //pedir datos de informe - reporte
    this.solicitarInforme()
    this.solicitarReporteVentas()
    this.solicitarProductosDisponibles()
  }

  ngOnInit(): void {
  }



  // events
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }

  //controles date range picker
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.formatter && this.toDate) {
      this.solicitarInforme()
      this.solicitarReporteVentas()
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
  getFromDate() {
    if (this.fromDate) return this.getFormatDate(this.fromDate)
    else ''
  }
  getToDate() {
    if (this.toDate) return this.getFormatDate(this.toDate)
    return ''
  }
  getFormatDate(date) {
    return date.year + "-" + ('0' + date.month).slice(-2) + "-" + ('0' + date.day ).slice(-2)
  }

  //solicitud informes - reportes

  solicitarProductosDisponibles(){
    this.informeVentasService.productosDisponiblesporUsuario(this.usuarioSession.id).subscribe({
      next: (data:number) => {
        this.noProductosDisponibles = data
      },
      error:() => {}
    })
  }

  solicitarInforme() {

    this.peticionInforme.fechaInicio = this.getFormatDate(this.fromDate);
    this.peticionInforme.fechaFin = this.getFormatDate(this.toDate);

    this.informeVentasService.consultarInforme(this.peticionInforme).subscribe({
      next: (data: ReqInforme) => {
        this.informe = data as ReqInforme
        //this.createColors()
      },
      error: (error: any) => {
        console.log("error informe" + JSON.stringify(error.error))
      }
    })
  }

  solicitarReporteVentas(){

    this.peticionInforme.fechaInicio = this.getFormatDate(this.fromDate);
    this.peticionInforme.fechaFin = this.getFormatDate(this.toDate);

    this.informeVentasService.reporteVentasUsrNegocio(this.peticionInforme).subscribe({
      next: (data: RespVentasPorNegocios[]) => {
        this.reporteVentas = data as RespVentasPorNegocios[]
        console.log("reporte exitoso : " + JSON.stringify(data))
        this.getDataLineChart()
        //this.createColors()
      },
      error: (error: any) => {
        console.log("error informe ventas" + JSON.stringify(error.error))
      }
    })

  }
  //calculos para graficas y tablas
  getNoVentasNegocio(idx:number){
    let totalVentas = 0
    if(this.informe.negocios[idx]){
      this.informe.negocios[idx].productos.map(obj => {
        totalVentas += obj.unidadesVendidas
      })
    }
    return totalVentas
  }

  getNoVentasTotal(){
    let total = 0
    if(this.informe.negocios){
      for(let i = 0; i < this.informe.negocios.length; i++){
        total += this.getNoVentasNegocio(i)
      }
    }

    return total
  }

  getDataLineChart(){
    let l = []
    let labels = ['0']
    if(this.reporteVentas){
      this.reporteVentas.map(obj => {
        l.push({
          data: obj.facturas,
          label: obj.negocio.nombre
        })
        obj.facturas.forEach(element => {
          labels.push(element['x'])
        });

      })

      this.lineChartData = l
      this.lineChartLabels = labels.sort()
      console.log("reporte : " + JSON.stringify(this.lineChartLabels))
    }
  }

  getLabels(list){
    let l = []
    list.forEach(element => {
      l.push(element.x)
    });
    return l
  }

}
