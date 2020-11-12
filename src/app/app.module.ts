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
<<<<<<< Updated upstream
import {TreatmentComponent, TreatmentModal} from './treatment/treatment.component';
=======
import { FeedComponent } from './feed/feed.component';
import { CoteComponent } from './cote/cote.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TableComponent,
    DashboardComponent,
    NotificationComponent,
    NotificationModal,
<<<<<<< Updated upstream
    TreatmentComponent,
    TreatmentModal
=======
    FeedComponent,
    CoteComponent
>>>>>>> Stashed changes
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
