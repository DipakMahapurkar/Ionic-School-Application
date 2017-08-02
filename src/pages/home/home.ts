import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../../providers/pass-data-service/pass-data-service';
import { LoadingProvider } from '../../providers/loading/loading';

import { AttendancePage } from '../attendance/attendance';
import { MonthlyReportPage } from '../monthly-report/monthly-report';
import { ApplicationPage } from '../application/application';
import { FeeReminderPage } from '../fee-reminder/fee-reminder';
import { HomeworkPage } from '../homework/homework';
import { MarksheetPage } from '../marksheet/marksheet';
import { NoticePage } from '../notice/notice';
import { TimelinePage } from '../timeline/timeline';
import { TimetablePage } from '../timetable/timetable';
import { YearlySchedulePage } from '../yearly-schedule/yearly-schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private userData: any;
  private dashboardMenus: any;

  private classDivSubData: any;
  private classJsonObject: any;
  private divisionJsonObject: any;
  private subjectJsonObject: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public passDataServiceProvider: PassDataServiceProvider,
    private restapiServiceProvider: RestapiServiceProvider,
    private loading: LoadingProvider) {
    this.dashboardMenus = [
      { "id": 1, menuName: "Ateendance", image: "assets/img/attendance_image.png" },
      { "id": 2, menuName: "Monthly Report", image: "assets/img/report.png" },
      { "id": 3, menuName: "Marksheet", image: "assets/img/marksheet.png" },
      { "id": 4, menuName: "Timeline", image: "assets/img/timeline.png" },
      { "id": 5, menuName: "Homework", image: "assets/img/homework_image.png" },
      { "id": 6, menuName: "Fee Reminder", image: "assets/img/reminder.png" },
      { "id": 7, menuName: "Yearly Schedule", image: "assets/img/schedule.png" },
      { "id": 8, menuName: "Timetable", image: "assets/img/notice.png" },
      { "id": 9, menuName: "Notice", image: "assets/img/application.png" },
      { "id": 10, menuName: "Application", image: "assets/img/about_image.png" },
    ];
  }

  ionViewWillEnter() {
    // this.loading.showLoader();
    console.log("in ionViewCanEnter");
    this.passDataServiceProvider.getProfile().then((data) => {
      this.userData = data[0];
      this.getClassDivisionSubject();

    });
  };

  getClassDivisionSubject() {
    this.restapiServiceProvider.getAPIClassDivSub("dropdownapi.php/getClassDropdown").then((data) => {
      this.classJsonObject = data;
      if (this.classJsonObject.status === 200 && this.classJsonObject.status_message.toLowerCase() != "no data") {
        this.passDataServiceProvider.setData(this.classJsonObject.data, "CLASS_LIST");
        this.restapiServiceProvider.getAPIClassDivSub("dropdownapi.php/getDivisionDropdown").then((data) => {
          this.divisionJsonObject = data;
          if (this.divisionJsonObject.status === 200 && this.divisionJsonObject.status_message.toLowerCase() != "no data") {
            this.passDataServiceProvider.setData(this.divisionJsonObject.data, "DIVISION_LIST");
            this.restapiServiceProvider.getAPIClassDivSub("dropdownapi.php/getSubjectDropdown").then((data) => {
              this.subjectJsonObject = data;
              if (this.subjectJsonObject.status === 200 && this.subjectJsonObject.status_message.toLowerCase() != "no data") {
                this.passDataServiceProvider.setData(this.subjectJsonObject.data, "SUBJECT_LIST");
                setTimeout(() => {
                  // this.loading.hideLoader();
                }, 1000);

              } else {
                console.log("Response for subject = " + this.subjectJsonObject.status_message);
                setTimeout(() => {
                  this.loading.hideLoader();
                }, 1000);
              }
            });
          } else {
            console.log("Response for division = " + this.divisionJsonObject.status_message);
            setTimeout(() => {
              this.loading.hideLoader();
            }, 1000);
          }
        });
      } else {
        console.log("Response for class = " + this.classJsonObject.status_message);
        setTimeout(() => {
          this.loading.hideLoader();
        }, 1000);
      }
    });
  }

  dashboardMenuClick(pageId) {
    console.log(pageId);
    if (pageId === 1) {
      this.navCtrl.push(YearlySchedulePage);
    } else if (pageId === 2) {
      this.navCtrl.push(MonthlyReportPage);
    } else if (pageId === 3) {
      this.navCtrl.push(HomeworkPage);
    } else if (pageId === 4) {
      this.navCtrl.push(TimelinePage);
    } else if (pageId === 5) {
      this.navCtrl.push(FeeReminderPage);
    } else if (pageId === 6) {
      this.navCtrl.push(TimetablePage);
    } else if (pageId === 7) {
      this.navCtrl.push(NoticePage);
    } else if (pageId === 8) {
      this.navCtrl.push(ApplicationPage);
    }
  }
};
