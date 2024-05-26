import { Component } from '@angular/core';
import { Product } from '../../shared/types/product.type';
import { Observable, map } from 'rxjs';
import { ProductService } from '../../shared/services/productsService/product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthService } from '../../shared/services/authService/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}
  products!: Product[];
  isAdmin!: boolean;
  deleteMode: boolean = false;
  selectedProductIds: string[] = [];

  async ngOnInit() {
    const $products = this.getProducts();
    $products.subscribe((products) => {
      this.products = [...products];
    });
    const uid = await this.authService.getCurrentUserId();
    this.isAdmin = await this.authService.isAdmin(uid);
  }

  addProduct() {
    this.dialog.open(AddProductComponent);
  }

  getProductInfo(product: Product) {
    this.dialog.open(ProductDialogComponent, {
      data: product,
    });
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  toggleProductIdSelection(productId: string) {
    const index = this.selectedProductIds.indexOf(productId);
    if (index === -1) {
      this.selectedProductIds.push(productId);
    } else {
      this.selectedProductIds.splice(index, 1);
    }
  }

  selectAll() {
    const productsLen = this.products.length;
    if (productsLen === this.selectedProductIds.length) {
      this.selectedProductIds = [];
      return;
    }

    this.products.forEach((product) => {
      const index = this.selectedProductIds.indexOf(product.id);
      if (index === -1) {
        this.selectedProductIds.push(product.id);
      }
    });
  }

  deleteSelectedProducts() {
    this.selectedProductIds.forEach((id) => {
      this.productService.deleteProduct(id);
    });
  }

  isProductSelected(productId: string): boolean {
    return this.selectedProductIds.includes(productId);
  }

  getProducts(): Observable<Product[]> {
    return this.productService.getProducts();
  }
}
