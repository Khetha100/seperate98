import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-delete-modal',
  imports: [CommonModule],
  template: `
  <div class="report-container cursor-pointer" (click)="openDeletePopUp()">
  <img class="w-4 h-4 absolute top-[25px] right-[18px]" src="report.svg" alt="Report" />
</div>
    <div *ngIf="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              {{ message }}
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button (click)="onConfirm()" class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
              {{ confirmText }}
            </button>
            <button (click)="closeReportPopUp()" class="mt-3 px-4 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
              {{ cancelText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() show = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to perform this action?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  isReportFormVisible = false;


  constructor(public postService: PostService) {

  }


  onConfirm() {
    // console.log("confirm work")
    this.postService.posts = this.postService.posts.filter((post) => { post.id != this.postService.postIdToDelete })
    this.postService.deleteReportedPost(this.postService.postIdToDelete).subscribe((res) => {
      console.log(res)
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  openDeletePopUp() {
    this.show = true;
  }

  onSubmit(event: Event, contentId: number) {
    event.preventDefault();
  }


  closeReportPopUp() {
    this.show = false;
  }

  // resetForm() {
  //   this.selectedReason = null;
  //   this.selectedDescription = '';
  // }
}
