import { Component, EventEmitter, Inject, Output } from '@angular/core';
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
export class EditProductComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private toastr: ToastrService,
    private productService: ProductService
  ) {}
  @Output() toggleEditModeOutput = new EventEmitter<boolean>();
  submitForm() {
    const editProduct: EditProductInput = {
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      isDeleted: false,
      id: this.product.id,
    };

    this.productService
      .editProduct(editProduct)
      .then(() => {
        console.log('Product added successfully');
        this.dialogRef.close();
        this.toastr.success('Succesfully edited a product', 'Success');
      })
      .catch((error) => {
        console.error('Error editing a product: ', error);
        this.toastr.error('Error while editing a product', 'Success');
      });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleEditMode() {
    this.toggleEditModeOutput.emit(false);
  }
}
