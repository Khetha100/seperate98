import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-remove-community-members',
  imports: [],
  templateUrl: './add-or-remove-community-members.component.html',
  styleUrl: './add-or-remove-community-members.component.css'
})
export class AddOrRemoveCommunityMembersComponent {
  constructor(public dialogRef: MatDialogRef<AddOrRemoveCommunityMembersComponent>){

    }

    close(): void {
     this.dialogRef.close('closed!');
  }
}
