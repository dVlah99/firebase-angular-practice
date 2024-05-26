import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditProductInput, Product } from '../../../shared/types/product.type';
import { ProductDialogComponent } from '../../product-dialog/product-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/services/productsService/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private toastr: ToastrService,
    private productService: ProductService
  ) {}

  @Output() toggleEditModeOutput = new EventEmitter<boolean>();
  productInfo!: Product;

  ngOnInit(): void {
    this.productInfo = JSON.parse(JSON.stringify(this.product));
  }

  submitForm(): void {
    const editProduct: EditProductInput = {
      name: this.productInfo.name,
      price: this.productInfo.price,
      description: this.productInfo.description,
      isDeleted: false,
      id: this.productInfo.id,
    };

    this.productService
      .editProduct(editProduct)
      .then(() => {
        console.log('Product edited successfully');
        this.dialogRef.close();
        this.toastr.success('Successfully edited a product', 'Success');
      })
      .catch((error) => {
        console.error('Error editing a product: ', error);
        this.toastr.error('Error while editing a product', 'Error');
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  restoreProduct() {
    this.productInfo = this.product;
  }

  toggleEditMode(): void {
    this.toggleEditModeOutput.emit(false);
  }
}
