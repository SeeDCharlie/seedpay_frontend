import { Component, OnInit } from '@angular/core';
import { PetInforme, ReqInforme } from 'src/app/interfaces/informeVentas';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { InformeVentasService } from 'src/app/services/informe-ventas.service';
import * as chartData from '../../shared/data/chart';
@Component({
  templateUrl: './informe-ventas.component.html',
  styleUrls: ['./informe-ventas.component.scss']
})
export class InformeVentasComponent implements OnInit {
  public doughnutChartColorScheme =  {
    domain: [],
  };
  public doughnutChartGradient = chartData.doughnutChartGradient;
  public doughnutChartTooltip = chartData.doughnutChartTooltip;
  public doughnutData = chartData.doughnutData;

  anos: number[] = [2022,]
  anoAux:any = "Año"
  mesAux = "Mes"
  meses:  string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  usuarioSession: UsuarioSession = {} as UsuarioSession
  peticionInforme: PetInforme = {} as PetInforme
  informe: ReqInforme = {} as ReqInforme

  constructor(
    private informeVentasService:InformeVentasService
  ) {
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}') as UsuarioSession
    this.peticionInforme.usuario = this.usuarioSession.id
  }

  ngOnInit(): void {

  }



  getMes(mes:string, idx:number){
    this.mesAux = mes
    this.peticionInforme.mes = idx + 1
    if(idx > -1 && this.peticionInforme.ano > -1) {
      this.solicitarInforme()
    }
  }
  getAno(ano:number, idx:number){
    this.anoAux = ano
    this.peticionInforme.ano = this.anos[idx]
    if(idx > -1 && this.peticionInforme.mes > -1){
      this.solicitarInforme()
    }
  }
  solicitarInforme(){

    this.informeVentasService.consultarInforme(this.peticionInforme).subscribe({
      next: (data:ReqInforme) => {
        this.informe = data as ReqInforme
        this.createColors()
      },
      error: (error:any) => {
        console.log("error informe" + error.error)
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
}
