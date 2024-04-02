import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeldaComponent } from './celda.component';

describe('CeldaComponent', () => {
  let component: CeldaComponent;
  let fixture: ComponentFixture<CeldaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CeldaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CeldaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
