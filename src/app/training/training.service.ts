import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Observable, Subscription, Timestamp } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { ExerciseWithTimestamp } from './exercise-with-timestamp';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  pastExercisesChanged = new Subject<Exercise[]>();
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
    this.addDateToDatabase(Object.assign({
      date: new Date(),
      state: 'completed'
    }, this.runningExercise));
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDateToDatabase(Object.assign({
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    }, this.runningExercise));
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchPastExercises(): Subscription {
    return this.db.collection('finishedExercise')
    .valueChanges()
    .pipe(
      map((exercises: ExerciseWithTimestamp[]) =>
       exercises.map((exercise: ExerciseWithTimestamp) => this.exerciseWithTimestampToExercise(exercise)))
    )
    .subscribe((result: Exercise[]) => this.pastExercisesChanged.next([...result]));
  }

  private addDateToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercise').add(this.exerciseToExerciseWithTimestamp(exercise));
  }

  private exerciseToExerciseWithTimestamp(exercise: Exercise): ExerciseWithTimestamp {
    return  {
      id: exercise.id,
      name: exercise.name,
      duration: exercise.duration,
      calories: exercise.calories,
      state: exercise.state,
      date: exercise.date.getTime()
    };
  }

  private exerciseWithTimestampToExercise(exercise: ExerciseWithTimestamp): Exercise {
    return  {
      id: exercise.id,
      name: exercise.name,
      duration: exercise.duration,
      calories: exercise.calories,
      state: exercise.state,
      date: new Date(exercise.date)
    };
  }
}
