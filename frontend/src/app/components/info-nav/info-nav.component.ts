import { Component } from '@angular/core';
import { HamburgerComponent } from "../hamburger/hamburger.component";
import { Location } from '@angular/common';


@Component({
  selector: 'app-info-nav',
  imports: [HamburgerComponent],
  templateUrl: './info-nav.component.html',
  styleUrl: './info-nav.component.css'
})
export class InfoNavComponent {
constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
