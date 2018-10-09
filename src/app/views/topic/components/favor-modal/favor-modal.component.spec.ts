import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorModalComponent } from './favor-modal.component';

describe('FavorModalComponent', () => {
  let component: FavorModalComponent;
  let fixture: ComponentFixture<FavorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
