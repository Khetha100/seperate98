import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideNavComponent } from './inside-nav.component';

describe('InsideNavComponent', () => {
  let component: InsideNavComponent;
  let fixture: ComponentFixture<InsideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsideNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
