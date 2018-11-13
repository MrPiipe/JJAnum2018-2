import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  get(url) {
    return this.http.get(url).toPromise().then(result => {
      return result;
    }, err => {
      console.log(err);
    });
  }

  post(url, params) {
    return this.http.post(url, params).toPromise().then(result => {
      return result;
    }, err => {
      console.log(err);
    });
  }
}
