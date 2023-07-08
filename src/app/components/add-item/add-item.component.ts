import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  constructor(private route: Router, private sharedService: SharedService) { }
  yes() {
    this.sharedService.isAdded = true;
    this.route.navigate(['/shopping']);
  }
  no() {
    this.route.navigate(['/shopping']);
  }
}
