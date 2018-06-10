import { TrainingRoutingModule } from './training-routing.module';

describe('TrainingRoutingModule', () => {
  let trainingRoutingModule: TrainingRoutingModule;

  beforeEach(() => {
    trainingRoutingModule = new TrainingRoutingModule();
  });

  it('should create an instance', () => {
    expect(trainingRoutingModule).toBeTruthy();
  });
});
