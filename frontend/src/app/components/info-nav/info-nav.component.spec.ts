import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNavComponent } from './info-nav.component';

describe('InfoNavComponent', () => {
  let component: InfoNavComponent;
  let fixture: ComponentFixture<InfoNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
