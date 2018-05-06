import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FirebasedbService } from '../services/firebasedb.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as moment from 'moment';
import { Subscription} from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

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

  //Relacionado al plugin momentjs:
  horaActual = moment().locale('es').format('LT');
  hoy = moment().locale('es').format('LLLL');//fecha
  dia = moment().locale('es').format('dddd');//dia de la semana
  mediahora=1800000;//en milisegundos
  diezminutos=600000;//en ms
  unminuto=60000;//en ms

  private subscription : Subscription;

  searchText: string;
  @Output() searchEmit = new EventEmitter();

  constructor(
    private fbDb: FirebasedbService,
  ) { }

  eventos: any = new Array;

  ngOnInit() {
    let timer = TimerObservable.create(this.unminuto, this.unminuto);
    this.subscription=timer.subscribe(t=>{
      this.fbDb.getEvents().subscribe(events => {
        this.eventos = [];
        events.forEach(event => this.filterCurrentActivity(event))
      }) 
      console.log("ejecucion de refresco.");
    })
    this.fbDb.getEvents().subscribe(events => {
      this.eventos = [];
      events.forEach(event => this.filterCurrentActivity(event))
    })

    
  }

  filterCurrentActivity(evento: Evento) {
    // evento que esta en la semana actual, y que sea hoy
    if ( this.belongsToPeriodo(evento)
        &&  this.isEventValid(evento)) {
          var evento2 = {
            horario: evento.horaInicio + ' a ' + evento.horaFin,
            actividad: evento.descripcion,
            tipo: evento.tipoActividad,
            profesor: evento.nombre,
            aula: evento.zonaAula,
            estado: evento.estadoActividad,
            }
        this.eventos.push(evento2);
    }
  }
  //que la fecha de hoy este en el periodo de la Actividad
  belongsToPeriodo(actividad: Evento) {
    return moment().isBetween(moment(actividad.pickerDesde, moment.ISO_8601), moment(actividad.pickerHasta, moment.ISO_8601));
  }

  belongsToToday(actividad: Evento) {
    const currentFromDayFrom = moment(actividad.pickerDesde).locale('es');
    const currentFromDayTo = moment(actividad.pickerHasta).locale('es');
    return moment().locale('es').diff(currentFromDayFrom ,'days') === 0 || moment().locale('es').diff(currentFromDayTo ,'days') === 0;
  }
  // Controlar el dia seleccionado en array y la hora vencida
  isEventValid(actividad: Evento) {
    return (actividad.dias[moment().locale('es').weekday()]
          && moment().locale('es').format('HH:mm') >= actividad.horaInicio
          && moment().locale('es').format('HH:mm') <= actividad.horaFin);
  }

  searchTextToParent() {
        this.searchEmit.emit(this.searchText);
  }

}