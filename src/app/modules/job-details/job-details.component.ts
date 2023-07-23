import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {Router} from "@angular/router";
import {GovtMatchApp} from "../../core/services/govt-match-app.service";

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

    @Input() jobUrl: any;
    @Input() job_id: any;

    jobDetails: any;
    jobDetailsUrl: any;
    jobDetailsPositionTitle: any;
    jobDetailsDepartment: any;
    jobDetailsNumber: any = 1;
    searchType: any = [];

    constructor(
        public config: ConfigService,
        private router: Router,
        private govtMatchApp: GovtMatchApp,
    ) { }

    ngOnInit(): void {
        this.searchType = localStorage.getItem('searchType');

        if (this.searchType === 'freeGovt' || this.searchType === 'free') {
            this.jobDetails = localStorage.getItem('jobDetails');
            if (!this.jobDetails) {
                this.router.navigate(['/curated-report']);
            }
            this.freeGovtJob(this.jobUrl, this.job_id)
        } else {
            this.freeDemoJob(this.jobUrl)
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.searchType === 'freeGovt' || this.searchType === 'free') {
            this.freeGovtJob(this.jobUrl, this.job_id);
        }  else {
            this.freeDemoJob(this.jobUrl)
        }
    }

    freeGovtJob(url: any, job_id:any) {
        this.jobDetails = localStorage.getItem('jobDetails');
        this.jobDetails = JSON.parse(this.jobDetails);
        const array2 = localStorage.getItem('jobDetails');
        if (array2) {
            // @ts-ignore
            const array1 = JSON.parse(array2);
            const match_job_id = job_id;
            // @ts-ignore
            this.jobDetails = array1.find(({ job_id }) => job_id == match_job_id);
        } else {
            this.getJobDetails(url, job_id)
        }
        this.jobDetails = {
            'company_logo': null,
            'match_percent': this.jobDetails ? this.jobDetails.details.match_percent.toFixed(0) : '',
            'job_title': this.jobDetails ? this.jobDetails.details.job_title : '',
            'company_name': this.jobDetails.company_name ? this.jobDetails.details.company_name : '',
            'department': this.jobDetails.details.department,
            'experience': this.jobDetails.experience ? this.jobDetails.details.experience : '',
            'opening': this.jobDetails.opening ? this.jobDetails.details.opening : '',
            'location': this.jobDetails.location ? this.jobDetails.details.location : '',
            'salary': this.jobDetails.salary ? this.jobDetails.details.salary : '',
            'job_description': this.jobDetails.details.job_text,
            'job_url': this.jobDetails.details.job_url,
            'max_salary': this.jobDetails.details.max_salary,
            'min_salary': this.jobDetails.details.min_salary,
            'job_number': this.jobDetails.job_number,
        }
    }

    freeDemoJob(url: any) {
        this.jobDetailsPositionTitle = localStorage.getItem('jobDetailsPositionTitle');
        this.jobDetailsDepartment = localStorage.getItem('jobDetailsDepartment');
        this.jobDetailsNumber = localStorage.getItem('jobDetailsNumber');
        this.jobDetailsUrl = localStorage.getItem('jobDetailsUrl');
        this.jobDetails = {
            'company_logo': 'logos_microsoft.svg',
            'job_title': 'Angular Developer',
            'company_name': 'Microsoft',
            'department_name': 'Department Name',
            'experience': '3-8 Years',
            'opening': '1 Opening',
            'location': 'Location is US',
            'salary': '$7000 - $785 LPA',
            'job_description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            'job_url': '',
            'job_number': this.jobDetailsNumber,
        }
    }

    getJobDetails(url: any, number: any) {
        this.govtMatchApp.getCurateMatchJobsDetails(url).then((data:any) => {
            if (data) {
                localStorage.setItem('jobDetails',JSON.stringify(data));
                // this.isButtonLoader = false;
                this.router.navigate(['/submit-apply/'+number]);
                // this.isStep3Loading = false
            } else {
                // this.noDataFound = true;
                // this.isStep3Loading = false
            }
        });
    }

    public printJobs(cmpName: any): void {
        let printContents: any = document.getElementById(cmpName);
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.href = "submit-apply/"+this.job_id;
    }

}
