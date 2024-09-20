import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for animations
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}