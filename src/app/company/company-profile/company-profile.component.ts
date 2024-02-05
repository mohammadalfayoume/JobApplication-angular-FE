import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../../shared/file.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {
  data : any = null;
  imgSrc: string = '';
  isComplete: boolean = false;
  constructor(private companyService: CompanyService,private fileService: FileService, private sanitizer: DomSanitizer) {
    
  }
  ngOnInit(): void {
    this.companyService.getCompanyData().subscribe(
      response => {
        this.data = response.data;
        this.fileService.getImageUrl(response.data.profilePictureFile.id).subscribe(
          (imageUrl: string) => {
            this.imgSrc = imageUrl;
            this.isComplete = true;
          },
          (error: any) => {
            console.log('Error getting image URL:', error);
            this.isComplete = true;
          }
        );
        console.log('Get successfully', response);
      },
      error => {
        console.error('Error get company:', error);
        this.isComplete = true;
      }
    );
  }
  
}
