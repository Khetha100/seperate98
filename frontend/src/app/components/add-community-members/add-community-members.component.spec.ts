import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommunityMembersComponent } from './add-community-members.component';

describe('AddCommunityMembersComponent', () => {
  let component: AddCommunityMembersComponent;
  let fixture: ComponentFixture<AddCommunityMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCommunityMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommunityMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
