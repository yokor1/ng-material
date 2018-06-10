import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exercisesChanged: Subscription;

  constructor(
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.exercisesChanged = this.trainingService.exercisesChanged
    .subscribe(exercises => this.exercises = exercises);

    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exercisesChanged.unsubscribe();
  }
}
