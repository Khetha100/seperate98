import { CommonModule, NgIf } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from "../../../admin/components/sidebar/sidebar.component";
import { InfoNavComponent } from "../info-nav/info-nav.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-donation-page',
  imports: [CommonModule,  ReactiveFormsModule,InfoNavComponent, FormsModule],
  templateUrl: './donation-page.component.html',
  styleUrl: './donation-page.component.css'
})
export class DonationPageComponent implements OnInit {
   donationAmount = ""

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement
    input.value = input.value.replace(/[^0-9]/g, "")
    this.donationAmount = input.value
  }
  submitPayment() {
    if (this.donationForm.valid) {
      this.currentPage = "success"
    }
  }

  currentPage: "main" | "payment" | "success" = "main"
  donationForm!: FormGroup;
  paymentForm!: FormGroup;

  apiUrl = 'http://localhost:8080';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.donationForm = this.fb.group({
      fullName: [""],
      email: [""],
      donationAmount: [0],
    })

    this.paymentForm = this.fb.group({
      cardNumber: [""],
      expiryDate: [""],
      cvv: [""],
    })
  }

  proceedToPayment() {
    if (this.donationForm.valid) {
      this.currentPage = "payment"
    }
  }

  checkout() {
    const donationAmount = this.donationForm.value.donationAmount;  // Get the amount from the form

    // Call your backend to create the checkout session
    this.http.post<{ sessionUrl: string }>(`${this.apiUrl}/create-checkout-session`, { amount: donationAmount })
      .subscribe(response => {
        if (response.sessionUrl) {
          // window.location.href = response.sessionUrl;  // Redirect to Stripe Checkout
          window.open(response.sessionUrl, "_blank")
        } else {
          console.error('No session URL received from backend');
        }
      });
  }
}
