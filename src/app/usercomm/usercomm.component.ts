import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-usercomm',
  templateUrl: './usercomm.component.html',
  styleUrls: ['./usercomm.component.scss']
})
export class UsercommComponent implements OnInit {

  @Input() child : object
  @Input() users : Array<object>
  @Output() deleteChatHead = new EventEmitter<object>();
  $messages : Array<string>
  $selectedUser : string
  
  constructor() { 
    this.$messages = []
    this.$selectedUser = ""
  }

  ngOnInit() {
  }

  onSend(user:string, message: string) {
    this.$messages.push(message)
  }

  onRemoveChat(){
    this.deleteChatHead.emit(this.child)
  }

}
