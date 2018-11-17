import { Component, OnInit } from '@angular/core';
import { UsercommComponent } from '../usercomm/usercomm.component'

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.scss']
})
export class InteractionsComponent implements OnInit {

  $hontans: Array<object>
  $name : string = "anc"

  constructor() {
    this.$hontans = [];
  }

  ngOnInit() {
  }

  onJonmoDiya(name: string) {
    this.$hontans.push({ name: name })
    console.log(this.$name)
  }

  onDeleteChatHead(user: object) {
    for (var i = 0; i < this.$hontans.length; i++) {
      if (this.$hontans[i]["name"] == user["name"]) {
        this.$hontans.splice(i, 1);
      }
    }
  }

}
