import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FirebaseauthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase,     
    private router: Router
  ) { }

  usuario:  AngularFireObject<User>;

  getUser(){
    return this.afAuth.authState
  }

  mailSignUp(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.updateUserDataEmail(value)
        this.router.navigate(['/home']);         
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }


  mailLogin(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['/home']);    
      })
      .catch(err => {
        console.log('Algo no salio bien, vuelva a intentar',err.message);
      });
  }

  facebookLogin() { 
    const provider = new firebase.auth.FacebookAuthProvider()
    this.afAuth.auth.signInWithPopup(provider)
                    .then((credential) => {this.updateUserData(credential.user)
    })  
  }

  googleLogin() { 
    const provider = new firebase.auth.GoogleAuthProvider()
    this.afAuth.auth.signInWithPopup(provider)
                    .then((credential) => {this.updateUserData(credential.user)
    })  
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    this.usuario = this.afdb.object(`/users/${user.uid}`);
    
    const data: User = {
      uId: user.uid,
      nombre: user.displayName,
      email: user.email,
      photoURL: user.photoURL,    
    }

    this.usuario.update(data)
    this.router.navigate(['/home']);         
  }

  private updateUserDataEmail(value) {

    const data: User = {
      uId: value.uid,
      nombre: value.email,
      email: value.email,
    }
    this.usuario.set(data)
    
    this.router.navigate(['/home']);         
  }
  logOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['']);
    });
  }

}
