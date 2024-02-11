import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HomeComponent } from './core/home/home.component';
import { CompanyAuthGuard } from './lib/guards/company-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { 
    path: 'company',
    canLoad: [CompanyAuthGuard],
    canActivate: [CompanyAuthGuard],
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  
  { 
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
