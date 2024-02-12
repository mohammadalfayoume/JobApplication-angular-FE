import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { JobDto } from '../lib/interface/jobDto';

const options = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getLookupData(lookupType: number): Observable<any>{
    // Roles: 1, JobTypes: 2, Countries: 3
    return this.http.get<any>(`${this.apiUrl}/lookup/getLookupData?lookupType=${lookupType}`, options);
  }

  getCountryCities(countryId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/lookup/getCountryCities?countryId=${countryId}`, options)
  }

  getCompanyJobs(companyId : number) {
    return this.http.get<any>(`${this.apiUrl}/job/getCompanyJobs?companyId=${companyId}`).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  getSkills() : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lookup/getSkills`).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  getUserScrImg(): string | null{
    const imgSrc = localStorage.getItem('imgSrc');
    return imgSrc;
  }
}
