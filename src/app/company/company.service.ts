import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

const options = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  updateCompany(companyData : any) : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/company/updateCompanyProfile`, companyData, options);
  }

  getCompanyData() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/company/getCompany`,options)
  }
  
}                               
