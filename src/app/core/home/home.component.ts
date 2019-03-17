import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebasedbService } from '../services/firebasedb.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { FilterPipe } from './pipes'
import { ActivatedRoute} from '@angular/router';


export interface Evento {
  descripcion: string;
  dias: Array<boolean>;
  estadoActividad: string;
  motivo: string;
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
  mediahora = 1800000;//en milisegundos
  diezminutos = 600000;//en ms
  unminuto = 60000;//en ms
  buscarEnabled:boolean=true;

  queryString: string;

  constructor(
    private fbDb: FirebasedbService,
    private activatedRoute: ActivatedRoute
  ) { }

  eventos: any = new Array;

  ngOnInit() {
    TimerObservable
    .create(this.unminuto, this.unminuto)
    .subscribe(t => {
      this.getEventos();
    });
    this.getEventos();
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params); 
      if (params['view'] == 'pizarra') {
        this.buscarEnabled=false;
      }

    });
  }

  getEventos() {
    this.fbDb.getEvents().subscribe(events => {
      this.eventos = [];
      events.forEach(event => this.filterCurrentActivity(event))
    })
  }

  filterCurrentActivity(evento: Evento) {
    // evento que esta en la semana actual, y que sea hoy
    if (this.belongsToPeriodo(evento)
      && this.isEventValid(evento)) {
      var evento2 = {
        horario: evento.horaInicio + ' a ' + evento.horaFin,
        actividad: evento.descripcion,
        tipo: evento.tipoActividad,
        profesor: evento.nombre,
        aula: evento.zonaAula,
        estado: evento.estadoActividad,
        motivo:evento.motivo,
      }
      this.eventos.push(evento2);
    }
  }
  //que la fecha de hoy este en el periodo de la Actividad
  belongsToPeriodo(actividad: Evento) {
    return moment().isBetween(moment(actividad.pickerDesde, moment.ISO_8601), moment(actividad.pickerHasta, moment.ISO_8601).add(1,'day'));
  }

  belongsToToday(actividad: Evento) {
    const currentFromDayFrom = moment(actividad.pickerDesde).locale('es');
    const currentFromDayTo = moment(actividad.pickerHasta).locale('es');
    return moment().locale('es').diff(currentFromDayFrom, 'days') === 0 || moment().locale('es').diff(currentFromDayTo, 'days') === 0;
  }
  // Controlar el dia seleccionado en array y la hora vencida
  isEventValid(actividad: Evento) {
    return (actividad.dias[moment().locale('es').weekday()]
      && moment().locale('es').format('HH:mm') <= actividad.horaFin);
  }
  
  setStyle(estado) {
    switch (estado) {
      case "Cambio": {
        let style = {
          'color': estado = "Cambio" ? 'orange' : 'black'
        }
        return style
      }
      case "Suspendida": {
        let style = {
          'color': estado = "Suspendida" ? 'red' : 'black'
        }
        return style
      }
      default: {
        let style = {
          'color': estado = "Normal" ? 'green' : 'black'
        }
        return style
      }
    }
  }

  setBackColor(estado) {
    switch (estado) {
      case "Grado": {
        let style = {
          'background': estado = "Grado" ? 'white' : 'black'
        }
        return style
      }
      case "Posgrado": {
        let style = {
          'background': estado = "Posgrado" ? 'bisque' : 'black'
        }
        return style
      }
      case "Extension": {
        let style = {
          'background': estado = "Extension" ? 'turquoise' : 'black'
        }
        return style
      }

      case "Investigación": {
        let style = {
          'background': estado = "Investigación" ? 'palevioletred' : 'black'
        }
        return style
      }

      case "CEFEA": {
        let style = {
          'background': estado = "CEFEA" ? 'lightskyblue' : 'black'
        }
        return style
      }

      case "Ingreso&Permanencia": {
        let style = {
          'background': estado = "Ingreso&Permanencia" ? 'cadetblue' : 'black'
        }
        return style
      }

      case "Otros": {
        let style = {
          'background': estado = "Otros" ? 'lightgray' : 'black'
        }
        return style
      }

      case "Bienestar": {
        let style = {
          'background': estado = "Bienestar" ? 'darkseagreen' : 'black'
        }
        return style
      }
      
    }
  }

  
}