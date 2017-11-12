import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { UserProvider } from '../user/user';

@Injectable()
export class EventProvider {

  apiBase: string = 'http://10.0.4.251:3000/api/';

  constructor(
    public http: Http,
    public userProvider: UserProvider
  ) {

  }

  userEvents() {
    return new Promise((resolve, reject) => {
      let URL = this.apiBase + 'users/' + this.userProvider.currentUser.id + '/events';

      this.http.get(URL).subscribe(userEvents => {
        if (JSON.parse(userEvents['_body'])) {
          resolve(JSON.parse(userEvents['_body']));
        } else {
          resolve([]);
        }
      });
    });
  }


  searchEvents(searchOpts) {
    return new Promise( (resolve, reject) => {
      let URL = this.apiBase + 'search';
      let BODY = {
        search: {
          topic_id: searchOpts.topic_id,
          location: searchOpts.location,
          from_date: searchOpts.from_date,
          to_date: searchOpts.to_date,
          max_partecipants: searchOpts.max_partecipants
        }
      }
      this.http.post(URL, BODY).subscribe(searchResults => {
        if (JSON.parse(searchResults['_body'])) {
          resolve(JSON.parse(searchResults['_body']));
        } else {
          resolve([]);
        }
      });
    });

  }

  createEvent(newEventOpts) {
    return new Promise((resolve, reject) => {
      let URL = this.apiBase + 'users/' + this.userProvider.currentUser.id + '/events';
      let BODY = {
        event: {
          subject: newEventOpts.subject,
          owner_id: this.userProvider.currentUser.id,
          topic_id: newEventOpts.topic_id,
          location: newEventOpts.location,
          from_date: newEventOpts.from_date,
          to_date: newEventOpts.to_date,
          place_name: 'Torino',
          place_address: 'Via della Vittoria, 38 10123 Torino TO',
          max_partecipants: newEventOpts.max_partecipants
        }
      }
      this.http.post(URL, BODY).subscribe(newEvent => {
        if (JSON.parse(newEvent['_body'])) {
          resolve(JSON.parse(newEvent['_body']));
        } else {
          resolve([]);
        }
      });
    });

  }

}
