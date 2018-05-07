import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

@Injectable()
export class FirebasedbService {

  grupos: AngularFireList<any[]>;
  grupoUser:  AngularFireObject<any>;
  
  constructor(
    private afdb: AngularFireDatabase,   
  ) { }

  getEvents(){
    return this.afdb.list('/actividades',ref => ref.orderByChild('horaInicio')).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

}
