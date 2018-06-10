import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
    ) {}

  ngOnInit() {
    this.exercises =  this.db.collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map(docs => docs
        .map(doc => Object.assign({
        id: doc.payload.doc.id
      }, doc.payload.doc.data())))
    );

  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);
  }

}
