
import { NgModule } from '@angular/core';
import {
   MatButtonModule,
   MatIconModule,
   MatFormFieldModule,
   MatInputModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatCheckbox,
   MatCheckboxModule,
   MatSidenavModule,
   MatToolbarModule,
   MatListModule,
   MatCardModule,
   MatTabsModule
  } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatCardModule
  ]
})
export class MaterialModule {}
