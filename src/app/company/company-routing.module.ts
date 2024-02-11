import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { UpdateCompanyProfileComponent } from './update-company/update-company.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfileComponent,
  },
  {
    path: 'update-company',
    component: UpdateCompanyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
