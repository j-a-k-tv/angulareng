import { Component, OnInit } from '@angular/core';
import { UsercommComponent } from '../usercomm/usercomm.component'

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.scss']
})
export class InteractionsComponent implements OnInit {

  $hontans: Array<object>

  constructor() { 
    this.$hontans = [];
  }

  ngOnInit() {
  }

  onJonmoDiya(name: string) {
    this.$hontans.push({ name: name })
  }

}
