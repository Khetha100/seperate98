import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfoNavComponent } from "../../components/info-nav/info-nav.component";

@Component({
  selector: 'app-welcomepage1',
  imports: [RouterLink, InfoNavComponent],
  templateUrl: './welcomepage1.component.html',
})
export class Welcomepage1Component {

}
