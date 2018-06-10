export interface ExerciseWithTimestamp {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: number;
    state?: 'completed' | 'cancelled' | null;
}
