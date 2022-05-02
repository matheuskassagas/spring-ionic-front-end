import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs"
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService,
    public alertCtrl: AlertController){
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("passou no interceptor");
    return next.handle(req)
    .catch((error, caught) => {

      let errorObj = error;
      if(errorObj.error){ // se meu errorObj conter o erro entao, eu insiro o erro em erroObj
        errorObj = errorObj.error;
      } if (!errorObj.status){ // ( !resposta em json) if se erroObj nao tiver status, ou seja, formato texto    
        errorObj = JSON.parse(errorObj); //entao converta para json.
      }

      console.log("Erro detectado pelo interceptor: ");
      console.log(errorObj);

      switch(errorObj.status) {
        case 401:
          this.handle401();
          break;

        case 403:
          this.handle403();
          break;

        default:
          this.handleDefaultError(errorObj);
      }

      return Observable.throw(error);
    }) as any;
  }

  handle403(){
    this.storage.setLocalUser(null);
  }

  handle401(){
    let alert = this.alertCtrl.create({
      title: 'Erro 401: falha de autenticação',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  handleDefaultError(erroObj){
    let alert = this.alertCtrl.create({
      title: 'Erro ' + erroObj.status + ': ' + erroObj.error,
      message: erroObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
