import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
/*   submitForm() {
    console.log('asdasdasd');
    const newProduct: Product = {
      name: this.productName,
      price: this.price,
      isDeleted: false,
      description: this.description,
    };
    //console.log('newProduct: ', newProduct);
    this.firestore.collection('products').add(newProduct);

    const isusino = this.firestore.collection('products').valueChanges();
    isusino.subscribe((data) => {
      console.log('govno te pogodilo');
      console.log(data);
    });
  } */
