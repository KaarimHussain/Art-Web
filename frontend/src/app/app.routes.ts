import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { SignupComponent } from './view/signup/signup.component';
import { UserDashboardComponent } from './view/user-dashboard/user-dashboard.component';
import { ShopComponent } from './view/shop/shop.component';
import { CollectionComponent } from './view/collection/collection.component';

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
    path: 'collection',
    component: CollectionComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
  },
];
