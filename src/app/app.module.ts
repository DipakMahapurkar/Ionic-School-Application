import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { PdfViewerComponent } from 'ng2-pdf-viewer';


import { MyApp } from './app.component';
// import { TutorialPage } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/home/home';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { LoginPage } from '../pages/login/login';
import { AttendancePage } from '../pages/attendance/attendance';
import { MonthlyReportPage } from '../pages/monthly-report/monthly-report';
import { ApplicationPage } from '../pages/application/application';
import { FeeReminderPage } from '../pages/fee-reminder/fee-reminder';
import { HomeworkPage } from '../pages/homework/homework';
import { MarksheetPage } from '../pages/marksheet/marksheet';
import { MarkSheetDetailsPage } from '../pages//mark-sheet-details/mark-sheet-details';
import { NoticePage } from '../pages/notice/notice'; 
import { TimelinePage } from '../pages/timeline/timeline';
import { TimetablePage } from '../pages/timetable/timetable';
import { YearlySchedulePage } from '../pages/yearly-schedule/yearly-schedule';

import { AddTimelinePage } from '../pages/add-timeline/add-timeline';

import { RestapiServiceProvider } from '../providers/restapi-service/restapi-service';
import { PassDataServiceProvider } from '../providers/pass-data-service/pass-data-service';
import { LoadingProvider } from '../providers/loading/loading';
import { CommonAlertProvider } from '../providers/common-alert/common-alert';
import { TextAvatarDirective } from '../directives/text-avatar/text-avatar';


@NgModule({
    declarations: [
        PdfViewerComponent,
        MyApp,
        // TutorialPage,
        HomePage,
        ChangePasswordPage,
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
        YearlySchedulePage,
        AddTimelinePage,
        TextAvatarDirective,
        MarkSheetDetailsPage
    ],
    imports: [
        HttpModule,
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            links: [
                { component: LoginPage, name: 'LoginPage', segment: 'login-page' },
                { component: HomePage, name: 'HomePage', segment: 'home-page' },
                { component: AttendancePage, name: 'AttendancePage', segment: 'attendance-page' },
                { component: MonthlyReportPage, name: 'MonthlyReportPage', segment: 'monthly-report-page' },
                { component: ApplicationPage, name: 'ApplicationPage', segment: 'application-page' },
                { component: FeeReminderPage, name: 'FeeReminderPage', segment: 'fee-reminder-page' },
                { component: HomeworkPage, name: 'HomeworkPage', segment: 'homework-page' },
                { component: MarksheetPage, name: 'MarksheetPage', segment: 'marksheet-page' },
                { component: NoticePage, name: 'NoticePage', segment: 'notice-page' },
                { component: TimelinePage, name: 'TimelinePage', segment: 'timeline-page' },
                { component: TimetablePage, name: 'TimetablePage', segment: 'timetable-page' },
                { component: YearlySchedulePage, name: 'YearlySchedulePage', segment: 'yearly-schedule-page' },
            ]
        }),
        IonicStorageModule.forRoot({
            name: 'SchoolApp',
            driverOrder: ['websql', 'indexeddb', 'sqlite']
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        // TutorialPage,
        HomePage,
        ChangePasswordPage,
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
        YearlySchedulePage,
        AddTimelinePage,
        MarkSheetDetailsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        RestapiServiceProvider,
        PassDataServiceProvider,
        LoadingProvider,
        CommonAlertProvider
    ]
})
export class AppModule { }
