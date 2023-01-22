import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeProfilComponent } from './visualize-profil.component';

describe('VisualizeProfilComponent', () => {
  let component: VisualizeProfilComponent;
  let fixture: ComponentFixture<VisualizeProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
