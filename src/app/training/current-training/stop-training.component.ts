import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stop-training',
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-action>
    <button mat-button [mat-dialog-close]="true">Yes</button>
    <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-action>
  `
})
export class StopTrainingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
