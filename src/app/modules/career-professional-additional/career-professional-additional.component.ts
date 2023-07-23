import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import { FilesService } from 'src/app/core/services/files.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-career-professional-additional',
    templateUrl: './career-professional-additional.component.html',
    styleUrls: ['./career-professional-additional.component.scss']
})
export class CareerProfessionalAdditionalComponent implements OnInit {

    frmDetails!: FormGroup;
    searchType: any = [];
    headings: any = [];
    industryData: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    isInvalid: boolean = false;
    isLoader: boolean = false;
    stringSpecialization : any;
    removeLastInSpecialization : any;
    closeDropdown : boolean = false;
    currentStep = 4;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;
    dropdownSettings = {};

    specialization: any = []
    data_in: any = []
    data_or_in: any = []
    data_not_in: any = []
    matchesData: any = [];
    images = [];
    imageData: any = [];

    constructor(
        private fb: FormBuilder,
        public config: ConfigService,
        private router: Router,
        public fileService: FilesService,
        public fun: FunctionService,
        public toast: ToastrService,
    ) { }

    selectedItems1 = [
        {key: '15', name: 'Resume Development', isDisabled: true},
        {key: '17', name: 'Skills Assessment', isDisabled: true}
    ];

    ngOnInit(): void {
        this.specialization = localStorage.getItem('specialization');
        this.specialization = JSON.parse(this.specialization);
        this.frmDetails = this.fb.group({
            specializationArray: ['',null],
            specialization: ['',null],
            country: ['United States',null],
            state: ['',null],
            city: ['',null],
            // primary_service: ['',null],
            data_in:[""],
            data_or_in:[""],
            data_not_in: [""]
        });

        this.searchType = localStorage.getItem('searchType');
        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;
        this.getIndustryData()
        this.fun.setFilterData = [];
    }

    get getControls() {
        return this.frmDetails.controls;
    }

    industryList = [
        { key: '1', name: 'Career Transition' },
        { key: '2', name: 'Certification Assessment' },
        { key: '3', name: 'Cover Letter Prep' },
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

    getIndustryData() {
        this.industryData = this.industryList;
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'key',
            textField: 'name',
            limitSelection: 3,
            enableCheckAll: false,
        };
    }

    onItemSelect(item: any) {
        //console.log(item);
    }

    onSelectAll(items: any) {
        //console.log(items);
    }

    handleClick(items: any) {
        this.closeDropdown = !this.closeDropdown;
    }

    onDropDownClose(items: any) {}

    arrayToString(arr = []) {
        let str = '';
        for(let i = 0; i < arr.length; i++){
            if(Array.isArray(arr[i]['name'])){
                str += this.arrayToString(arr[i]['name']);
            }else{
                str += `${arr[i]['name']}`+', ';
            }
        }
        return str;
    };

    submitForm() {
        this.isLoader = true
        // console.log('data_not_in => ', this.data_not_in);
        // console.log('data_in => ', this.data_in);
        // console.log('data_or_in => ', this.data_or_in);
        this.data_not_in = localStorage.getItem('data_not_in');
        this.data_not_in = JSON.parse(this.data_not_in);

        this.data_in = localStorage.getItem('data_in');
        this.data_in = JSON.parse(this.data_in);

        this.data_or_in = localStorage.getItem('data_or_in');
        this.data_or_in = JSON.parse(this.data_or_in);

        // console.log(this.frmDetails.value.specializationArray);
        this.stringSpecialization = this.arrayToString(this.frmDetails.value.specializationArray);

        this.removeLastInSpecialization = this.stringSpecialization.substring(0, this.stringSpecialization.length-2);

        //get array key name value and convert to comma
        // this.removeLastInSpecialization = this.specialization.map((item: { name: any; }) => item.name).join();
        this.removeLastInSpecialization = "";

        this.frmDetails.markAllAsTouched();
        this.frmDetails.patchValue({specialization: this.removeLastInSpecialization})
        this.frmDetails.patchValue({data_in: this.data_in})
        this.frmDetails.patchValue({data_not_in: this.data_not_in})
        this.frmDetails.patchValue({data_or_in: this.data_or_in})
        if(this.frmDetails.valid){
            this.fileService.filterCareerProfessional(this.frmDetails.value).then((res:any)=>{
                this.isLoader = false
                if(res && res.status){
                    this.matchesData = res.data.data;
                    this.fun.setFilterData = res.data.data;
                    this.router.navigate(['/career-professional-top-match']);
                    //this.changeTab.emit(7);
                } else{
                    //not data found
                    this.isLoader = false;
                    this.router.navigate(['/career-professional-top-match']);
                    let arrData: any[] = []
                    this.getApprovedUsers();
                    // this.toast.error(res.message);
                }
            }).catch((err: any) => {
                this.isLoader = false
                console.log(err);
            })
        }
        else{
            this.toast.error('Please fill all required fields')
            //this.dataLoader = false
        }
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
        localStorage.setItem('imageData',JSON.stringify(this.imageData));
    }
}
