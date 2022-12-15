import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  constructor(private route: Router) {}
  yes() {
    this.route.navigate(['/shopping']);
  }
  no() {
    this.route.navigate(['/shopping']);
  }
}
