import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { SignupComponent } from './view/signup/signup.component';
import { UserDashboardComponent } from './view/user-dashboard/user-dashboard.component';
import { ShopComponent } from './view/shop/shop.component';
import { CollectionComponent } from './view/collection/collection.component';
import { ProductDetailComponent } from './view/product-detail/product-detail.component';
import { CollectionDetailComponent } from './view/collection-detail/collection-detail.component';
import { CartComponent } from './view/cart/cart.component';
import { ContactComponent } from './view/contact/contact.component';
import { AboutComponent } from './view/about/about.component';
import { AdminDashboardComponent } from './view/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'collection',
    component: CollectionComponent,
  },
  {
    path: 'collection-detail/:id',
    component: CollectionDetailComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
