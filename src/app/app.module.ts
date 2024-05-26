import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environment';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenubarModule } from 'primeng/menubar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/guardServices/auth.interceptor';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ProductsComponent } from './components/products/products.component';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { TableModule } from 'primeng/table';

import { ToastrModule } from 'ngx-toastr';
import { ViewProductComponent } from './components/products/view-product/view-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProductsComponent,
    HeaderComponent,
    ProductDialogComponent,
    AddProductComponent,
    ViewProductComponent,
    EditProductComponent,
    UserManagerComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
      enableHtml: true,
      progressBar: true,
      closeButton: true,
      timeOut: 5000,
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MenubarModule,
    DropdownModule,
    BrowserAnimationsModule,
    MenuModule,
    RippleModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    ScrollPanelModule,
    TableModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent],
})
export class AppModule {}
