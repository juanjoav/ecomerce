import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAll(this.limit, this.offset).subscribe((products) => {
      //console.log(products);
      this.products = products;
      this.offset += this.limit;
    });
  }

  OnLoadMore(): void {
    this.productsService
      .getAll(this.limit, this.offset)
      .subscribe((products) => {
        // console.log(products);
        this.products = this.products.concat(products);
        this.offset += this.limit;
      });
  }
}
