import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor(){
    const storedCart = localStorage.getItem('cart');
    if(storedCart){
      this.cart = JSON.parse(storedCart);
    }
  }
  getCart(){
    return this.cart;
  }
  
  addToCart(product: any){
    this.cart.push(product);
    this.saveCart();
  }

  removeFromCart(productToRemove: any){
    this.cart = this.cart.filter(item => item !== productToRemove);

  }

  private saveCart(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
