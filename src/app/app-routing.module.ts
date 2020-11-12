import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import {TreatmentComponent} from './treatment/treatment.component';


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
    path: 'treatment',
    component: TreatmentComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
