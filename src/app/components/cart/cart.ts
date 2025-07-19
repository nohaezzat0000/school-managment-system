import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CartService } from '../../services/cart';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  cartItems: any[] = [];
  constructor(private cartService: CartService){}
  
  ngOnInit(){
    this.cartItems = this.cartService.getCart();
  }

  removeItem(itemToRemove: any){
    this.cartService.removeFromCart(itemToRemove);
    this.cartItems = this.cartService.getCart();
  }
}
