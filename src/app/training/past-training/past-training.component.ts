import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getPastExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
