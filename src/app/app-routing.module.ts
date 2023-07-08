import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LoginGuard } from './shared/guard/login.guard';

//configuring routes
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'shopping', component: ShoppingComponent, canActivate: [AuthGuard] },
  { path: 'shopping', component: ItemDetailComponent },
  { path: "**", component: PageNotFoundComponent }
];

export const routingComponents = [
  LoginComponent,
  ShoppingComponent,
  PageNotFoundComponent,
  ItemDetailComponent
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
