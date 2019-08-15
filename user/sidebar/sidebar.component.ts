import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppserviceService } from '../../appservice.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private appservice: AppserviceService, private router: Router) { }

  ngOnInit() {
  }
  // timesheetview(){
  //   this.appservice.viewsheetdata();
  //   //this.router.navigate(['/admincompanies']);
  // }
}
