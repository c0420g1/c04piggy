import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent, NotificationModal } from './notification/notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {DeleteModal, TableComponent} from './table/table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {AccountComponent, AccountModal} from './account/account.component';
import {TreatmentComponent, TreatmentModal} from './treatment/treatment.component';
import {CoteComponent } from './cote/cote.component';
import {ExportModal, StockComponent, StockModal} from './stock/stock.component';
import {FeedComponent, FeedModal} from './feed/feed.component';
import {MatInputModule} from '@angular/material/input';
import { HistoryExportComponent, HistoryExportModal } from './history-export/history-export.component';
import { PigComponent } from './pig/pig.component';
import { ExportHistoryStockComponent } from './export-history-stock/export-history-stock.component';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';





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
    HistoryExportModal,
    HistoryExportComponent,
    StockModal,
    ExportModal,
    PigComponent,
    ExportHistoryStockComponent,
      FeedModal,
      DeleteModal
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
            positionClass: 'toast-top-full-width',
            preventDuplicates: true,
        }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
