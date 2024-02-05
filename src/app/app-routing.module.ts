import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)},
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  // { path: 'company-profile', component: CompanyProfileComponent},
  // {
  //   path: 'update-company',
  //   component: UpdateCompanyProfileComponent,
  //   canActivate: [CompanyAuthGuard], // Apply the AuthGuard to this route
  // },
  // {
  //   path: 'company',
  //   component: CompanyProfileComponent,
  //   canActivate: [CompanyAuthGuard]
  // },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
