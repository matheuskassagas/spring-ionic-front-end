import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";

@Injectable() //serviço para ser injetado em outras classes
export class CidadeService {

  constructor(public http: HttpClient){ // httpCliente que faz a requisição
  }

  findAll(estado_id : string) : Observable<CidadeDTO[]>{ //no angular uma requisição http não retorna o obj pronto, ela é assincrona, chamada ajax, o angula encapsula essa requisição
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
  }
}