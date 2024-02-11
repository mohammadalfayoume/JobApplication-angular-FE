import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl;
  getImageUrl(fileId: any): Observable<boolean> {
    return this.http
      .get(`${this.apiUrl}/File/GetFileById?id=${fileId}`, {
        responseType: 'arraybuffer',
      })
      .pipe(
        map((response: ArrayBuffer) => {
          const contentType = 'image/*'; // Adjust with the actual content type returned by your API
          const imgUrl = this.convertBytesToDataUrl(new Uint8Array(response), contentType);
          localStorage.setItem('imgSrc', imgUrl);
          return true;
        }),
      );
  }
  getImgUrl(): string | null {
    const imgUrl = localStorage.getItem('imgSrc');
    return imgUrl;
  }
  private convertBytesToDataUrl(bytes: Uint8Array, contentType: string): string {
    const blob = new Blob([bytes], { type: contentType });
    return URL.createObjectURL(blob);
  }
}
