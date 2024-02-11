import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../../shared/file.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import { PostJobComponent } from '../post-job/post-job.component';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {
  data : any = null;
  isComplete: boolean = false;
  constructor(private companyService: CompanyService,public fileService: FileService, public dialog: MatDialog) {
    
  }
  openDialog() {
    this.dialog.open(PostJobComponent);
  }
  ngOnInit(): void {
    this.companyService.getCompanyData().subscribe(
      response => {
        this.data = response.data;
        this.fileService.getImageUrl(response.data?.profilePictureFile?.id).subscribe(
          (isSuccess: boolean) => {
            console.log(isSuccess);
            
            if (isSuccess) this.isComplete = true;
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
