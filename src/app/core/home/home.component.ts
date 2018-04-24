import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebasedbService } from '../services/firebasedb.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export interface Evento {
  descripcion: string;
  dias: Array<boolean>;
  estadoActividad: string;
  horaInicio: string;
  horaFin: string;
  nombre: string;
  periodo: string;
  pickerDesde: string;
  pickerHasta: string;
  tipoActividad: string;
  zonaAula: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private fbDb: FirebasedbService,
  ) { }

  eventos: any = new Array;

  ngOnInit() {

    this.fbDb.getEvents().subscribe(events => {
      events.forEach(event => {
        var evento = {
                    horario: event.horaInicio + ' a ' + event.horaFin,
                    actividad: event.descripcion,
                    tipo: event.tipoActividad,
                    profesor: event.nombre,
                    aula: event.zonaAula,
                    estado: event.estadoActividad,
                    }
          this.eventos.push(evento)
      })
    })
  }

}