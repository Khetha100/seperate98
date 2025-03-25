import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ModalComponent } from '../modal-delete/modal-delete.component';
import { CommonModule } from '@angular/common';
import { PostPreviewComponent } from '../post-preview/post-preview.component';
import { ReportData } from '../../../app/types/reportData.interface';
import { AdminService } from '../../services/admin.service';
import { PostInterface } from '../../../app/types/postInterface.interface';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    SidebarComponent,
    ModalComponent,
    CommonModule,
    PostPreviewComponent,
  ], // Add the PostPreviewComponent to imports
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  reportedContent: ReportData[] = [];
  showModal = false;
  contentToDeleteId: number | null = null;
  showPostPreviewModal = false; // Flag to control visibility of post preview modal
  selectedPost: PostInterface | null = null; // Store the selected post for preview

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getReportedContent();
  }

  // Fetch reported content from the backend
  getReportedContent() {
    this.adminService.getReportedContent().subscribe(
      (data) => {
        console.log(data);
        this.reportedContent = data;
      },
      (error) => {
        console.error('Error fetching reported content:', error);
      }
    );
  }

  // Confirm content deletion and show modal
  confirmDeleteContent(id: number) {
    this.contentToDeleteId = id;
    this.showModal = true;
  }

  // Close deletion confirmation modal
  closeModal() {
    this.showModal = false;
    this.contentToDeleteId = null;
  }

  // Delete content after confirmation
  deleteContent() {
    if (this.contentToDeleteId !== null) {
      // this.adminService.deleteContent(this.contentToDeleteId).subscribe(
      //   () => {
          // this.reportedContent = this.reportedContent.filter(
          //   (item) => item.id !== this.contentToDeleteId
          // );
      //     this.closeModal();
      //   },
      //   (error) => {
      //     console.error('Error deleting content:', error);
      //     this.closeModal();
      //   }
      // );
      this.adminService
        .deleteReportedPost(this.contentToDeleteId)
        .subscribe(() => {
          console.log("deleted post");
         this.reportedContent = this.reportedContent.filter(
           (item) => item.id !== this.contentToDeleteId
         );
        });
    }
  }

  // Fetch the content to review and show preview modal
  reviewContent(id: number) {
    // console.log('Reviewing content with id:', id);
    this.adminService.getReportedPost(id).subscribe((res) => {
      console.log(res);
      this.selectedPost = res; // Store the selected post for preview
      this.showPostPreviewModal = true; // Show the modal with post preview
    });
  }

  // Close the post preview modal
  closePostPreviewModal() {
    this.showPostPreviewModal = false;
    this.selectedPost = null;
  }
}
