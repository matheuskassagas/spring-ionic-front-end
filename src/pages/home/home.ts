import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage() //Faz com que se possa referenciar a classe como uma string entre aspas "HomePage"
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { //nome da pagina

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController
    ) { // injecao de dependencia como parametro do construtor

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
    this.navCtrl.setRoot('CategoriasPage') //push, metodo que empilha uma pagina na outra
  }

}
