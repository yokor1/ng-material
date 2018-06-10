import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Observable, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore) { }

  fetchAvailableExercises(): Subscription {
    return this.db.collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map(docs => docs
        .map(doc => Object.assign({
        id: doc.payload.doc.id
      }, doc.payload.doc.data())))
    )
    .subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.getExerciseById(selectedId);
    this.exerciseChanged.next(Object.assign({}, this.runningExercise));
  }

  private getExerciseById(selectedId: string): Exercise {

    const foundExercise = this.availableExercises
    .find(exercise => exercise.id === selectedId);
    return foundExercise;
  }

  getRunningExercise(): Exercise {
    return Object.assign({}, this.runningExercise);
  }

  completeExercise() {
    this.exercises.push(Object.assign({
      date: new Date(),
      state: 'completed'
    }, this.runningExercise));
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push(Object.assign({
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    }, this.runningExercise));
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getPastExercises() {
    return this.exercises.slice();
  }
}
