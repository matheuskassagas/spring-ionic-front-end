import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";

@Injectable() //serviço para ser injetado em outras classes
export class CategoriaService {

  constructor(public http: HttpClient){ // httpCliente que faz a requisição
  }

  findAll() : Observable<CategoriaDTO[]>{ //no angular uma requisição http não retorna o obj pronto, ela é assincrona, chamada ajax, o angula encapsula essa requisição
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }
}