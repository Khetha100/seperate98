import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrRemoveCommunityMembersComponent } from './add-or-remove-community-members.component';

describe('AddOrRemoveCommunityMembersComponent', () => {
  let component: AddOrRemoveCommunityMembersComponent;
  let fixture: ComponentFixture<AddOrRemoveCommunityMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrRemoveCommunityMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrRemoveCommunityMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
