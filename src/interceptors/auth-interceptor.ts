import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "../services/storage.service";

@Injectable() // intercepetor para incluir token nas requisições
export class AuthInterceptor implements HttpInterceptor{

  constructor(public storage: StorageService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser();

    let N = API_CONFIG.baseUrl.length;/** busca o tamanho da url e armazena na variavel N */
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl; /*pega a requisicao da url, compara o tamanho dela com a url da api*/

    if(localUser && requestToAPI){ /* se localUser for igual a requestToAPi*/
        const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
        return next.handle(authReq);
    }
    else {
      return next.handle(req);
    }  
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};