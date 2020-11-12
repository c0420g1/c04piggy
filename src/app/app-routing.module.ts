import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotificationComponent} from './notification/notification.component';
import {FeedComponent} from './feed/feed.component';
import {HistoryExportComponent} from './history-export/history-export.component';


const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'notification',
            component: NotificationComponent
        }, {
            path: 'feed',
            component: FeedComponent
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
