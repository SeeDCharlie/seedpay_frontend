import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { CollectionSlider } from 'src/app/shared/data/slider';
import { Motivopqrsf } from './models/motivopqrsf';
import { PqrsfService } from './service/pqrsf.service';

@Component({
  templateUrl: './pqrsf.component.html',
  styleUrls: ['./pqrsf.component.scss']
})
export class PqrsfComponent implements OnInit {
  @Input() class: string;
  categories :any[] = []
  motivos: Motivopqrsf[] = []
  public CollectionSliderConfig: any = CollectionSlider;

  constructor(
    private pqrsfService: PqrsfService
  ) {
    this.traerMotivosPqrsf()
   }

  ngOnInit(): void {
  }


  traerMotivosPqrsf(){
    this.pqrsfService.obtenerMotivosPqrsf().subscribe({
      next: (data:Motivopqrsf[]) => {
        this.motivos = data
      },
      error: (error:any) => {

      }
    })
  }

}
