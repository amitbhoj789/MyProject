import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import {ConfigService} from "../../core/config.service";
import { FilesService } from 'src/app/core/services/files.service';
import { state, keyframes, style, animate, trigger, transition } from '@angular/animations';
import {Router} from "@angular/router";

@Component({
    selector: 'app-candidate-career-professional-match',
    templateUrl: './candidate-career-professional-match.component.html',
    styleUrls: ['./candidate-career-professional-match.component.scss'],
})
export class CandidateCareerProfessionalMatchComponent implements OnInit {

    searchType: any = [];
    headings: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    currentStep = 2;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;
    isLoader: boolean = true;
    maxThreeItemPopup: boolean = false;
    maxThreeItemPopupText: string = 'Click Remove Extra Specialization';

    images = [];
    imageData: any = [];

    selectedSpecialization: any = [];

    //Drag drop
    optionSelected = 1;

    constructor(
        public config: ConfigService,
        public fileService: FilesService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        localStorage.removeItem('data_in');
        localStorage.removeItem('data_or_in');
        localStorage.removeItem('data_not_in');
        this.searchType = localStorage.getItem('searchType');
        this.imageData = localStorage.getItem('imageData');
        this.imageData = JSON.parse(this.imageData)

        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;

        const specs = this.specializationList.filter((month,idx) => idx < 3);
        localStorage.setItem('specialization',JSON.stringify(specs));
        //this.getApprovedUsers();

        this.selectedSpecialization = [
            { key: '3', name: 'Cover Letter Preparation' },
            { key: '7', name: 'Interview Coaching' },
            { key: '15', name: 'Resume Development' },
        ]
        localStorage.setItem('specialization',JSON.stringify(this.selectedSpecialization));
    }

    selectedSpecializationLists = [
        { key: '3', name: 'Cover Letter Preparation' },
        { key: '7', name: 'Interview Coaching' },
        { key: '15', name: 'Resume Development' },
    ]

    optionalSpecializationLists = [
        { key: '1', name: 'Career Transition' },
        { key: '2', name: 'Certification Assessment'},
        { key: '4', name: 'Education Coaching'},
        { key: '5', name: 'Employer Evaluation' },
        { key: '6', name: 'Executive Coaching' },
        { key: '8', name: 'Job Match Strategy' },
        { key: '9', name: 'Job Tech Strategy'},
        { key: '10', name: 'Leadership Coaching'},
        { key: '11', name: 'Network Coaching' },
        { key: '12', name: 'Personal Branding' },
        { key: '13', name: 'Personality Assessment' },
        { key: '14', name: 'Profession Assessment' },
        { key: '16', name: 'Salary Negotiation'},
        { key: '17', name: 'Skills Assessment' },
        { key: '18', name: 'Training Assessment'},
    ];

