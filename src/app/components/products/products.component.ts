import { Component } from '@angular/core';
import { Product } from '../../shared/types/product.type';
import { Observable, map } from 'rxjs';
import { ProductService } from '../../shared/services/productsService/product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}
  products!: Product[];

  ngOnInit() {
    const $products = this.getProducts();
    $products.subscribe((products) => {
      this.products = [...products];
    });
  }

  addProduct() {
    this.dialog.open(AddProductComponent);
  }

  getProductInfo(product: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
    //this.toastr.success('too', 'bravo');
  }

  getProducts(): Observable<Product[]> {
    return this.productService.getProducts();
  }
}
