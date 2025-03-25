import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesDialogComponent } from './badges-dialog.component';

describe('BadgesDialogComponent', () => {
  let component: BadgesDialogComponent;
  let fixture: ComponentFixture<BadgesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
