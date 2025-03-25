import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiComponent } from './emoji.component';

describe('EmojiComponent', () => {
  let component: EmojiComponent;
  let fixture: ComponentFixture<EmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
