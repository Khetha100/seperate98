import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCommunityMembersComponent } from './remove-community-members.component';

describe('RemoveCommunityMembersComponent', () => {
  let component: RemoveCommunityMembersComponent;
  let fixture: ComponentFixture<RemoveCommunityMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveCommunityMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveCommunityMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
