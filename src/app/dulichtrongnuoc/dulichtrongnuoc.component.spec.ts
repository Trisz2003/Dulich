import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DulichtrongnuocComponent } from './dulichtrongnuoc.component';

describe('DulichtrongnuocComponent', () => {
  let component: DulichtrongnuocComponent;
  let fixture: ComponentFixture<DulichtrongnuocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DulichtrongnuocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DulichtrongnuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
