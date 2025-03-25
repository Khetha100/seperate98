import { Component } from '@angular/core';
import { Community } from '../../types/community.interface';
import { CreateCommunityComponent } from '../create-community/create-community.component';
import { AllCommunitiesComponent } from '../all-communities/all-communities.component';


@Component({
  selector: 'app-container',
  imports: [CreateCommunityComponent, AllCommunitiesComponent],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent {
  // listOfCommunities: Community[] = [
  //   {
  //     id: 1,
  //     name: 'Study Geeks',
  //     communityDescription: 'This community is free for all to join',
  //     pubOrPriv: 'Public',
  //     communityPicture: '',
  //     communityMembersNumber: 265,
  //   },
  //   {
  //     id: 2,
  //     name: 'Math Merchants',
  //     communityDescription: 'Do you love Math as much as we do?',
  //     pubOrPriv: 'Public',
  //     communityPicture: '',
  //     communityMembersNumber: 123,
  //   },
  // ];

  // Event handler for when a new community is created
  addCommunity(newCommunity: Community): void {
    // this.listOfCommunities.unshift(newCommunity); // Add the new community to the front
  }
}
