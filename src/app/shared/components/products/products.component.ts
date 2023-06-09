import { Component, Input, EventEmitter, Output } from '@angular/core';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../../models/product.model';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import { switchMap,zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  today = new Date();
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
    },
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  @Output() loadMore = new EventEmitter();

  onAddToCart(product: Product): void {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();

    // this.myShoppingCart.push(product);
    //this.total += product.price;
    //this.total = this.myShoppingCart.reduce((acc, product) => acc + product.price, 0);
    //console.log('Product added to cart', product);
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface

  toggleProductDetail(): void {
    this.showProductDetail = !this.showProductDetail;
  }

  showDetail(id: string): void {
    this.statusDetail = 'loading';
    this.productsService.getOne(id).subscribe((product) => {
      //console.log(product);
      this.toggleProductDetail();
      this.productChosen = product;
      this.statusDetail = 'success';
    }, error =>{

      window.alert(error);
      this.statusDetail = 'error';
    });
  }

  readAndUpdate(id: string) {
    this.productsService.getOne(id).pipe(
      switchMap((product) => {
        return this.productsService.update(product.id, {title: 'New title'})
      })
    ).subscribe((product) => {
    //  console.log(product);
    });
    zip(
      this.productsService.getOne(id),
      this.productsService.update(id, {title: 'New title'})
    ).subscribe(([product, updatedProduct]) => {
      //console.log(product);
      //console.log(updatedProduct);
    }
    );
  }

  createNewProduct(): void {
    const product: CreateProductDTO = {
      title: 'New Product',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 100,
      description: 'bla bla',
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((newProduct) => {
      //console.log('created', newProduct);
      this.products.unshift(newProduct);
    });
  }
  updateProduct(): void {
    const changes = {
      title: 'New nuevo',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((product) => {
      console.log('updated', product);
      const productIndex = this.products.findIndex((item) => item.id === this.productChosen.id);
      this.products[productIndex] = product;
    });
  }

  deleteProduct(): void {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
     // console.log('deleted', deleted);
      const productIndex = this.products.findIndex((item) => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.toggleProductDetail();
    });
  }


  OnLoadMore(): void {
    this.loadMore.emit();
  }
}
