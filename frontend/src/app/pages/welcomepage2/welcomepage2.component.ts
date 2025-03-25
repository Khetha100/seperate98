import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfoNavComponent } from "../../components/info-nav/info-nav.component";

@Component({
  selector: 'app-welcomepage2',
  imports: [RouterLink, InfoNavComponent],
  templateUrl: './welcomepage2.component.html',
})
export class Welcomepage2Component {

}
