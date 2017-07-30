import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AttendancePage } from '../pages/attendance/attendance';
import { MonthlyReportPage } from '../pages/monthly-report/monthly-report';
import { ApplicationPage } from '../pages/application/application';
import { FeeReminderPage } from '../pages/fee-reminder/fee-reminder';
import { HomeworkPage } from '../pages/homework/homework';
import { MarksheetPage } from '../pages/marksheet/marksheet';
import { NoticePage } from '../pages/notice/notice';
import { TimelinePage } from '../pages/timeline/timeline';
import { TimetablePage } from '../pages/timetable/timetable';
import { YearlySchedulePage } from '../pages/yearly-schedule/yearly-schedule';

import { RestapiServiceProvider } from '../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../providers/pass-data-service/pass-data-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AttendancePage,
    MonthlyReportPage,
    ApplicationPage,
    FeeReminderPage,
    HomeworkPage,
    MarksheetPage,
    NoticePage,
    TimelinePage,
    TimetablePage,
    YearlySchedulePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'SchoolApp',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AttendancePage,
    MonthlyReportPage,
    ApplicationPage,
    FeeReminderPage,
    HomeworkPage,
    MarksheetPage,
    NoticePage,
    TimelinePage,
    TimetablePage,
    YearlySchedulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestapiServiceProvider,
    PassDataServiceProvider
  ]
})
export class AppModule { }
