import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CartService } from '../../services/cart';
@Component({
  selector: 'app-products',
  imports: [CardModule, ButtonModule, DividerModule, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  constructor(private cartService: CartService) {}
  products = [
      {
      name: 'Smartphone',
      price: 599,
      image: 'https://shop.mobily.com.sa/wp-content/uploads/2024/09/Ultramarine-16-1-450x450.png'
    },
    {
      name: 'Headphones',
      price: 149,
      image: 'https://cdns3.thecosmicbyte.com/wp-content/uploads/white-bg-2.jpg.webp'
    },
    {
      name: 'Laptop',
      price: 1299,
      image: 'https://m.media-amazon.com/images/I/512FQVLVhSL._UF1000,1000_QL80_.jpg'
    },
        {
      name: 'Mechanical Keyboard',
      price: 199,
      image: 'https://m.media-amazon.com/images/I/61Aqst0E1LL._UF1000,1000_QL80_.jpg'
    }  
  ];

  addToCart(product: any){
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

}
