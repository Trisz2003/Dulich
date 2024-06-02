import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DulichnuocngoaiComponent } from './dulichnuocngoai.component';

describe('DulichnuocngoaiComponent', () => {
  let component: DulichnuocngoaiComponent;
  let fixture: ComponentFixture<DulichnuocngoaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DulichnuocngoaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DulichnuocngoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
