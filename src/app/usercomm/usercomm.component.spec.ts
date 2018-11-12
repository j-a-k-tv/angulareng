import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercommComponent } from './usercomm.component';

describe('UsercommComponent', () => {
  let component: UsercommComponent;
  let fixture: ComponentFixture<UsercommComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercommComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
