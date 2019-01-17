import { DraftModule } from './draft.module'

describe('DraftModule', () => {
  let draftModule: DraftModule

  beforeEach(() => {
    draftModule = new DraftModule()
  })

  it('should create an instance', () => {
    expect(draftModule).toBeTruthy()
  })
})
