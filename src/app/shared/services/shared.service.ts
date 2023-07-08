import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  username!: string;
  id!: number;
  isAdded!: boolean;
}
