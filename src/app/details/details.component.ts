import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  details$: Object
  userId: Object

  constructor(private dataSvc: DataService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => this.userId = params.id)
  }

  ngOnInit() {
    this.dataSvc.getUserDetails(this.userId).subscribe(
      data => this.details$ = data
    )
  }

}
