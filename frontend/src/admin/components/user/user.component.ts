import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ModalComponent } from "../../components/modal-delete/modal-delete.component";
import { AdminService } from '../../services/admin.service';
import { User } from '../../../app/types/user.interface';
// import { AdminService } from '../services/admin.service';

// import { SidebarComponent } from "../components/sidebar/sidebar.component";
// import { ModalComponent } from "../components/modal-delete/modal-delete.component";
import { AuthService } from '../../../app/services/auth.service';

// interface User {
//   id: number
//   name: string
//   emailOrNumber: string
//   role: string
//   isTemporarilyDeleted: boolean
// }

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ModalComponent, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalConfirmText = '';
  userToDeleteId: number | null = null;
  isTemporaryDelete = false;
  // adminService: any;

  constructor(private adminService: AdminService,
    public authService:AuthService
  ) {}
  // constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
    // this.adminService.getUsers().subscribe(
    //   (data) => {
    //     this.users = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching users:', error);
    //   }
    // );
  }

  confirmTemporaryDelete(id: number) {
    this.userToDeleteId = id;
    this.isTemporaryDelete = true;
    this.modalTitle = 'Confirm Temporary Deletion';
    this.modalMessage =
      'Are you sure you want to temporarily delete this user?';
    this.modalConfirmText = 'Delete';
    this.showModal = true;
  }

  confirmPermanentDelete(id: number) {
    this.userToDeleteId = id;
    this.isTemporaryDelete = false;
    this.modalTitle = 'Confirm Permanent Deletion';
    this.modalMessage =
      'Are you sure you want to permanently delete this user? This action cannot be undone.';
    this.modalConfirmText = 'Delete Permanently';
    this.showModal = true;
  }

  deleteUser() {
    if (this.userToDeleteId !== null) {
      this.isTemporaryDelete
        ? this.temporarilyDeleteUser(this.userToDeleteId)
        : this.permanentlyDeleteUser(this.userToDeleteId);
    }
  }

  temporarilyDeleteUser(userId: number) {
    this.adminService.temporarilyDeleteUser(userId).subscribe(
      () => {
        this.users = this.users.map((user) =>
          user.id === userId ? { ...user, isTemporarilyDeleted: true } : user
        );
      },
      (error) => {
        console.error('Error temporarily deleting user:', error);
      }
    );
  }

  permanentlyDeleteUser(id: number) {
    this.adminService.permanentlyDeleteUser(id).subscribe(
      () => {
        this.users = this.users.filter((user) => user.id !== id);
        this.closeModal();
      },
      (error: any) => {
        console.error('Error permanently deleting user:', error);
        this.closeModal();
      }
    );
  }
  // temporarilyDeleteUser(id: number) {
  //   this.adminService.temporarilyDeleteUser(id).subscribe(
  //     () => {
  //       const user = this.users.find((u) => u.id === id);
  //       if (user) {
  //         user.isTemporarilyDeleted = true;
  //       }
  //       this.closeModal();
  //     },
  //     (error) => {
  //       console.error('Error temporarily deleting user:', error);
  //       this.closeModal();
  //     }
  //   );
  // }

  // permanentlyDeleteUser(id: number) {
  //   this.adminService.permanentlyDeleteUser(id).subscribe(
  //     () => {
  //       this.users = this.users.filter((user) => user.id !== id);
  //       this.closeModal();
  //     },
  //     (error) => {
  //       console.error('Error permanently deleting user:', error);
  //       this.closeModal();
  //     }
  //   );
  // }

  reviewUser(id: number) {
    // Implement review functionality here
    console.log('Reviewing user with id:', id);
  }

  closeModal() {
    this.showModal = false;
    this.userToDeleteId = null;
  }
}
