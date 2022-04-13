import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage() //Faz com que se possa referenciar a classe como uma string entre aspas "HomePage"
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { //nome da pagina

  constructor(public navCtrl: NavController) { // injecao de dependencia como parametro do construtor

  }

  login(){
    this.navCtrl.setRoot('CategoriasPage') //push, metodo que empilha uma pagina na outra
  }

}
