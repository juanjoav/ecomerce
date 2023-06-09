import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: '',
      name: ''
    }
  }
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  onAddToCart(): void {
    this.addedProduct.emit(this.product);
  }

  onShowDetail():void{
    this.showProduct.emit(this.product.id);
  }
}
