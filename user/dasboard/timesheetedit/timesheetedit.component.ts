import { Component, OnInit , ViewChild, inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AppserviceService } from '../../../appservice.service';
import { updatePendingTimesheet } from '../../../updatePendingTimesheet';
import { userTimePost } from '../../../usertime.post';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-timesheetedit',
  templateUrl: './timesheetedit.component.html',
  styleUrls: ['./timesheetedit.component.scss']
})

export class TimesheeteditComponent implements OnInit {

  updatetimesheet: updatePendingTimesheet;
  res: Response;
  progressBar:any;

  a = sessionStorage.getItem('id');
  b = sessionStorage.getItem('startDate');
  c = sessionStorage.getItem('endDate');
  d = sessionStorage.getItem('monday');
  e = sessionStorage.getItem('tuesday');
  f = sessionStorage.getItem('wednesday');
  g = sessionStorage.getItem('thursday');
  h = sessionStorage.getItem('friday');
  i = sessionStorage.getItem('saturday');
  j = sessionStorage.getItem('sunday');
  k = sessionStorage.getItem('status');
  l = sessionStorage.getItem('updatedDate');
  m = sessionStorage.getItem('userId');
  n = sessionStorage.getItem('projectId');

  constructor 
  (public dialogRef: MatDialogRef<TimesheeteditComponent>, private appservice: AppserviceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if(form != null)
    form.reset()
    this.updatetimesheet= {
      startDate: '',
      endDate: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',  
      friday: '',
      saturday: '',
      sunday: '',
      userId: +'',
      projectId: +'',
      userTimeSheetId: +'',
    }
  }

  onSubmitUpdate(form: NgForm) {
    debugger;
    this.progressBar=true;
    var uid = sessionStorage.getItem('userId');
    var startD = sessionStorage.getItem('startDate');
    var endD = sessionStorage.getItem('endDate');
    var projId = sessionStorage.getItem('projectId');
    var usertime = sessionStorage.getItem('userTimeSheetId');

    const updatetimesheet: updatePendingTimesheet = {
      userId: +uid,
      startDate: startD,
      endDate: endD,
      projectId: +projId,
      userTimeSheetId: +usertime,
      monday: form.value.monday,
      tuesday: form.value.tuesday,
      wednesday: form.value.wednesday,
      thursday: form.value.thursday,
      friday: form.value.friday,
      saturday: form.value.saturday,
      sunday: form.value.sunday,
    }
    this.appservice.updateTimeSheet(updatetimesheet)
      .subscribe(res => {
        if(this.appservice.updatetimesheetvalue.statusCode=="000"){ 
            this.progressBar=false;
            this.dialogRef.close();
            this.toastr.success('Timesheet updated successfully');
          }
          else if(this.appservice.updatetimesheetvalue.statusCode=="500"){
            this.progressBar=false;
            this.toastr.error(this.appservice.updatetimesheetvalue.statusMsg);
          }
          else{
            this.progressBar=false;
            this.toastr.error('Failed to update timesheet details');
          }
        console.log('Timesheet' + res);
      })
  }

}
