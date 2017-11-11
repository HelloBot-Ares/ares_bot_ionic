import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { Storage } from '@ionic/storage';

@Injectable()
export class ItalyDataProvider {

  provincesData: Array<any> = [];
  tempProvinceData: any;

  get provinces() {
    return this.provincesData;
  }

  get tempProvince() {
    return this.tempProvinceData;
  }

  setTempProvinceData(code) {
    let item = this.provincesData.filter(i => {
      return i.code == code;
    })[0];
    if (item) {
      this.tempProvinceData = item;
    } else {
      this.tempProvinceData = {
        comuni: []
      };
    }
  }

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    this.tempProvinceData = {
      comuni: []
    };
    this.storage.get('ItalyData-ProvincesData').then(data => {
      if (!data) {
        this.parseData();
      } else {
        this.provincesData = data;
      }
    });

  }

  // private

  private processData(data) {
    data.regioni.forEach(r => {
      this.provincesData.push(...r.province);
    });
    this.provincesData = _.sortBy(this.provincesData, [function (p) { return p.nome; }]);
    this.storage.set('ItalyData-ProvincesData', this.provincesData);
  }

  private parseData() {
    this.http.get('https://raw.githubusercontent.com/dakk/Italia.json/master/italia_comuni.json').subscribe(
      resp => {
        resp = JSON.parse(resp['_body']);
        this.processData(resp);
      },
      error => {
        console.error(error);
      }
    )
  }
}
