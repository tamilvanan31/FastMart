import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginGuard } from './shared/login.guard';
import { ShoppingComponent } from './shopping/shopping.component';

//configuring routes
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'shopping', component: ShoppingComponent ,canActivate: [AuthGuard]},
  {path: 'shopping', component: ItemDetailComponent},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent, 
  ShoppingComponent,
  PageNotFoundComponent,
  ItemDetailComponent
]