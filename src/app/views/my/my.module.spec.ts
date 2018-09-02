import { MyModule } from './my.module';

describe('MyModule', () => {
  let myModule: MyModule;

  beforeEach(() => {
    myModule = new MyModule();
  });

  it('should create an instance', () => {
    expect(myModule).toBeTruthy();
  });
});
