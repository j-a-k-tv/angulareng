import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usercomm',
  templateUrl: './usercomm.component.html',
  styleUrls: ['./usercomm.component.scss']
})
export class UsercommComponent implements OnInit {

  @Input() child : object
  
  constructor() { }

  ngOnInit() {
  }

}
