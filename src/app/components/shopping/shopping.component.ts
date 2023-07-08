import { AfterViewInit, Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { IItem } from 'src/app/shared/model/items';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient,
    private sharedService: SharedService,
    private dialog: MatDialog) { }

  @ViewChild(MatSort, { static: false }) matSort: MatSort;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('empTbSortWithObject') empTbSortWithObject = new MatSort();

  //declarations
  private url = 'assets/items.json';
  data: any = [];
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'count', 'add'];
  dataSource = new MatTableDataSource<IItem>(this.data);
  labelCount = 0;
  username!: any;
  isDisabled = false;
  parentID!: number;
  count = 0;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.empTbSort;
  }

  ngOnInit() {
    //Using HttpClient to directly access the raw data from json file
    this.http.get(this.url)
      .subscribe(response => {
        this.data = response;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.empTbSort;
      });

    //Getting username from Login component
    this.username = this.sharedService.username;
  }

  //To be implemented
  openCart() { }

  //Adding products to the cart
  updateItems(row: any) {

    this.dialog.open(AddItemComponent, { width: "20%" }).afterClosed().subscribe(res => {
      if (this.sharedService.isAdded) {
        for (let i = 0; i < this.data.length; ++i) {
          if (this.data[i]["add"] == row.add) {
            this.data[i]["count"] -= 1;
            this.labelCount++;
          }
        }
      }
    });
  }

  //Custom sorting for price, quantity, and available count
  orderData(id: string, start?: 'asc' | 'desc') {
    this.dataSource.data.sort((a, b) => {
      return start === 'asc'
        ? a[id] - b[id]
        : start === 'desc'
          ? b[id] - a[id]
          : a[id] - b[id];
    });
    this.dataSource._updateChangeSubscription();
  }

  //Sending row data to Item detail component
  async getItem(row: any) {
    for (let i = 0; i < this.data.length; ++i) {
      if (this.data[i]["add"] == row.add) {
        this.parentID = this.data[i]["id"];
        console.log(this.parentID);
        this.isDisabled = true;
      }
    }
  }

}