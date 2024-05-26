import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../shared/types/product.type';
import { AuthService } from '../../shared/services/authService/auth.service';
import { ProductService } from '../../shared/services/productsService/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent {
  editMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  handleToggle(event: boolean) {
    this.editMode = event;
  }
}
