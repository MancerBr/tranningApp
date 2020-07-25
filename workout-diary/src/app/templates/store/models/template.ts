export interface ITemplate {
  name: string;
  exercises: IExercise[];
}

export interface IExercise {
  name: string;
  steps: number;
}
