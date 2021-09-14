import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private http: HttpClient) { }

  get(url: string, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.baseURL + url, {
          params: data,
          headers: new HttpHeaders(headers),
        })
        .subscribe(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  post(url: string, data = {}, headers = {}): any {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.baseURL + url, data, {
          headers: new HttpHeaders(headers),
        })
        .subscribe(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }
}
