import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotificationComponent} from './notification/notification.component';
import {AccountComponent} from './account/account.component';
import {TreatmentComponent} from './treatment/treatment.component';
import {CoteComponent} from './cote/cote.component';
import {StockComponent} from './stock/stock.component';
import {FeedComponent} from './feed/feed.component';
import {HistoryExportComponent} from './history-export/history-export.component';
import {PigComponent} from './pig/pig.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { LoginComponent } from './login/login.component';
import {ExportHistoryStockComponent} from './export-history-stock/export-history-stock.component';
import { VacxinComponent } from './vacxin/vacxin.component';
import {AuthGuard} from './service/auth.guard.service';
import {AdminAuthService} from './service/admin-auth.service';
import {HerdComponent} from './herd/herd.component';



const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
    ,
    {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [{
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'vacxin',
        component: VacxinComponent
    },
        {
            path: 'notification',
            component: NotificationComponent
        },
        {
            path: 'stock',
            component: StockComponent
            ,
        },
        {
            path: 'account',
            component: AccountComponent,
            canActivate: [AdminAuthService],
            data: {
                expectedRole : 'admin'
            }
        },
        {
            path: 'treatment',
            component: TreatmentComponent
        },
        {
          path: 'cote',
          component: CoteComponent
        },
        {
            path: 'feed',
            component: FeedComponent
        },
        {
            path: 'pig',
            component: PigComponent
        },
      {
        path: 'export-management',
        component: HistoryExportComponent
      },
        {
            path: 'account-detail',
            component: AccountDetailComponent
        },
        {
            path: 'history-of-stock-out',
            component: ExportHistoryStockComponent
        },
        {
            path: 'herd',
            component: HerdComponent
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
