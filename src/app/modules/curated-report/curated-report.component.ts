import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import { GovtMatchApp } from 'src/app/core/services/govt-match-app.service';
import { formatDate } from '@angular/common';
import {Router} from "@angular/router";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import {empty} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {AdditionalInputComponent} from "../additional-input/additional-input.component";

@Component({
    selector: 'app-curated-report',
    templateUrl: './curated-report.component.html',
    styleUrls: ['./curated-report.component.scss'],
    providers: [ToastrService]
})
export class CuratedReportComponent implements OnInit {

    public matchList: any = [];
    public jobObj: any = [];
    demoJob: any = [];
    headers: any = [];
    tableHeading: any = '';
    selectedJobs: any = [];
    noDataFound: boolean = false;
    nextButton: boolean = false;
    jobUrl: any = '';
    showDownloadPdfBtn: boolean = true;
    blurRows: any = [];
    showPrivateForm: any = false;
    match_id: any;
    searchType: any = [];
    isLoader: boolean = true;
    isButtonLoader: boolean = false;
    headings: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    currentStep = 4;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;
    contentHeading = 'Top 10 Job Matches';
    routeLink: any;

    array1:any;
    array2:any;


    constructor(
        public config: ConfigService,
        private govtMatchApp: GovtMatchApp,
        private router: Router,
        private toast: ToastrService,
    ) { }

    ngOnInit(): void {
        this.searchType = localStorage.getItem('searchType');
        this.match_id = localStorage.getItem('match_id');
        this.matchList = localStorage.getItem('matchList');//get data from the localstorage in previous component set
        if (this.searchType === null) {
            this.router.navigate(['/']);
        }

        if (this.searchType !== 'free' || this.searchType === 'free') {
            this.matchList = JSON.parse(this.matchList);//convert data into json parse of localstorage data
            if (this.matchList.length>0) {
                this.isLoader = false;
            }
            if (!this.matchList && this.matchList.length==0) {//in case previous component cannot set the localstorage
                this.getJobData();
            }
        }
        // if (this.searchType === 'free') {
        //     this.showDemoJobInitialData();
        //     this.showDownloadPdfBtn = false;
        // }

        if (this.searchType === 'freeGovt') {
            this.contentHeading = 'Top 10 Government Job Matches';
        }

        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;

        if (this.searchType === 'freeGovt') {
            this.currentStep = 5;
            this.maxStep = 6;
            this.contentHeading = 'Top 10 Government Sector Matches';
            this.progress = (this.currentStep/this.maxStep)*100;
            this.progress = Math.round(this.progress);
            // localStorage.removeItem('jobDetails');
            // localStorage.removeItem('jobDetailsPositionTitle');
            // localStorage.removeItem('jobDetailsDepartment');
        }
    }

