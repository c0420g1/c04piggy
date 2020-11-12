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
import { TableComponent } from './table/table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {AccountComponent, AccountModal} from './account/account.component';
import {TreatmentComponent, TreatmentModal} from './treatment/treatment.component';
import {CoteComponent } from './cote/cote.component';
import {FeedComponent} from './feed/feed.component';
import { StockComponent } from './stock/stock.component';
import { HistoryExportComponent, HistoryExportModal } from './history-export/history-export.component';



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
    HistoryExportComponent

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
