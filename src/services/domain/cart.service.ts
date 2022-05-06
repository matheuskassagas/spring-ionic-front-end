import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService{
  constructor(public storage: StorageService){

  }

  createOrClear() : Cart{
    let cart: Cart = {items: []}; // criado um carrinho vazio
    this.storage.setCart(cart); // armazeno no localstore
    return cart;
  }

  getCart() : Cart{
    let cart : Cart = this.storage.getCart();
    if (cart == null){
      cart = this.createOrClear();
    }
    return cart;
  }

  // addProduto(produto: ProdutoDTO) : Cart {
  //   let cart = this.getCart();
  //   let position = cart.items.findIndex(x => x.produto.id == produto.id) //quero encontrar um elemento x tal que o x.produto.id seja igual ao id do produto que veio como argumento
  //   if (position == -1){ //se o produto nao estiver na lista, por padrao o index retorna -1
  //     cart.items.push({quantidade: 1, produto: produto}); // se o produto nao existe, nos adicionamos
  //     //push metodo que insere elemento na lista 
  //   }
  //   this.storage.setCart(cart);
  //   return cart;
  // }

  addProduto(produto: ProdutoDTO) : Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position == -1) {
      cart.items.push({quantidade: 1, produto: produto});
  }
    this.storage.setCart(cart);
    return cart;
  }
}