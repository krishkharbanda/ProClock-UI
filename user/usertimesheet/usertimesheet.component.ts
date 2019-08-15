import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userTimePost } from '../../usertime.post';
import { AppserviceService } from '../../appservice.service';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { analyzeAndValidateNgModules } from '@angular/compiler';
// import { lookup } from 'dns';
export let username: string;
export interface Product {
  startDate: string;
  endDate: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  userId: string
}
@Component({
  selector: 'app-usertimesheet',
  templateUrl: './usertimesheet.component.html',
  styleUrls: ['./usertimesheet.component.scss']
})
export class UsertimesheetComponent {
  totaltime:any;
  usertimepost: userTimePost;
  usertimeget: any;
  startDate: any;
  viewsheet: any;
  projectlist: any;
  currentDate: any;
  weekStart: any;
  weekDays: any;
  weekfirstday: any;
  weeksecondday: any;
  weekseventhday: any;
  weekthirdday: any;
  weekfourthday: any;
  weekfifthday: any;
  weeksixday: any;
  to_date: any;
  selectedOption: any;
  first: any;
  second: any;
  secondlast: any;
  firstlast: any;
  weekstartday: any;
  weekendday: any;
  buttondisable: any;
  entertimesheetpresentweek: any;
  viewtimesheetbyweek: any;
  previousbuttondisable: any;
 // previousClickValue: number;
  seconfirstday:any;
  seconseconday:any;
  seconthirdday:any;
  seconfourthday:any;
  seconfifthday:any;
  firstfirstday:any;
  firstseconday:any;
  firstthirdday:any;
  firstfourthday:any;
  firstfifthday:any;
  strDate:number;
  firstday:any;
  secondday:any;
  thirdday:any;
  fourthday:any;
  fifthday:any;
  sixday:any;
  seventhday:any;
  dashboard = sessionStorage.getItem('userId');
  join =sessionStorage.getItem('joindate');
  dashboardvaluse = this.appservice.rootUrl;

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  constructor(private http: HttpClient, private router: Router, private appservice: AppserviceService, private modal: NgbModal) {
    // this.viewsheet;
    // this.dashboardvaluse;
  }
  headElements = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  ngOnInit() {
    this.weekstartday = moment().startOf('week')
    this.weekendday = moment().endOf('week');
    this.weekfirstday = moment().isoWeekday(1);
    this.weeksecondday = moment().isoWeekday(2);
    this.weekthirdday = moment().isoWeekday(3);
    this.weekfourthday = moment().isoWeekday(4);
    this.weekfifthday = moment().isoWeekday(5);
    this.weeksixday = moment().isoWeekday(6);
    this.weekseventhday = moment().isoWeekday(7);
    this.to_date = moment().isoWeekday(7).format('LL');

    this.firstday = moment().isoWeekday(1).format('LL');
    this.secondday = moment().isoWeekday(2).format('LL');
    this.thirdday = moment().isoWeekday(3).format('LL');
    this.fourthday = moment().isoWeekday(4).format('LL');
    this.fifthday = moment().isoWeekday(5).format('LL');
    this.sixday = moment().isoWeekday(6).format('LL');
    this.seventhday = moment().isoWeekday(7).format('LL');
      //this.presentvalue= this.weekfirstday.format('LL');
    sessionStorage.setItem('weekfirstday', this.weekfirstday.format('LL'));
    sessionStorage.setItem('weekseventhday', this.weekseventhday.format('LL'));
   if(this.join == this.firstday || this.join == this.secondday || this.join == this.thirdday || this.join == this.fourthday || this.join == this.fifthday || this.join == this.sixday || this.join == this.seventhday) {
    this.previousbuttondisable = false;
   }else{
    this.previousbuttondisable = true;
   }
   // this.previousClickValue = 0;
    
   this.buttondisable = true;
   this.entertimesheetpresentweek = true;
   this.viewtimesheetbyweek = false;
   this.resetForm();
   this.viewList();
  }
  viewList() {
    return this.http.get(this.dashboardvaluse + '/proClock/viewTimesheet/' + this.dashboard).subscribe((res: Response) => {
    this.viewsheet = res;
      console.log(this.viewsheet);
      //alert(this.viewsheet[0].startDate);
      //this.loop = this.viewsheet.length;
      //this.router.navigate(['/usertimesheet']);
    });
  }    

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.usertimepost = {
      startDate: "",
      endDate: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
      userId: "",
      projectId: ""
    }

  }
  selectedCompanyId() {
    sessionStorage.setItem('utprojectid', this.selectedOption.projectId);
    //alert(this.selectedOption.projectId);
  }
  project1 = this.http.get(this.dashboardvaluse + '/proClock/getProjectlist/' + this.dashboard).subscribe((res: Response) => {
    this.projectlist = res;
  });

  OnSubmit(form: NgForm) {
    this.appservice.usertimeby(form.value).subscribe((res: any) => {
      this.viewList();
      let timer = Observable.timer();
      timer.subscribe(() => this.viewList());
      // this.resetForm();
      // console.log(res.string + JSON.stringify(res));
      // console.log(form.value.string);
      // this.resetForm();
      // console.log(res);
      // if(this.appservice.usertime.statusCode=="000"){ 
      // console.log(this.appservice.usertime.status);
      // }
      // else if(this.appservice.usertime.statusCode !=="000"){
      //   alert(this.appservice.usertime.statusMsg);

      // }
      
      this.resetForm();
   });
  }
  decrement() {
    debugger;
    //this.previousClickValue = this.previousClickValue + 1;
    this.second = this.weekfirstday.subtract(+7, 'days').format('LL');
    this.seconfirstday = this.weeksecondday.subtract(+7, 'days').format('LL');
    this.seconseconday = this.weekthirdday.subtract(+7, 'days').format('LL');
    this.seconthirdday = this.weekfourthday.subtract(+7, 'days').format('LL');
    this.seconfourthday = this.weekfifthday.subtract(+7, 'days').format('LL');
    this.seconfifthday = this.weeksixday.subtract(+7, 'days').format('LL');
    this.secondlast = this.weekseventhday.subtract(+7, 'days').format('LL');
    console.log(this.join + this.second + this.seconfirstday + this.seconseconday + this.seconthirdday + this.seconfourthday +this.seconfifthday + this.secondlast);
   // if (this.previousClickValue == this.viewsheet.length)
    //  this.previousbuttondisable = true;
    //else
     // this.previousbuttondisable = false;
    //alert( this.second  + this.secondlast);
    //alert(this.second);
    // this.timesheet();
    
    delete this.first;
    delete this.firstfirstday;
    delete this.firstseconday;
    delete this.firstthirdday;
    delete this.firstfourthday;
    delete this.firstfifthday;
    delete this.firstlast;
     if (this.join == this.second || this.join == this.seconfirstday || this.join == this.seconseconday || this.join == this.seconthirdday ||  this.join == this.seconfourthday ||  this.join == this.seconfifthday ||  this.join == this.secondlast) {
      this.previousbuttondisable=true;
      //this.viewtimesheetbyweek = true;
     }
    // debugger;
    // if(this.join == this.seconfifthday){
    //   this.previousbuttondisable = true;
    // }

    
    this.buttondisable = false;
    this.entertimesheetpresentweek = false;
    this.viewtimesheetbyweek = true;
  }
  increment() {
  //  if (this.previousClickValue > 0)
  // this.previousClickValue = this.previousClickValue - 1;
    this.first = this.weekfirstday.add(+7, 'days').format('LL');
    this.firstfirstday = this.weeksecondday.add(+7, 'days').format('LL');
    this.firstseconday = this.weekthirdday.add(+7, 'days').format('LL');
    this.firstthirdday = this.weekfourthday.add(+7, 'days').format('LL');
    this.firstfourthday = this.weekfifthday.add(+7, 'days').format('LL');
    this.firstfifthday = this.weeksixday.add(+7, 'days').format('LL');
    this.firstlast = this.weekseventhday.add(+7, 'days').format('LL');
    // alert(this.first);
    //this.timesheet();
    delete this.second;
    delete this.seconfirstday;
    delete this.seconseconday;
    delete this.seconthirdday;
    delete this.seconfourthday;
    delete this.seconfifthday;
    delete this.secondlast;
   // if (this.previousClickValue < this.viewsheet.length)
    //  this.previousbuttondisable = false;
   // else
    //  this.previousbuttondisable = true;
      this.previousbuttondisable=false;

    if (this.to_date == this.firstlast) {
      this.viewtimesheetbyweek = true;
      this.buttondisable = true;
      this.entertimesheetpresentweek = true;
    }
  }
  // getDates(StartDate, StopDate) {
  //   var dateArray = new Array();
  //   var currentDate = StartDate;
  //   while (currentDate <= StopDate) {
  //     dateArray.push(new Date(currentDate));
  //     currentDate = currentDate.addDays(1);
  //   }
  //   return dateArray;
  // }
  //store:any;

  timesheet() {
    for (let i = 0; i <= this.viewsheet.length; i++) {
      if (this.second === this.viewsheet[i].startDate || this.first === this.viewsheet[i].startDate) {
        delete this.first;
        delete this.firstfirstday;
        delete this.firstseconday;
        delete this.firstthirdday;
        delete this.firstfourthday;
        delete this.firstfifthday;
        delete this.firstlast;
        delete this.second;
        delete this.seconfirstday;
        delete this.seconseconday;
        delete this.seconthirdday;
        delete this.seconfourthday;
        delete this.seconfifthday;
        delete this.secondlast;
        //alert(this.loop.startDate);
      }
      // }else if(this.first===this.viewsheet[i].startDate){
      //   delete this.second;
      // }
    }
    // debugger;
    // this.store = this.second.moment().isoWeekday(6).format('ll');
    // var arr: string[] = this.getDates(this.second, this.store);
    // let loop = this.viewsheet;
    // for (let i = 0; i <= loop.Array; i++) {
    //   if (!arr.includes(loop[i].StartDate)) {
    //     delete loop[i];
    //   }
    // }
    // return loop;
  }
}






