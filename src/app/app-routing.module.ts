import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { AccountComponent } from './account/account.component';
import {TreatmentComponent} from './treatment/treatment.component';
import {CoteComponent} from './cote/cote.component';


const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
    {
      path: 'account',
      component: AccountComponent
    },
  {
    path: 'treatment',
    component: TreatmentComponent
  },
    {path: 'cote', component: CoteComponent}
]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
