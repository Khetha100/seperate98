import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../services/auth.service';
import { ReportData, ReportReason } from '../../types/reportData.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './report-post.component.html',
  styleUrl: './report-post.component.css',
})
export class ReportPostComponent {
  isReportFormVisible = false;
  isToastMessageVisible = false;
  toastMessage = '';

  selectedReason: ReportReason | null = null;

  // selectedReason : string = '';
  selectedDescription: string = '';
  contentId: number = 0;

  reportReason = [
    {
      value: ReportReason.InappropriateContent,
      label: 'Inappropriate Content',
    },
    { value: ReportReason.Spam, label: 'Spam' },
    { value: ReportReason.OffensiveLanguage, label: 'Offensive Language' },
    { value: ReportReason.Other, label: 'Other' },
  ];

  constructor(
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  openReportPopUp() {
    this.isReportFormVisible = true;
  }

  closeReportPopUp() {
    this.resetForm();
    this.isReportFormVisible = false;
  }

  onReasonChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedReason = target.value as ReportReason;
  }

  // mapReasonToEnum(reason: string) {
  //   switch (reason) {
  //     case 'Inappropriate Content': return 'InappropriateContent';
  //     case 'Spam': return 'Spam';
  //     case 'Offensive Language': return 'OffensiveLanguage';
  //     default: return 'Other';
  //   }
  // }

  mapReasonToEnum(selectedReason: string): string {
    switch (selectedReason) {
      case 'Inappropriate Content':
        return ReportReason.InappropriateContent;
      case 'Spam':
        return ReportReason.Spam;
      case 'Offensive Language':
        return ReportReason.OffensiveLanguage;
      case 'Other':
        return ReportReason.Other;
      default:
        return '';
    }
  }

  // if user is logged in it gets their id
  // get userId(): number {
  //   return this.authService.getUserId();
  // }

  reportPost(contentId: number) {
    if (!this.selectedReason) {
      alert('Please select a reason for reporting.');
      return;
    }
    console.log('Selected Reason:', this.selectedReason);
    console.log('Selected Descriptioon:', this.selectedDescription);

    const reportData:ReportData = {
      reason: this.selectedReason,
      userId: Number(localStorage.getItem('id')),
      description: this.selectedDescription.trim(),
      createdAt: new Date(),
      postId:this.reportService.reportPostId,
    };

    this.reportService.submitReport(reportData).subscribe(
      (response) => {
        console.log(response);
        this.showToast(
          'Thank you for your feedback! We take reports seriously and will review this content shortly.'
        );
        this.isReportFormVisible = false;
      },
      (error) => {
        console.error('Error reporting content:', error);
        // alert('Failed to submit the report.');
      }
    );

    this.isReportFormVisible = false;
    console.log('Reported:', this.selectedReason);
    this.showToast(
      'Thank you for your feedback! We take reports seriously and will review this content shortly.'
    );
  }

  showToast(message: string) {
    this.toastMessage = message;
    console.log('reported without message');
    this.isToastMessageVisible = true;

    setTimeout(() => {
      this.isToastMessageVisible = false;
    }, 3000);
    console.log('message works');
  }

  onSubmit(event: Event, contentId: number) {
    event.preventDefault(); //this prevents the default form submission, if you remove it the page reloads automatically and toaast message wont show
    this.reportPost(contentId);
    // this.showToast('Form submitted successfully!');
  }

  resetForm() {
    this.selectedReason = null;
    this.selectedDescription = '';
  }
}
