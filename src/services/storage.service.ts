import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";

//localStorage: local de armazenamento que veio com o html5 (armazena string)

@Injectable()
export class StorageService{

getLocalUser() : LocalUser{ // obten 
  let usr = localStorage.getItem(STORAGE_KEYS.localUser); //recupera o valor do localStore
  if(usr == null){
    return null;
  } else {
    return JSON.parse(usr); //localStorage armazena string, por isso o json.parse
  }
}

setLocalUser(obj : LocalUser) { //armazena
  if(obj == null){
    localStorage.removeItem(STORAGE_KEYS.localUser);

  }else {
    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
  }
}

}