    demoJobList = [
        {
            "matched_object_id": 1,
            "match_percent": "100%",
            "position_title": "Safety and Occupational Health Manager",
            "position_url" : "/submit-apply/1",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
        {
            "matched_object_id": 2,
            "match_percent": "100%",
            "position_title": "Project Manager (Public Notice Flyer)",
            "position_url" : "/submit-apply/2",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
        {
            "matched_object_id": 3,
            "match_percent": "100%",
            "position_title": "Program Analyst",
            "position_url" : "/submit-apply/3",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
        {
            "matched_object_id": 4,
            "match_percent": "100%",
            "position_title": "Program Analyst",
            "position_url" : "/submit-apply/4",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
        {
            "matched_object_id": 5,
            "match_percent": "100%",
            "position_title": "Program Analyst",
            "position_url" : "/submit-apply/5",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
        {
            "matched_object_id": 6,
            "match_percent": "100%",
            "position_title": "Safety and Occupational Health Manager",
            "position_url" : "/submit-apply/6",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
        {
            "matched_object_id": 7,
            "match_percent": "100%",
            "position_title": "roject Manager (Public Notice Flyer)",
            "position_url" : "/submit-apply/7",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
        {
            "matched_object_id": 8,
            "match_percent": "100%",
            "position_title": "Program Analyst",
            "position_url" : "/submit-apply/8",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
        {
            "matched_object_id": 9,
            "match_percent": "100%",
            "position_title": "Program Analyst",
            "position_url" : "/submit-apply/9",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
        {
            "matched_object_id": 10,
            "match_percent": "100%",
            "position_title": "Program Analyst",
            "position_url" : "/submit-apply/10",
            "organization_name" : "Organization Name",
            "department_name" : "Department of Energy",
            "position_start_date" : "06-01-2023",
            "position_end_date" : "16-01-2023",
            "publication_start_date" : "06-01-2023",
            "application_close_date" : "16-01-2023",
        },
    ]

    showDemoJobInitialData() {
        this.tableHeading = 'Top Candidate Curated Job Matches';
        this.matchList = [];
        this.isLoader = false;
        this.demoJob = this.demoJobList;
        localStorage.setItem('matchList',JSON.stringify(this.demoJob))
        for (let i = 0; i < this.demoJob.length; i++) {
            let jobObj: any = {};
            jobObj['matched_object_id'] = i + 1;
            jobObj['match_percent'] = this.demoJob[i]['match_percent'];
            jobObj['position_title'] = this.demoJob[i]['position_title'];
            jobObj['position_url'] = this.demoJob[i]['position_url'];
            jobObj['organization_name'] = this.demoJob[i]['organization_name'];
            jobObj['department_name'] = this.demoJob[i]['department_name'];
            jobObj['position_start_date'] = this.demoJob[i]['position_start_date'];
            jobObj['position_end_date'] = this.demoJob[i]['position_end_date'];
            jobObj['publication_start_date'] = this.demoJob[i]['publication_start_date'];
            jobObj['application_close_date'] = this.demoJob[i]['application_close_date'];
            this.matchList.push(jobObj);
        }
    }

    getJobData() {
        this.match_id = localStorage.getItem('match_id');
        this.match_id = JSON.parse(this.match_id)
        this.govtMatchApp.getCurateMatchJobs({match_id : this.match_id}).then((data:any) => {
            if (data.status) {
                if (data.data.curated_jobs.length>0) {
                    this.showJobData(data);
                } else {
                    this.searchType = localStorage.getItem('searchType');
                    if (this.searchType === 'freeGovt') {
                        this.toast.error('Unfortunately, there is no jobs available for the given additional input. Please consider trying alternative additional input.','',{
                            timeOut: 5000,
                        });
                    }
                }//try changing value and step 3
                // this.isStep3Loading = false
            } else {
                // this.noDataFound = true;
                // this.isStep3Loading = false
            }

        });
        return true
    }

    showJobData(data: any) {
        if (data || data == '') {
            this.matchList = [];
            this.tableHeading = '';
            // data.SearchResult.SearchResultItems = [];
            // this.showBlurImg = false;
            // this.showJobTable = true;
            // var noOfMatches :any  = 0;
            if (this.searchType == 'paid') {
                this.showPrivateForm = true;
                if (
                    data.SearchResult &&
                    data.SearchResult.SearchResultItems &&
                    data.SearchResult.SearchResultItems.length > 0
                ) {
                    this.tableHeading = 'Top Private Sector Job Matches';
                    for (let element of data.SearchResult.SearchResultItems) {
                        let index = this.selectedJobs.findIndex(
                            (x: any) => x.MatchedObjectId == element.MatchedObjectId
                        );
                        if (index != -1) {
                            let jobObj: any = {};
                            jobObj['match_percent'] = '100 %';
                            jobObj['position_title'] =
                                element.MatchedObjectDescriptor.PositionTitle;
                            jobObj['position_url'] =
                                element.MatchedObjectDescriptor.PositionURI;
                            jobObj['organization_name'] =element.OrganizationName ?  element.MatchedObjectDescriptor.OrganizationName: '-';
                            jobObj['department_name'] = element.MatchedObjectDescriptor.DepartmentName;
                            jobObj['position_start_date'] = formatDate(
                                element.MatchedObjectDescriptor.PositionStartDate,
                                'yyyy-MM-dd',
                                'en-US'
                            );
                            jobObj['position_end_date'] = formatDate(
                                element.MatchedObjectDescriptor.PositionEndDate,
                                'yyyy-MM-dd',
                                'en-US'
                            );
                            jobObj['publication_start_date'] = formatDate(
                                element.MatchedObjectDescriptor.PublicationStartDate,
                                'yyyy-MM-dd',
                                'en-US'
                            );
                            jobObj['application_close_date'] = formatDate(
                                element.MatchedObjectDescriptor.ApplicationCloseDate,
                                'yyyy-MM-dd',
                                'en-US'
                            );
                            this.matchList.push(jobObj);
                        }
                    }
                    if (this.matchList.length > 0) {
                        //this.tabIndex = 4;
                    } else {
                        this.noDataFound = true;
                        //this.tabIndex = 4;
                    }
                } else {
                    // this.showBlurImg = false;
                    // this.showJobTable = false;
                    this.noDataFound = true;
                }
            } else if (this.searchType == 'free') {
                // this.showPrivateForm = false;
                // this.showDemoJobInitialData();
                // if (this.matchList.length > 0) {
                //     //this.tabIndex = 4;
                // } else {
                //     this.noDataFound = true;
                //     //this.tabIndex = 4;
                // }
                if ( (data.data.curated_jobs && data.data.curated_jobs.length) || data.SearchResult ) {
                    this.isLoader = false;
                    let jobObj: any = {};
                    for (let element of data.data.curated_jobs) {
                        jobObj['id'] = element.id;
                        jobObj['match_percent'] = '100 %';
                        jobObj['position_title'] = element.Job_Title ? element.Job_Title : element.job_title;
                        jobObj['position_url'] = element.Job_URL;
                        jobObj['organization_name'] =  element.OrganizationName ? element.OrganizationName : ' - '  ; //need to resolve
                        jobObj['department_name'] = element.Department;
                        jobObj['position_start_date'] = element.PositionStartDate ? formatDate( element.MatchedObjectDescriptor.PositionStartDate, 'yyyy-MM-dd', 'en-US' ) : '-'
                        jobObj['position_end_date'] = element.PositionEndDate ?  formatDate( element.MatchedObjectDescriptor.PositionEndDate, 'yyyy-MM-dd', 'en-US' ) : "-"
                        jobObj['publication_start_date'] =element.PublicationStartDate ? formatDate( element.MatchedObjectDescriptor.PublicationStartDate, 'yyyy-MM-dd', 'en-US'): "-"
                        jobObj['application_close_date'] = element.ApplicationCloseDate ? formatDate( element.MatchedObjectDescriptor.ApplicationCloseDate, 'yyyy-MM-dd', 'en-US' ):"-"
                        if (this.matchList.length < 10) {
                            //this.matchList.push(jobObj);
                        } else {
                            break;
                        }
                    }
                    //Extra
                    this.cacheStorage(data.data.curated_jobs);
                    //End
                    if (this.matchList.length > 0) {
                        //this.tabIndex = 4;
                    } else {
                        this.noDataFound = true;
                        //this.tabIndex = 4;
                    }
                } else {
                    this.noDataFound = true;
                    //this.tabIndex = 4;
                }
            } else {
                if (this.searchType == 'companyMatch') {
                    this.tableHeading = 'Top Ten Individual USA Company Instant Matches';
                } else this.tableHeading = 'Top Ten Government Sector Instant Matches';
                if ( (data.data.curated_jobs && data.data.curated_jobs.length) || data.SearchResult ) {
                    this.isLoader = false;
                    let jobObj: any = {};
                    for (let element of data.data.curated_jobs) {
                        jobObj['id'] = element.id;
                        jobObj['match_percent'] = element.match_perct;
                        jobObj['position_title'] = element.job_title ? element.job_title : element.Job_Title;
                        jobObj['position_url'] = element.job_url ? element.job_url : element.Job_URL;
                        jobObj['organization_name'] =  element.organization_name ? element.organization_name : ' - '  ; //need to resolve
                        jobObj['department_name'] = element.department ? element.department : element.Department;
                        jobObj['position_start_date'] = element.PositionStartDate ? formatDate( element.MatchedObjectDescriptor.PositionStartDate, 'yyyy-MM-dd', 'en-US' ) : '-' // TODO
                        jobObj['position_end_date'] = element.PositionEndDate ?  formatDate( element.MatchedObjectDescriptor.PositionEndDate, 'yyyy-MM-dd', 'en-US' ) : "-" // TODO
                        jobObj['publication_start_date'] =element.PublicationStartDate ? formatDate( element.MatchedObjectDescriptor.PublicationStartDate, 'yyyy-MM-dd', 'en-US'): "-"
                        jobObj['application_close_date'] = element.ApplicationCloseDate ? formatDate( element.MatchedObjectDescriptor.ApplicationCloseDate, 'yyyy-MM-dd', 'en-US' ):"-"
                        if (this.matchList.length < 10) {
                            // this.matchList.push(jobObj);
                        } else {
                            break;
                        }
                    }
                    //Extra
                    this.cacheStorage(data.data.curated_jobs);
                    //End
                    if (this.matchList.length > 0) {
                        //this.tabIndex = 4;
                    } else {
                        this.noDataFound = true;
                        //this.tabIndex = 4;
                    }
                } else {
                    console.log('no found')
                    this.noDataFound = true;
                    //this.tabIndex = 4;
                }
            }
        } else {
            // this.showBlurImg = false;
            // this.showJobTable = false;
            this.noDataFound = true;
            //this.tabIndex = 4;
        }
    }

    openJobUrl(url:any, searchType: any, type: any, position_title: any, department_name: any, number:any, job_id:any, getDetails:any): void {
        if (searchType === 'free' && type === 'card') {
            this.isButtonLoader = true;
            // localStorage.setItem('jobDetailsPositionTitle',position_title);
            // localStorage.setItem('jobDetailsDepartment',department_name);
            // localStorage.setItem('jobDetailsUrl',url);
            // localStorage.setItem('jobDetailsNumber',number);
            //this.router.navigate([url]);
            this.getJobDetails(url, number, position_title, department_name, job_id, getDetails);

        } else if (searchType !== 'free' && type === 'card') {
            this.isButtonLoader = true;
            // localStorage.setItem('jobDetailsPositionTitle',position_title);
            // localStorage.setItem('jobDetailsDepartment',department_name);
            // localStorage.setItem('jobDetailsUrl',url);
            // localStorage.setItem('jobDetailsNumber',number);
            this.getJobDetails(url, number, position_title, department_name, job_id, getDetails);
            // window.open(url, '_blank')
        }
        // console.log(searchType)
    }

    jobDetails: any;
    datas: any;
    getJobDetailsOLD(url: any, number: any, position_title: any, department_name: any, job_id: any, getDetails:any) {
        if (getDetails == 'manual') {
            // const array2 = localStorage.getItem('jobDetails');
            // @ts-ignore
            // const array1 = JSON.parse(array2);
            // const match_job_id = job_id;
            // @ts-ignore
            // const found = array1.find(({ job_id }) => job_id == match_job_id);
            // localStorage.setItem('jobUrl',url);
            this.jobDetails = localStorage.getItem('jobDetails');
            if (!this.jobDetails) {
                this.govtMatchApp.getCurateMatchJobsDetails(url).then((data:any) => {
                    if (data) {
                        //localStorage.setItem('jobDetails',JSON.stringify(data));
                        this.isButtonLoader = false;
                        //Save local storage
                        this.datas = {
                            'details': data,
                            'url': url,
                            'job_number': number,
                            'job_id': job_id,
                            'position_title': position_title,
                            'department_name': department_name,
                        }
                        this.saveLocalStorage(this.datas);
                        this.router.navigate(['/submit-apply/'+job_id])
                        // this.router.navigate(['/submit-apply/'+job_id]);
                        // this.isStep3Loading = false
                    } else {
                        this.isButtonLoader = false;
                        // this.noDataFound = true;
                        // this.isStep3Loading = false
                    }
                });
            } else {
                this.jobDetails = localStorage.getItem('jobDetails');
                this.router.navigate(['/submit-apply/'+job_id]);
            }
            //this.router.navigate(['/submit-apply/'+job_id]);
        } else {
            this.govtMatchApp.getCurateMatchJobsDetails(url).then((data:any) => {
                if (data) {
                    //localStorage.setItem('jobDetails',JSON.stringify(data));
                    this.isButtonLoader = false;
                    //Save local storage
                    this.datas = {
                        'details': data,
                        'url': url,
                        'job_number': number,
                        'job_id': job_id,
                        'position_title': position_title,
                        'department_name': department_name,
                    }
                    this.saveLocalStorage(this.datas)
                    // this.router.navigate(['/submit-apply/'+job_id]);
                    // this.isStep3Loading = false
                } else {
                    // this.noDataFound = true;
                    // this.isStep3Loading = false
                }
            });
        }
    }


    getJobDetails(url: any, number: any, position_title: any, department_name: any, job_id: any, getDetails:any) {
        if (getDetails == 'manual') {
            this.array2 = localStorage.getItem('matchList');
            // @ts-ignore
            this.array1 = JSON.parse(this.array2);
            const match_job_id = job_id;
            // @ts-ignore
            this.array2 = this.array1.find(( p ) => p.id === match_job_id);
            // localStorage.setItem('jobUrl',url);
            this.jobDetails = localStorage.getItem('jobDetails');
            if (!this.jobDetails) {
                this.datas = {
                    'details': this.array2,
                    'url': url,
                    'job_number': number,
                    'job_id': job_id,
                    'position_title': position_title,
                    'department_name': department_name,
                }
                this.saveLocalStorage(this.datas);
                this.router.navigate(['/submit-apply/'+job_id])
            } else {
                this.jobDetails = localStorage.getItem('jobDetails');
                this.router.navigate(['/submit-apply/'+job_id]);
            }
            //this.router.navigate(['/submit-apply/'+job_id]);
        } else {
            this.array2 = localStorage.getItem('matchList');
            // @ts-ignore
            this.array1 = JSON.parse(this.array2);
            const match_job_id = job_id;
            //console.log(this.array1)
            // @ts-ignore
            this.array2 = this.array1.find(( p ) => p.id === match_job_id);

            this.datas = {
                'details': this.array2,
                'url': url,
                'job_number': number,
                'job_id': job_id,
                'position_title': position_title,
                'department_name': department_name,
            }
            this.saveLocalStorage(this.datas)
        }
    }

    saveLocalStorage(details: any) {
        let itemsList = []
        const getDetailStorage = localStorage.getItem('jobDetails')
        if(getDetailStorage){
            this.jobDetails = localStorage.getItem('jobDetails')
            itemsList = JSON.parse(this.jobDetails)
            itemsList.push(details)
            localStorage.setItem('jobDetails', JSON.stringify(itemsList));
            this.router.navigate(['/curated-report']);
        }else{
            itemsList.push(details)
            localStorage.setItem('jobDetails', JSON.stringify(itemsList));
            this.router.navigate(['/curated-report']);
        }
    }

    onChange(e: any, data: any): void {
        if (e.isTrusted) {
            this.nextButton = true;
            this.jobUrl = data.position_url;
        } else {
            this.nextButton = false;
        }
    }

    cacheStorage(matchList:any) {
        this.matchList = matchList;
        localStorage.setItem('matchList', JSON.stringify(this.matchList));
        for (let i = 0; i < this.matchList.length; i++) {
            this.matchList[i]['id'] = this.matchList[i].id;
            this.matchList[i]['match_percent'] = this.matchList[i].match_percent ? this.matchList[i].match_percent.toFixed(0)+'%' : '100%';
            this.matchList[i]['position_title'] = this.matchList[i].job_title;
            this.matchList[i]['position_url'] = this.matchList[i].job_url;
            this.matchList[i]['organization_name'] =  this.matchList[i].organization_name ? this.matchList[i].organization_name : ' - '  ; //need to resolve
            this.matchList[i]['department_name'] = this.matchList[i].department;
            matchList['position_start_date'] = this.matchList[i].PositionStartDate ? formatDate( this.matchList[i].MatchedObjectDescriptor.PositionStartDate, 'yyyy-MM-dd', 'en-US' ) : '-' // TODO
            this.matchList[i]['position_end_date'] = this.matchList[i].PositionEndDate ?  formatDate( this.matchList.MatchedObjectDescriptor.PositionEndDate, 'yyyy-MM-dd', 'en-US' ) : "-" // TODO
            this.matchList[i]['publication_start_date'] =this.matchList[i].PublicationStartDate ? formatDate( this.matchList[i].MatchedObjectDescriptor.PublicationStartDate, 'yyyy-MM-dd', 'en-US'): "-"
            this.matchList[i]['application_close_date'] = this.matchList[i].ApplicationCloseDate ? formatDate( this.matchList[i].MatchedObjectDescriptor.ApplicationCloseDate, 'yyyy-MM-dd', 'en-US' ):"-";

            //this.matchList.push(this.matchList);
            // console.log(this.matchList[i]['id']);
            if (i<10) {
                this.getJobDetails(this.matchList[i].Job_URL,i+1, this.matchList[i].Job_Title, this.matchList[i].Department, this.matchList[i].id, 'auto');
            }
        }
        //console.log(this.matchList);
        localStorage.setItem('matchList', JSON.stringify(this.matchList));
        this.router.navigate(['/curated-report']);
    }

    downloadAsPdf() {
        this.openPDF();
    }

    exportAsPDF(selectedRows: any[] = []) {
        let col = this.headers;
        let field = this.headers;
        let logoImg = '';
        this.newDownloadPdfFunction(
            logoImg,
            'Your Selection',
            this.matchList,
            field,
            col,
            'Selcted_Jobs'
        );
    }

    newDownloadPdfFunction(
        logoImg: string,
        reportTitle: string,
        reportData: any,
        selectedFieldName: any,
        selectedColumn: any,
        reportName: string
    ) {
        let allColumns: any = [];
        if (reportData && reportData.length > 0) {
            allColumns = Object.keys(reportData[0]);
        }

        //console.log('reportData',reportData)
        let rows = reportData;
        //console.log('rows',rows);
        allColumns.forEach((key: any) => {
            if (!selectedFieldName.includes(key)) {
                rows.forEach((element: any) => {
                    //delete element[key];
                });
            }
        });

        let selectedColumns = [];
        selectedColumns.push(selectedColumn);

        let tblData: any = [];
        rows.forEach((row: any) => {
            let data: any = [];
            selectedFieldName.forEach((key: any) => {
                data.push(row[key]);
            });
            tblData.push(data);
        });
        //console.log('rows',rows);
        let genratedOnDate = new Date().toLocaleString();
        var pdf = new jsPDF('landscape');

        var pageHeight =
            pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
        var pageWidth =
            pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();

        pdf.setFillColor(51, 204, 204);
        pdf.roundedRect(5, 5, pageWidth - 10, 30, 3, 3, 'F');

        //pdf.addImage(logoImg, 'jpg', 8, 9, 80, 15);

        pdf.text(reportTitle, 12, 30);
        pdf.text(this.tableHeading, 130, 18);

        //console.log('tblData',tblData)
        pdf.setFontSize(12);
        pdf.text('Generated On:', 250, 15);
        pdf.setFontSize(10);
        pdf.text(genratedOnDate, 250, 20);
        (pdf as any).autoTable({
            head: selectedColumns,
            body: tblData,
            startY: 40,
            tableWidth: 'auto',
            margin: {
                top: 5,
            },
            styles: {
                fontSize: 7,
                overflow: 'linebreak',
            },
            theme: 'grid',
        });
        pdf.save(reportName + '_export_' + new Date().getTime() + '.pdf');
    }


    @ViewChild('htmlData') htmlData!: ElementRef;

    public printJobs(cmpName: any): void {
        let printContents: any = document.getElementById(cmpName);
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    }

    public openPDF(): void {
        let DATA: any = document.getElementById('htmlData');
        let PDF = new jsPDF('p', 'mm', 'a4');
        // var pWidth = PDF.internal.pageSize.getWidth();
        // var pHeight = PDF.internal.pageSize.getHeight();
        html2canvas(DATA,{
            scrollY: -window.scrollY,
            width: 1730,
            removeContainer: false
        }).then((canvas) => {
            let fileWidth = 208;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');
            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            PDF.save('job_export_'+ new Date().getTime() +'.pdf');

        });

        //
        // var pdf = new jsPDF("p", "mm", "a4");
        // var pWidth = pdf.internal.pageSize.getWidth();
        // var pHeight = pdf.internal.pageSize.getHeight();
        //
        // //let DATA: any = document.getElementById('htmlData');
        //
        // pdf.html((DATA),{
        //     html2canvas: {
        //         width: pWidth,
        //         removeContainer: false // for analyzing iframe
        //     }, callback: function (pdf) {
        //         var timestamp = Date.now();
        //         var pdfName = `${timestamp}_test.pdf`;
        //         pdf.save(pdfName);
        //     }
        // });
    }


}
