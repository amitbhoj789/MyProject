import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {MockService} from "../../core/services/mock.service";
import {FilesService} from "../../core/services/files.service";

@Component({
    selector: 'app-career-professional-match',
    templateUrl: './career-professional-match.component.html',
    styleUrls: ['./career-professional-match.component.scss']
})
export class CareerProfessionalMatchComponent implements OnInit {

    searchType: any = [];
    headings: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];

    currentStep = 1;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;

    isLoader: boolean = true;
    images = [];
    imageData: any = [];
    constructor(
        public config: ConfigService,
        public mock: MockService,
        public fileService: FilesService
    ) { }

    ngOnInit(): void {

        this.searchType = localStorage.getItem('searchType');
        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;

        this.imageData = localStorage.getItem('imageData');
        this.imageData = JSON.parse(this.imageData);
        if (!this.imageData) {
            this.getApprovedUsers();
        } else {
            this.isLoader = false;
        }
        // this.mock.getIndustryList().subscribe((posts) => {
        //     // we received our posts!
        //     console.log(posts);
        // });
    }

    getApprovedUsers() {
        let arrData: any[] = []
        this.fileService.getAllUsers().then((res: any) => {
            if (res && res.status) {
                let resData = res.data.data;
                if(resData && resData.length > 0){
                    this.isLoader = false;
                    resData.forEach((element: { image: string; name: any; service_summary: any; profile_header: any; top3_specialites: any[]; }) => {
                        if (element.image && element.name && element.service_summary && element.profile_header) {
                            let top3_specialites: any[] = []
                            if (element.top3_specialites.length) {
                                element.top3_specialites.forEach(x => {
                                    top3_specialites.push(x.service_name)
                                })
                            }
                            let objData = {
                                image: this.config.imageStoragePath() + element.image,
                                name: element.name,
                                details: element.service_summary,
                                title: element.profile_header,
                                top3_specialites: top3_specialites.join(', ')
                            }
                            // @ts-ignore
                            this.images.push(objData)
                        }
                    });
                    this.setImageData(arrData);
                }
                this.isLoader = false;
            } else {
                this.isLoader = false;
                console.log('Err somthing went wrong');
            }
        }).catch((err: any) => {
            console.log(err);
        })
    }

    setImageData(data: any) {
        this.imageData = [] //get user data for career advancement
        if(this.images && this.images.length > 0){
            // if (localStorage.getItem('jSlideValue') != undefined && localStorage.getItem('jSlideValue') != null && localStorage.getItem('jSlideValue') != '') {
            // let current: any = localStorage.getItem('jSlideValue') ? localStorage.getItem('jSlideValue') : '';
            let randomValue: any  =  Math.floor(Math.random() * this.images.length); // get random value smaller then image length
            if(randomValue >= this.images.length-2 && this.images.length > 1){ //get last two value
                this.imageData.push(this.images[this.images.length-2]);
                this.imageData.push(this.images[this.images.length-1]);
            } else{
                if(this.images.length > 1){
                    for (let i = randomValue; i <=   randomValue + 1  ; i++) {
                        let sildeData = this.images[i]
                        this.imageData.push(sildeData);
                    }
                } else{
                    let sildeData
                    this.images.length ?  sildeData = this.images[0] : " "
                    this.imageData.push(sildeData)
                }
            }
        }
    }

}
