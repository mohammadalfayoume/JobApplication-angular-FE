import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const options = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getLookupData(lookupType: number): Observable<any>{
    
    return this.http.get<any>(`${this.apiUrl}/lookup/getLookupData?lookupType=${lookupType}`, options);
  }

  getCountryCities(countryId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/lookup/getCountryCities?countryId=${countryId}`, options)
  }
}
