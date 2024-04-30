import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { helper } from '../shared/helpers/helper';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  subItemsSubject = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  fetchData<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  // Function to download a file from a URL
  downloadFile(url: string): Observable<ArrayBuffer> {
    // Wait to comply with rate limiting
    helper().waitForRateLimit();

    // Set request headers to accept binary data and any other required headers
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream', // Ensure binary data is accepted
      // Add any other required headers here
    });

    // Make HTTP GET request to download the file
    return this.http.get(url, { 
      responseType: 'arraybuffer',
      headers: headers
    })
  }

  fetchDirContents(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }
}