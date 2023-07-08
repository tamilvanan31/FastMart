import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { throws } from 'assert';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  constructor(private http: HttpClient, private sharedService: SharedService,) { }
  data: any;
  productName!: string
  price!: number;
  quantity!: number
  count!: number
  brand!: string
  @Input() id: number;
  ngOnInit() {
    this.http.get('assets/items.json')
      .subscribe(response => {
        this.data = response;
        console.log(this.data);
        this.productName = this.data[this.id - 1]["name"];
        this.price = this.data[this.id - 1]["price"];
        this.quantity = this.data[this.id - 1]["quantity"];
        this.count = this.data[this.id - 1]["count"];

        //setting custom brands for a product
        switch (this.id - 1) {
          case 0:
            this.brand = "Sony";
            break;
          case 1:
            this.brand = "Samsung";
            break;
          case 2:
            this.brand = "SanDisk";
            break;
          case 3:
            this.brand = "Tp-Link";
            break;
          case 4:
            this.brand = "Apple";
            break;
          default:
            this.brand = "Unknown";
            break;
        }
      });
  }
  //To make changes while clicked multiple times
  ngOnChanges() {
    this.http.get('assets/items.json')
      .subscribe(response => {
        this.data = response;
        console.log(this.data);
        this.productName = this.data[this.id - 1]["name"];
        this.price = this.data[this.id - 1]["price"];
        this.quantity = this.data[this.id - 1]["quantity"];
        this.count = this.data[this.id - 1]["count"];
        console.log(this.id)
        switch (this.id - 1) {
          case 0:
            this.brand = "Sony";
            break;
          case 1:
            this.brand = "Samsung";
            break;
          case 2:
            this.brand = "SanDisk";
            break;
          case 3:
            this.brand = "Tp-Link";
            break;
          case 4:
            this.brand = "Apple";
            break;
          default:
            this.brand = "Unknown";
            break;
        }
      });
  }
}
