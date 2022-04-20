import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService{

  constructor(public http: HttpClient){ // httpCliente que faz a requisição
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

}