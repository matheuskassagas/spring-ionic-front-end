import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

  constructor(public http: HttpClient,
    public storage: StorageService) {

  }

  findById(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/${email}`);
}
    //let token = this.storage.getLocalUser().token; // busca token armazenado no localStore
    //let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token}); // instancia para colocar o valor do token no header da solicitação
    //{'headers': authHeader}); //passando o cabeçalho para a requisiçã
    findByEmail(email: string) {
      return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }
  getImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }

  insert(obj: ClienteDTO){
    return this.http.post(
      `${API_CONFIG.baseUrl}/clientes`, obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}