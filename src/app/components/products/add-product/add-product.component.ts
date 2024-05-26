import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/services/productsService/product.service';
import { AddProductInput } from '../../../shared/types/product.type';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  constructor(
    private dialogRef: MatDialogRef<AddProductComponent>,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}
  productName!: string;
  price!: number;
  description!: string;

  submitForm() {
    const newProduct: AddProductInput = {
      name: this.productName,
      price: this.price,
      description: this.description,
      isDeleted: false,
    };

    this.productService
      .addProduct(newProduct)
      .then(() => {
        console.log('Product added successfully');
        this.dialogRef.close();
        this.toastr.success('Added a new product', 'Success');
      })
      .catch((error) => {
        console.error('Error adding product: ', error);
        // Show an error message to the user
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
