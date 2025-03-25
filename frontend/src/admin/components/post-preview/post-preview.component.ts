import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostInterface } from '../../../app/types/postInterface.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-preview',
    imports: [
      CommonModule,
    ],
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css'],
})
export class PostPreviewComponent {
  @Input() post: PostInterface | null = null; // Post data passed from parent
  @Input() show: boolean = false; // Show or hide the modal
  @Output() close = new EventEmitter<void>(); // Emit close event when the modal is closed

  // Close the modal
  closeModal() {
    this.close.emit(); // Emit event to close the modal
  }
}
