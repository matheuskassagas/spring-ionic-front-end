import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient,
    public storage: StorageService){ // httpCliente que faz a requisição
  }

  authenticate(creds : CredenciaisDTO){
      return this.http.post(
        `${API_CONFIG.baseUrl}/login`, 
        creds,
        {
          observe: 'response', //preciso pegar o header da resposta, assim tendo acesso a ele
          responseType: 'text' //evitar o erro de parse de json, pois o endpoint restorna um corpo vazio

        });
  }

  refreshToken(creds : CredenciaisDTO){
    return this.http.post(
      `${API_CONFIG.baseUrl}/refresh_token`,{},
      {
        observe: 'response', //preciso pegar o header da resposta, assim tendo acesso a ele
        responseType: 'text' //evitar o erro de parse de json, pois o endpoint restorna um corpo vazio

      });
}

  sucessfulLogin (authorizationValue : string){ //armazenando usuario no localStorage
      let tok = authorizationValue.substring(7); //pegando o token a partir da setima letra
      let user : LocalUser = {
        token: tok,
        email: this.jwtHelper.decodeToken(tok).sub
      };
      this.storage.setLocalUser(user); 
  }

  logout() { //basicamente setando null no local storage 
    this.storage.setLocalUser(null);
  }

}