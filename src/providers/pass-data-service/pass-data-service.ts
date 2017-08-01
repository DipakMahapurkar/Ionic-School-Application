import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class PassDataServiceProvider {

  constructor(public storage: Storage) {
    console.log('Hello PassDataServiceProvider Provider');
  }
  setProfile(userData: any): void {
    this.storage.set("USER_DATA", userData);
  }
  getProfile(): any {
    return new Promise((resolve, reject) => {
      this.storage.get("USER_DATA").then((data) => {
        resolve(data);
      }).catch(() => {
        resolve("Error");
      });
    });
  }

  setData(data: any, key: any): void {
    this.storage.set(key, data);
  }
  getData(key: any): any {
    return new Promise((resolve, reject) => {
      this.storage.get(key).then((data) => {
        resolve(data);
      }).catch(() => {
        resolve("Error");
      });
    });
  }
}
