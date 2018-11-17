import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string;
  menuExpanded: boolean = false;

  constructor(private router: Router) {

  }

  onMenuToogle(){
    this.menuExpanded = !this.menuExpanded
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      (_: NavigationEnd) => this.currentUrl = _.url
    )
  }
}
