import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Negocio } from '../interfaces/negocio';
import { Producto } from '../interfaces/producto';


const state = {
    //products: JSON.parse(localStorage['products'] || '[]'),
    wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
    compare: JSON.parse(localStorage['compareItems'] || '[]'),
    cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
    providedIn: 'root'
})
export class CarritoComprasLocalService {

    public OpenCart: boolean = false;
    public Currency = { name: 'Peso', currency: 'COP', price: 1 } 

    constructor(
        private toastrService: ToastrService
    ) { 

    }


    public get cartItems(): Observable<Producto[]> {
        const itemsStream = new Observable(observer => {
          observer.next(state.cart);
          observer.complete();
        });
        return <Observable<Producto[]>>itemsStream;
      }
    
      // Add to Cart
      public addToCart(product): any {
        const cartItem = state.cart.find(item => item.id === product.id);
        const qty = product.quantity ? product.quantity : 1;
        // const items = cartItem ? cartItem : product;
        //const stock = this.calculateStockCounts(items, qty);
        
        //if(!stock) return false
    
        if (cartItem) {
            cartItem.quantity += qty    
        } else {
          state.cart.push({
            ...product,
            quantity: qty
          })
        }
    
        this.OpenCart = true; // If we use cart variation modal
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true;
      }
    
      // Update Cart Quantity
      public updateCartQuantity(product: Producto, quantity: number): Producto | boolean {
        return state.cart.find((items, index) => {
          if (items.id === product.id) {
            const qty = state.cart[index].quantity + quantity
            const stock = this.calculateStockCounts(state.cart[index], quantity)
            if (qty !== 0 && stock) {
              state.cart[index].quantity = qty
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cart));
            return true
          }
        })
      }
    
        // Calculate Stock Counts
      public calculateStockCounts(product, quantity) {
        const qty = product.quantity + quantity
        const stock = product.stock
        if (stock < qty || stock == 0) {
          this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
          return false
        }
        return true
      }
    
      // Remove Cart items
      public removeCartItem(product: Producto): any {
        const index = state.cart.indexOf(product);
        state.cart.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true
      }
    
      // Total amount 
      public cartTotalAmount(): Observable<number> {
        return this.cartItems.pipe(map((product: Producto[]) => {
          return product.reduce((prev, curr: Producto) => {
            let price = curr.precio;
            // if(curr.discount) {
            //   price = curr.price - (curr.price * curr.discount / 100)
            // }
            return (prev + price * curr.quantity); //* this.Currency.price;
          }, 0);
        }));
      }
    


}