    removeSelectedItem(array:any, i:any, selectArray:any) {
        this.maxThreeItemPopup = false;
        array.splice(i, 1);
        this.optionalSpecializationLists.push(selectArray);

        //Array Sort as name
        this.optionalSpecializationLists.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });

        //Push value to local storage
        const specs = this.selectedSpecializationLists.filter((name,idx) => idx < 3);
        localStorage.setItem('specialization',JSON.stringify(specs));

        return this.optionalSpecializationLists;
    }

    removeOptionalItem(array:any, i:any, selectArray:any) {
        this.maxThreeItemPopup = false;
        array.splice(i, 1);
        this.selectedSpecializationLists.push(selectArray);

        //Array Sort as name
        this.selectedSpecializationLists.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });
        //Push value to local storage
        const specs = this.selectedSpecializationLists.filter((name,idx) => idx < 3);
        localStorage.setItem('specialization',JSON.stringify(specs));

        return this.selectedSpecializationLists;
    }

    specializationList = [
        { key: '1', name: 'Career Transition' },
        { key: '2', name: 'Certification Assessment' },
        { key: '3', name: 'Cover Letter Preparation' },
        { key: '4', name: 'Education Coaching' },
        { key: '5', name: 'Employer Evaluation' },
        { key: '6', name: 'Executive Coaching' },
        { key: '7', name: 'Interview Coaching' },
        { key: '8', name: 'Job Match Strategy' },
        { key: '9', name: 'Job Tech Strategy' },
        { key: '10', name: 'Leadership Coaching' },
        { key: '11', name: 'Network Coaching' },
        { key: '12', name: 'Personal Branding' },
        { key: '13', name: 'Personality Assessment' },
        { key: '14', name: 'Profession Assessment' },
        { key: '15', name: 'Resume Development' },
        { key: '16', name: 'Salary Negotiation' },
        { key: '17', name: 'Skills Assessment' },
        { key: '18', name: 'Training Assessment' },
    ];

    allowDrop = (drag: any, drop: any) => {
        // debugger;
        if (drop.id === "includeList" && this.optionSelected === 1) {
            return true;
        } else if (drop.id === "excludeList" && this.optionSelected === 2) {
            return true;
        } else {
            return false;
        }
    };

    drop(event: CdkDragDrop<any[]>) {
        // console.log(event);
        const specialization = event.container.data;
        const specs = specialization.filter((month,idx) => idx < 3);
        localStorage.setItem('specialization',JSON.stringify(specs));


        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            const specs = event.container.data.filter((month,idx) => idx < 3);
            localStorage.setItem('specialization',JSON.stringify(specs));
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    // getApprovedUsers() {
    //     let arrData: any[] = []
    //     this.fileService.getAllUsers().then((res: any) => {
    //         if (res && res.status) {
    //             let resData = res.data.data;
    //             if(resData && resData.length > 0){
    //                 this.isLoader = false;
    //                 resData.forEach((element: { image: string; name: any; service_summary: any; profile_header: any; top3_specialites: any[]; }) => {
    //                     if (element.image && element.name && element.service_summary && element.profile_header) {
    //                         let top3_specialites: any[] = []
    //                         if (element.top3_specialites.length) {
    //                             element.top3_specialites.forEach(x => {
    //                                 top3_specialites.push(x.service_name)
    //                             })
    //                         }
    //                         let objData = {
    //                             image: this.config.imageStoragePath() + element.image,
    //                             name: element.name,
    //                             details: element.service_summary,
    //                             title: element.profile_header,
    //                             top3_specialites: top3_specialites.join(', ')
    //                         }
    //                         // @ts-ignore
    //                         this.images.push(objData)
    //                     }
    //                 });
    //                 this.setImageData(arrData);
    //             }
    //             this.isLoader = false;
    //         } else {
    //             this.isLoader = false;
    //             console.log('Err somthing went wrong');
    //         }
    //     }).catch((err: any) => {
    //         console.log(err);
    //     })
    // }
    //
    // setImageData(data: any) {
    //     this.imageData = [] //get user data for career advancement
    //     if(this.images && this.images.length > 0){
    //         // if (localStorage.getItem('jSlideValue') != undefined && localStorage.getItem('jSlideValue') != null && localStorage.getItem('jSlideValue') != '') {
    //         // let current: any = localStorage.getItem('jSlideValue') ? localStorage.getItem('jSlideValue') : '';
    //         let randomValue: any  =  Math.floor(Math.random() * this.images.length); // get random value smaller then image length
    //         if(randomValue >= this.images.length-2 && this.images.length > 1){ //get last two value
    //             this.imageData.push(this.images[this.images.length-2]);
    //             this.imageData.push(this.images[this.images.length-1]);
    //         } else{
    //             if(this.images.length > 1){
    //                 for (let i = randomValue; i <=   randomValue + 1  ; i++) {
    //                     let sildeData = this.images[i]
    //                     this.imageData.push(sildeData);
    //                 }
    //             } else{
    //                 let sildeData
    //                 this.images.length ?  sildeData = this.images[0] : " "
    //                 this.imageData.push(sildeData)
    //             }
    //         }
    //     }
    // }
    submitForm() {
        if (this.selectedSpecializationLists.length!==3) {
            if (this.selectedSpecializationLists.length<3) {
                this.maxThreeItemPopupText = 'Select 3 Specialization'
            } else {
                this.maxThreeItemPopupText = 'Click Remove Extra Specialization'
            }
            this.maxThreeItemPopup = true;
            return
        }
        this.router.navigate(['/career-professional-services']);
    }
}