// OnSubmit(form: NgForm) {
//   var strDate = form.value;
//   var times = [ 0, 0 ]
//   var max = times.length;
//   var a = (strDate.monday || '').split(':');
//   var b = (strDate.tuesday || '').split(':');
//   var c = (strDate.wednesday || '').split(':');
//   var d = (strDate.thursday || '').split(':');
//   var e = (strDate.friday || '').split(':');
//   var f = (strDate.saturday || '').split(':');
//   var g = (strDate.sunday || '').split(':');
//   for (var i = 0; i < max; i++) {
//     a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
//     b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
//     c[i] = isNaN(parseInt(c[i])) ? 0 : parseInt(c[i])
//     d[i] = isNaN(parseInt(d[i])) ? 0 : parseInt(d[i])
//     e[i] = isNaN(parseInt(e[i])) ? 0 : parseInt(e[i])
//     f[i] = isNaN(parseInt(f[i])) ? 0 : parseInt(f[i])
//     g[i] = isNaN(parseInt(g[i])) ? 0 : parseInt(g[i])
//   }
//   for (var i = 0; i < max; i++) {
//     times[i] = a[i] + b[i] + c[i] + d[i] + e[i] + f[i] + g[i]
//   }

//   var hours = times[0]
//   var minutes = times[1]

//   if (minutes >= 60) {
//     var h = (minutes / 60) << 0
//     hours += h
//     minutes -= 60 * h
//   }
// this.totaltime =  ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);

//   this.appservice.usertimeby(form.value).subscribe((res: any) => {
//     this.viewList();
//     this.resetForm();
//     let timer = Observable.timer();
//     timer.subscribe(() => this.viewList());
//     this.resetForm();
//     console.log(res.string + JSON.stringify(res));
//     console.log(form.value.string);
//     this.resetForm();
//     console.log(res);
//     if(this.appservice.usertime.statusCode=="000"){ 
//     console.log(this.appservice.usertime.status);
//     }
//     else if(this.appservice.usertime.statusCode !=="000"){
//       alert(this.appservice.usertime.statusMsg);

//     }
//  });
// }