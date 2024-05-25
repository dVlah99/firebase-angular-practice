import { Component } from '@angular/core';
import { Product } from '../../shared/types/product.type';
import { Observable, map } from 'rxjs';
import { ProductService } from '../../shared/services/productsService/product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  isProductSelected: boolean = false;

  ngOnInit() {
    const $products = this.getProducts();
    $products.subscribe((products) => {
      this.products = [...products];
    });
  }

  getProductInfo(product: Product) {
    /*     const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: product,
    });
    this.isProductSelected = true;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
      this.isProductSelected = false;
    }); */
    console.log('anaaal');
  }

  getProducts(): Observable<Product[]> {
    return this.productService.getProducts();
  }
}
