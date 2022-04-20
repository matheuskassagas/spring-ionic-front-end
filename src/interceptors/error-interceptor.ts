import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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

      return Observable.throw(error);
    }) as any;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};