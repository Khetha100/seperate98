import { CommunityUserRole } from './../types/communityUserRole.interface';
import { Community } from './../types/community.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../types/user.interface';
import { searchInterface } from '../types/search.interface';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  apiUrl: string = environment.SERVER;

  // allCommunities: Community[] = [];

  // yourCommunities: Community[] = [];

  yourCommunities: WritableSignal<Community[]> = signal<Community[]>([]);

  allCommunities: WritableSignal<Community[]> = signal<Community[]>([]);

  publicCommunitiesToJoin: WritableSignal<Community[]> = signal<Community[]>(
    []
  );

  communityUserRole: WritableSignal<CommunityUserRole[]> = signal<
    CommunityUserRole[]
  >([]);

  communityMembersList: WritableSignal<User[]> = signal<User[]>([]);

  // publicCommunitiesToJoin: Community[] = [];

  // communityUserRole: CommunityUserRole[] = [];

  // communityMembersList: User[] = [];

  clickedDiscussionId: number = 0;

  communityClickedId: number = 0;

  constructor(private http: HttpClient) {}

  // allCommunities: Community[] = [];

  setCommunityClickedId(idUpdate: number) {
    this.communityClickedId = idUpdate;
  }

  setclickedDiscussionId(idUpdate: number) {
    this.communityClickedId = idUpdate;
  }

  getCommunityList(): Observable<Community[]> {
    console.log('at get community list service');
    return this.http.get<Community[]>(this.apiUrl + '/api/v1/communities/');
  }

  getCommunity(id: number): Observable<Community> {
    // fetch community by id from API

    return this.http.get<Community>(this.apiUrl + '/api/v1/communities');
  }

  createCommunity(community: Community): Observable<Community> {
    // create new community in API

    return this.http.post<Community>(
      this.apiUrl + '/api/v1/communities',
      community
    );
  }

  updateCommunity(id: number, community: any) {
    // update community by id in API

    return this.http.put<Community>(this.apiUrl + '/api/v1/communities', {});
  }

  deleteCommunity(id: number): Observable<string> {
    return this.http.delete<string>(
      this.apiUrl + '/api/v1/communities/community/' + id
    );
  }

  searchCommunity(searchObj: searchInterface): Observable<Community[]> {
    return this.http.post<Community[]>(
      this.apiUrl + '/api/v1/communities/search/community',
      searchObj
    );
  }

  getCommunityPosts(id: number): Observable<Community[]> {
    // fetch community posts by id from API
    return this.http.get<Community[]>(this.apiUrl + '/community/posts');
  }

  getCommunityUserRole(): Observable<CommunityUserRole[]> {
    return this.http.get<CommunityUserRole[]>(
      this.apiUrl + '/api/v1/communities/members'
    );
  }

  addCommunityMember(
    communityUserRole: CommunityUserRole
  ): Observable<CommunityUserRole> {
    return this.http.post<CommunityUserRole>(
      this.apiUrl + '/api/v1/communities/members',
      communityUserRole
    );
  }

  getCommunityMembers(communityId: number): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrl + '/api/v1/communities/members/' + communityId
    );
  }

  removeCommunityMember(communityUserRoleId: number): Observable<string> {
    return this.http.get<string>(
      this.apiUrl +
        '/api/v1/communities/community/members/remove/' +
        communityUserRoleId
    );
  }

  getCommunityUser(communityUserRoleId: number): Observable<User> {
    return this.http.get<User>(
      this.apiUrl +
        '/api/v1/communities/community/members/added/' +
        communityUserRoleId
    );
  }

  isAdmin(clickedCom?: number): boolean {
    let myBool: boolean = false;
    // console.log(this.communityService.communityUserRole);
    if (clickedCom) {
      this.communityUserRole().forEach((memberRole) => {
        if (memberRole.community?.id == clickedCom) {
          if (
            Number(localStorage.getItem('id')) == memberRole.userInfo?.id &&
            memberRole.communityRole == 'admin'
          ) {
            myBool = true;
          }
        }
      });
    }

    return myBool;
  }

  deleteCommunityService(id?: number) {
    console.log(id);
    if (id) {
      console.log(this.yourCommunities);
      this.yourCommunities;
      this.yourCommunities().forEach((com) => {
        if (com.id == id) {
          let ind = this.yourCommunities().indexOf(com);
          this.yourCommunities().splice(ind, 1);
        }
      });
      // this.yourCommunities.filter((com) => {
      //   com.id == id;
      // });
      console.log(this.yourCommunities);
      this.deleteCommunity(id).subscribe((res) => {
        console.log(res);
      });
    }
  }

  initial() {
    this.getCommunityList().subscribe((res) => {
      this.allCommunities.set(res);
    });

    this.getCommunityUserRole().subscribe((res) => {
      this.communityUserRole.set(res);
    });

    this.communityUserRole;

    this.getCommunityUserRole().subscribe((res) => {
      this.publicCommunitiesToJoin().splice(
        0,
        this.publicCommunitiesToJoin.length
      );
      this.yourCommunities().splice(0, this.yourCommunities.length);
      res.forEach((userComRole) => {
        let check1: boolean = this.checkIfAlreadyAddedCommunity(
          userComRole,
          this.yourCommunities()
        );

        if (
          userComRole.userInfo?.id == Number(localStorage.getItem('id')) &&
          userComRole.community
        ) {
          if (!check1) {
            this.yourCommunities().push(userComRole.community);
          }
        }
      });

      res.forEach((userComRole) => {
        let check2: boolean = this.checkIfAlreadyAddedCommunity(
          userComRole,
          this.publicCommunitiesToJoin()
        );
        let check1: boolean = this.checkIfAlreadyAddedCommunity(
          userComRole,
          this.yourCommunities()
        );
        if (
          userComRole.community?.pubOrPriv == 'public' &&
          userComRole.userInfo?.id != Number(localStorage.getItem('id'))
        ) {
          if (!check1 && !check2) {
            this
              .publicCommunitiesToJoin()
              .push(userComRole.community);
          }
        }
      });
      this.communityUserRole.set(res);
    });
  }

  checkIfAlreadyAddedCommunity(
    communityUserRole: CommunityUserRole,
    community: Community[]
  ) {
    let myBool: boolean = false;
    community.forEach((com) => {
      if (communityUserRole.community?.id == com.id) {
        myBool = true;
      }
    });
    return myBool;
  }
}
