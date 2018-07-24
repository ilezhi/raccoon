import { TopicModule } from './topic.module';

describe('TopicModule', () => {
  let topicModule: TopicModule;

  beforeEach(() => {
    topicModule = new TopicModule();
  });

  it('should create an instance', () => {
    expect(topicModule).toBeTruthy();
  });
});
