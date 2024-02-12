import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { JobDto } from '../../../lib/interface/jobDto';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  constructor(private sharedService: SharedService){
  }
  @Input() companyId: number = 0;
  @Input() companyName: string = '';
  jobs : JobDto[] = [];
  imgSrc: string | null= '/assets/anonymous_logo.jpg'
  ngOnInit(): void {
    this.sharedService.getCompanyJobs(this.companyId).subscribe(res => {
      console.log(res);
      
      this.jobs = res;
    })
    this.getImgSrc();
  }
  getImgSrc(): void{
    if (this.sharedService.getUserScrImg()){
      this.imgSrc = this.sharedService.getUserScrImg();
    }
  }

}
