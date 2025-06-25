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
import { BlogComponent } from './view/blog/blog.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TermsOfServiceComponent } from './view/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './view/privacy-policy/privacy-policy.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { ReverseAuthGuard } from './guard/reverse-auth.guard';
import { NoAdminGuard } from './guard/no-admin.guard';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ReverseAuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ReverseAuthGuard],
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: []
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    canActivate: []
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard, NoAdminGuard], // Add your auth guard here if needed
  },
  {
    path: 'collection',
    component: CollectionComponent,
    canActivate: []
  },
  {
    path: 'collection-detail/:id',
    component: CollectionDetailComponent,
    canActivate: []
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, NoAdminGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // OR 'top'
      anchorScrolling: 'enabled',           // Optional: allow fragment links to scroll
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
