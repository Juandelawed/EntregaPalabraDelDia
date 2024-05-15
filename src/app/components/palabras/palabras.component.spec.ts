import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalabrasComponent } from './palabras.component';

describe('PalabrasComponent', () => {
  let component: PalabrasComponent;
  let fixture: ComponentFixture<PalabrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalabrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
