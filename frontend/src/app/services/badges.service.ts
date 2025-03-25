import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserInfo {
  id: number;
  name: string;
  badges?: Badge[];
  earnedBadges?: Badge[];
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  dateGranted?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BadgesService {
  public badges: Badge[] = [
    {
      id: 1,
      name: 'Community Builder',
      description: 'Bringing minds together, one group at a time!',
      imageUrl: 'badges/community.png',
    },
    {
      id: 2,
      name: 'Discussion Dynamo',
      description: 'Turning silence into conversations!',
      imageUrl: 'badges/discuss.png',
    },
    {
      id: 3,
      name: 'Connector 100+',
      description: 'A social magnet! Over 100 connections and counting!',
      imageUrl: 'badges/connector.png',
    },
    {
      id: 4,
      name: 'Insightful Commenter',
      description: 'Dropping wisdom, one comment at a time!',
      imageUrl: 'badges/commentor.png',
    },
    {
      id: 5,
      name: 'Content Champion',
      description: 'Posts, posts, and more posts! Keeping EduMingle buzzing!',
      imageUrl: 'badges/contentChamp.png',
    },
    {
      id: 6,
      name: 'Guardian of the Community',
      description: 'Keeping EduMingle safe and sound!',
      imageUrl: 'badges/guardian.png',
    },
    {
      id: 7,
      name: 'Study Buddy',
      description: 'Always ready to collaborate and help!',
      imageUrl: 'badges/studyBud.png',
    },
    {
      id: 8,
      name: 'Rising Star',
      description: 'On the way to greatness!',
      imageUrl: 'badges/risingStar.png',
    },
  ];

  getBadges(): Badge[] {
    return this.badges;
  }

  getBadgeById(id: number): Badge | undefined {
    return this.badges.find((badge) => badge.id === id);
  }

  getBadgeByIndex(index: number): Badge {
    return this.badges[index] || this.badges[0];
  }

  // Helper method to check if a user has earned a specific badge
  hasBadge(userId: number, badgeId: number): boolean {
    // This would typically check against a backend service
    // For now, we'll return a mock implementation
    return false;
  }

  private apiUrl = 'api/v1';

  constructor(private http: HttpClient) {}

  getUserBadge(userId: number): Observable<Badge | null> {
    return this.http.get<Badge>(`${this.apiUrl}/users/${userId}/badge`);
  }

  getAllBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.apiUrl}/badges`);
  }

  formatBadgeDate(dateGranted: string): string {
    const date = new Date(dateGranted);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Helper method to check if user has a specific badge
  userHasBadge(user: UserInfo, badgeId: number): boolean {
    return user.badges?.some((badge) => badge.id === badgeId) ?? false;
  }

  awardBadge(userId: number, badgeId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/badges/award/${userId}`, {
      badgeId,
    });
  }
}
