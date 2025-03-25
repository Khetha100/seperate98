import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Badge, BadgesService } from '../../services/badges.service';
import { CommonModule } from '@angular/common';

export interface BadgeModalData {
  badgeId: number
}

@Component({
  selector: 'app-modal',
  imports: [RouterLink, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  badge: Badge;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BadgeModalData,
    private badgesService: BadgesService
  ) {
    
    // Get the badge based on the provided ID
    const foundBadge = this.badgesService.getBadgeById(data.badgeId);
    
    if (!foundBadge) {
      console.error(`Badge with ID ${data.badgeId} not found`);
    }
    
    this.badge = foundBadge || {
      id: 1,
      name: "Community Builder",
      description: "Created your first community! You're bringing minds together.",
      imageUrl: "badges/community-builder.png"
    };

  }

  close(): void {
    this.dialogRef.close("closed!")
  }
  }

