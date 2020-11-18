import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotificationComponent, NotificationModal} from './notification/notification.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DeleteModal, TableComponent} from './table/table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {AccountComponent, AccountModal} from './account/account.component';
import {TreatmentComponent, TreatmentModal} from './treatment/treatment.component';
import {CoteComponent} from './cote/cote.component'
import {DatePipe} from '@angular/common';
import {ExportModal, StockComponent, StockModal} from './stock/stock.component';
import {FeedComponent, FeedModal} from './feed/feed.component';
import {MatInputModule} from '@angular/material/input';
import {HistoryExportComponent} from './history-export/history-export.component';
import {PigComponent} from './pig/pig.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AccountDetailComponent} from './account-detail/account-detail.component';
import {LoginComponent} from './login/login.component';
import {ExportHistoryStockComponent} from './export-history-stock/export-history-stock.component';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {VacxinComponent, VacxinModal} from './vacxin/vacxin.component';
import {HerdComponent} from './herd/herd.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        TableComponent,
        DashboardComponent,
        NotificationComponent,
        NotificationModal,
        AccountComponent,
        AccountModal,
        TreatmentComponent,
        TreatmentModal,
        CoteComponent,
        FeedComponent,
        StockComponent,
        HistoryExportComponent,
        StockModal,
        ExportModal,
        PigComponent,
        AccountDetailComponent,
        LoginComponent,
        ExportHistoryStockComponent,
        FeedModal,
        DeleteModal,
        VacxinComponent,
        VacxinModal,
        HerdComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgbModule,
        MatTableModule,
        MatFormFieldModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
        CommonModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-center',
            preventDuplicates: true,
        }),
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}
