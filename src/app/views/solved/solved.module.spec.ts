import { SolvedModule } from './solved.module';

describe('SolvedModule', () => {
  let solvedModule: SolvedModule;

  beforeEach(() => {
    solvedModule = new SolvedModule();
  });

  it('should create an instance', () => {
    expect(solvedModule).toBeTruthy();
  });
});
