import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { TutorialPage } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { PassDataServiceProvider } from '../providers/pass-data-service/pass-data-service';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav) nav: Nav;
    rootPage: any;

    constructor(
        public platform: Platform,
        public splashScreen: SplashScreen,
        public passDataServiceProvider: PassDataServiceProvider,

    ) {
        // Check if the user has already seen the tutorial
        // this.passDataServiceProvider.getData('hasSeenTutorial').then((hasSeenTutorial: any) => {
            // if (hasSeenTutorial) {
                this.passDataServiceProvider.getData('isLoggedIn').then((isLoggedIn: any) => {
                    if (isLoggedIn) {
                        this.rootPage = HomePage;
                    } else {
                        this.rootPage = LoginPage;
                    }
                    this.platformReady()
                });
        //     } else {
        //         this.rootPage = TutorialPage;
        //     }
        //     this.platformReady()
        // });
    }

    platformReady() {
        // Call any initial plugins when ready
        this.platform.ready().then(() => {
            this.splashScreen.hide();
        });
    }
}

