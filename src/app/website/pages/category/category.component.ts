import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {

  products: Product[] = [];
  categoryId: string | null = null;
  limit = 10;
  offset = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.categoryId = params.get('id');
        if (this.categoryId) {
          return this.productService.getByCategory(
            this.categoryId,
            this.limit,
            this.offset
          );
        }
        return []
      })
    )

    .subscribe((data) => {
      this.products = data;
    });
  }

  OnLoadMore(): void {
    this.productService
      .getAll(this.limit, this.offset)
      .subscribe((products) => {
        // console.log(products);
        this.products = this.products.concat(products);
        this.offset += this.limit;
      });
  }
}
