import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TopicProvider {

  apiBase: string = 'http://10.0.4.251:3000/api/';

  topics: any[];

  constructor(
    public http: Http
  ) {
    this.parseTopics();
  }

  // private

  private parseTopics() {
    let URL = this.apiBase + 'topics'
    this.http.get(URL).subscribe(topicsData => {
      this.topics = JSON.parse(topicsData['_body']);
    });
  }

}
