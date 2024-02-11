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
  jobs : JobDto[] = [];
  ngOnInit(): void {
    this.sharedService.getCompanyJobs(this.companyId).subscribe(res => {
      this.jobs = res;
    })
  }

}
