import { CommonModule } from "@angular/common"
import { Component, Input, Output, EventEmitter } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { ReportService } from "../../services/report.service"

@Component({
  selector: "app-report-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./report-modal.component.html",
  styleUrls: ["./report-modal.component.css"],
})
export class ReportModalComponent {

  isReportFormVisible = false;
  isToastMessageVisible = false;
  toastMessage = '';
  selectedReason: string = '';
  additionalDetails = "";
  
  @Input() contentType: "community" | "discussion" | "message" = "community"
  @Input() contentId = 0
  @Output() closeModal = new EventEmitter<void>()



  constructor(private reportService: ReportService) { }

  openReportPopUp() {
    this.isReportFormVisible = true;

  }

  close() {
    this.isReportFormVisible = false
    this.closeModal.emit()
  }

  onReasonChange(event: Event) {
    this.selectedReason = (event.target as HTMLSelectElement).value
  }



  // submitReport() {
  //   if (!this.selectedReason) {
  //     alert("Please select a reason for reporting.")
  //     return
  //   }
  //   const reportData = {
  //     contentType: this.contentType,
  //     contentId: this.contentId,
  //     reason: this.selectedReason,
  //     details: this.additionalDetails,
  //     createdAt: new Date().toISOString(),
  //   }

  //   this.reportService.submitReport(reportData).subscribe(
  //     (response) => {
  //       console.log(response)
  //       this.showToast("Thank you for your feedback! We take reports seriously and will review this content shortly.")
  //       this.close()
  //     },
  //     (error) => {
  //       console.error("Error reporting content:", error)
  //       alert("Failed to submit the report.")
  //     },
  //   )
    
  // }

  showToast(message: string) {
    this.toastMessage = message
    this.isToastMessageVisible = true
    setTimeout(() => {
      this.isToastMessageVisible = false
    }, 3000)
  }
}
