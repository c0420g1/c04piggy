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
            path: 'stock',
            component: StockComponent
        },
        {
            path: 'account',
            component: AccountComponent
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
      }

    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
