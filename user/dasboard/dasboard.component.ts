import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { dashboardValues } from './dashboard';
import { AppserviceService } from '../../appservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { TimesheeteditComponent } from './timesheetedit/timesheetedit.component';
import { userTimePost } from '../../usertime.post';

export interface TimesheetValues {
  id: string;
  startDate: string;
  endDate: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  userId: string;
  projectId: string;
}
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})

export class DasboardComponent implements OnInit {
  descending: boolean;
  pendingsearchText: any;
  approvedsearchText: any;
  rejectedsearchText: any;
  pending: number = 1;
  rejected: number = 1;
  approved: number = 1;
  dashboard = sessionStorage.getItem('userId');
  dashboardvaluse = this.appservice.rootUrl;
  viewsheet: any;
  countOfAcceptedTimesheets: any;
  countOfPendingTimesheets: any;
  countOfRejectedTimesheets: any;
  pipe: DatePipe;
  dashboardvalues: dashboardValues;
  myDate: any;
  dashboardviewList: any;
  timelists: any;
  dataSource: any;

  timesheettotal: TimesheetValues;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, public dialog: MatDialog, private _formBuilder: FormBuilder, private appservice: AppserviceService) {
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<TimesheetValues>(this.timelists);
    this.dataSource.data = this.timelists;
    this.dataSource.paginator = this.paginator;
  }

  dash = this.http.get(this.dashboardvaluse + '/proClock/userDashboard/' + this.dashboard).subscribe((res: Response) => {
    this.dashboardviewList = res;
    sessionStorage.setItem('joindate', this.dashboardviewList.joiningDate);
    console.log(localStorage.getItem('joindate'));
  });

  viewList = this.http.get(this.dashboardvaluse + '/proClock/viewTimesheet/' + this.dashboard).subscribe((res: Response) => {
    this.viewsheet = res;
    console.log(res);
  });


  receipt(timesheetvalues: TimesheetValues) {
    debugger;
    this.timesheettotal = timesheetvalues;
    sessionStorage.setItem('id', timesheetvalues.id);
    sessionStorage.setItem('startDate', timesheetvalues.startDate);
    sessionStorage.setItem('endDate', timesheetvalues.endDate);
    sessionStorage.setItem('monday', timesheetvalues.monday);
    sessionStorage.setItem('tuesday', timesheetvalues.tuesday);
    sessionStorage.setItem('wednesday', timesheetvalues.wednesday);
    sessionStorage.setItem('thursday', timesheetvalues.thursday);
    sessionStorage.setItem('friday', timesheetvalues.friday);
    sessionStorage.setItem('saturday', timesheetvalues.saturday);
    sessionStorage.setItem('sunday', timesheetvalues.sunday);
    sessionStorage.setItem('userId', timesheetvalues.userId);
    sessionStorage.setItem('projectId', timesheetvalues.projectId);
    
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(TimesheeteditComponent, {
      disableClose: true,
      width: '50%',
    });
  }
}
