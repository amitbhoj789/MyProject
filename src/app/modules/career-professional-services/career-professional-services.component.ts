import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms'
import {ConfigService} from "../../core/config.service";
import { FilesService } from 'src/app/core/services/files.service';
import {Router} from "@angular/router";
declare var $: any;

@Component({
    selector: 'app-career-professional-services',
    templateUrl: './career-professional-services.component.html',
    styleUrls: ['./career-professional-services.component.scss']
})
export class CareerProfessionalServicesComponent implements OnInit {

    searchType: any = [];
    headings: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    excludeList: any = [];
    matchAny: any = [];
    matchAll: any = [];
    include: any = [];
    cars: any = [];

    isDataLoader: boolean = false;
    allExpertiseDefault: any = []

    matchAnyData: any = [];
    matchAllData: any = [];
    includeData: any = [];
    currentStep = 3;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;

    data_in: any = []
    data_or_in: any = []
    data_not_in: any = []
    frmDetails!: FormGroup;

    standardCommonForm!: FormGroup;
    constructor(
        public config: ConfigService,
        public fileService: FilesService,
        private router: Router,
        private fb: FormBuilder,
    ) {
    }

    demoDataList = [
        {
            "id": 1,
            "service_name": "Career Transition",//must, required
            "word_type": "all",
            "selected": this.arrayMatch(1, 'selected'),
            "optional": this.arrayMatch(1,'optional'),
            "speciality": this.arrayMatch(1, 'speciality'),
        },
        {
            "id": 2,
            "service_name": "Certification Assessment",//exclude
            "word_type": "first",
            "selected": this.arrayMatch(2, 'selected'),
            "optional": this.arrayMatch(2, 'optional'),
            "speciality": this.arrayMatch(2, 'speciality'),
        },
        {
            "id": 3,
            "service_name": "Cover Letter Prep", //exclude
            "word_type": "first",
            "selected": this.arrayMatch(3, 'selected'),
            "optional": this.arrayMatch(3, 'optional'),
            "speciality": this.arrayMatch(3, 'speciality'),
        },
        {
            "id": 4,
            "service_name": "Education Coaching",//exclude
            "word_type": "first",
            "selected": this.arrayMatch(4, 'selected'),
            "optional": this.arrayMatch(4, 'optional'),
            "speciality": this.arrayMatch(4, 'speciality'),
        },
        {
            "id": 5,
            "service_name": "Employer Evaluation", //exclude
            "word_type": "first",
            "selected": this.arrayMatch(5, 'selected'),
            "optional": this.arrayMatch(5, 'optional'),
            "speciality": this.arrayMatch(5, 'speciality'),
        },
        {
            "id": 6,
            "service_name": "Executive Coaching", //exclude
            "word_type": "first",
            "selected": this.arrayMatch(6, 'selected'),
            "optional": this.arrayMatch(6, 'optional'),
            "speciality": this.arrayMatch(6, 'speciality'),
        },
        {
            "id": 7,
            "service_name": "Interview Coaching", //include, any
            "word_type": "any",
            "selected": this.arrayMatch(7, 'selected'),
            "optional": this.arrayMatch(7, 'optional'),
            "speciality": this.arrayMatch(7, 'speciality'),
        },
        {
            "id": 8,
            "service_name": "Job Match Strategy", //include, any
            "word_type": "any",
            "selected": this.arrayMatch(8, 'selected'),
            "optional": this.arrayMatch(8, 'optional'),
            "speciality": this.arrayMatch(8, 'speciality'),
        },
        {
            "id": 9,
            "service_name": "Job Tech Strategy", //include, any
            "word_type": "any",
            "selected": this.arrayMatch(9, 'selected'),
            "optional": this.arrayMatch(9, 'optional'),
            "speciality": this.arrayMatch(9, 'speciality'),
        },
        {
            "id": 10,
            "service_name": "Leadership Coaching", //include, any
            "word_type": "any",
            "selected": this.arrayMatch(10, 'selected'),
            "optional": this.arrayMatch(10, 'optional'),
            "speciality": this.arrayMatch(10, 'speciality'),
        },
        {
            "id": 11,
            "service_name": "Network Coaching", //include, any
            "word_type": "any",
            "selected": this.arrayMatch(11, 'selected'),
            "optional": this.arrayMatch(11, 'optional'),
            "speciality": this.arrayMatch(11, 'speciality'),
        },
        {
            "id": 12,
            "service_name": "Personal Branding",//include, any
            "word_type": "any",
            "selected": this.arrayMatch(12, 'selected'),
            "optional": this.arrayMatch(12, 'optional'),
            "speciality": this.arrayMatch(12, 'speciality'),
        },
        {
            "id": 13,
            "service_name": "Personality Assessment", //include, any
            "word_type": "any",
            "selected": this.arrayMatch(13, 'selected'),
            "optional": this.arrayMatch(13, 'optional'),
            "speciality": this.arrayMatch(13, 'speciality'),
        },
        {
            "id": 14,
            "service_name": "Profession Assessment", //must, required
            "word_type": "all",
            "selected": this.arrayMatch(14, 'selected'),
            "optional": this.arrayMatch(14, 'optional'),
            "speciality": this.arrayMatch(14, 'speciality'),
        },
        {
            "id": 15,
            "service_name": "Resume Development", //must, required
            "word_type": "all",
            "selected": this.arrayMatch(15, 'selected'),
            "optional": this.arrayMatch(15, 'optional'),
            "speciality": this.arrayMatch(15, 'speciality'),
        },
        {
            "id": 16,
            "service_name": "Salary Negotiation", //must, required
            "word_type": "all",
            "selected": this.arrayMatch(16, 'selected'),
            "optional": this.arrayMatch(16, 'optional'),
            "speciality": this.arrayMatch(16, 'speciality'),
        },
        {
            "id": 17,
            "service_name": "Skills Assessment", //must, required
            "word_type": "all",
            "selected": this.arrayMatch(17, 'selected'),
            "optional": this.arrayMatch(17, 'optional'),
            "speciality": this.arrayMatch(17, 'speciality'),
        },
        {
            "id": 18,
            "service_name": "Training Assessment",//must, required
            "word_type": "all",
            "selected": this.arrayMatch(18, 'selected'),
            "optional": this.arrayMatch(18, 'optional'),
            "speciality": this.arrayMatch(18, 'speciality'),
        },
    ]
    local_data_in:any;
    local_data_or_in:any;
    specialization:any;
    arrayMatch(cacheId: any, type: any) {
        if (type === 'selected') {
            this.local_data_in = localStorage.getItem('data_in');
            this.local_data_in = JSON.parse(this.local_data_in);
            if (this.local_data_in && this.local_data_in.length>0) {
                // @ts-ignore
                return this.local_data_in.some(code => code === ``+cacheId+``)
            } else {
                this.specialization = localStorage.getItem('specialization');
                this.specialization = JSON.parse(this.specialization);
                const checkIsArray =  Array.isArray(this.specialization);
                // @ts-ignore
                //find cacheId == key,id then push true
                return this.specialization.some(code => code.key === ``+cacheId+``)
            }
        } else if (type === 'optional') {
            this.local_data_or_in = localStorage.getItem('data_or_in');
            this.local_data_or_in = JSON.parse(this.local_data_or_in);
            if (this.local_data_or_in && this.local_data_or_in.length>0) {
                // @ts-ignore
                //find cacheId == key,id then push true
                return this.local_data_or_in.some(code => code === ``+cacheId+``)
            } else {
                return false
            }

        } else if (type === 'speciality') {
            this.local_data_in = localStorage.getItem('data_in');
            this.local_data_in = JSON.parse(this.local_data_in);
            if (this.local_data_in && this.local_data_in.length>0) {
                // @ts-ignore
                return this.local_data_in.some(code => code === ``+cacheId+``)
            } else {
                this.specialization = localStorage.getItem('specialization');
                this.specialization = JSON.parse(this.specialization);
                const checkIsArray =  Array.isArray(this.specialization);
                // @ts-ignore
                //find cacheId == key,id then push true
                return this.specialization.some(code => code.key === ``+cacheId+``)
            }
        }
    }
    ngOnInit(): void {
        this.searchType = localStorage.getItem('searchType');
        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;

        // localStorage.removeItem('data_not_in');
        // localStorage.removeItem('data_in');
        // localStorage.removeItem('data_or_in');

        this.excludeList = this.demoDataList;
        localStorage.setItem('demoDataList',JSON.stringify(this.demoDataList));

        // this.excludeList = this.demoDataList;
        if(this.excludeList.length){
            this.excludeList.forEach((x: { word_type: string; }) => {
                if (x.word_type == 'any') {
                    this.matchAny.push(x);
                } else if (x.word_type == 'all') {
                    this.matchAll.push(x);
                } else {
                    this.include.push(x);
                }
            });
            /* shorting all listing  */
            this.include = this.include.length ? this.listSort(this.include) : [];
            this.matchAny = this.matchAny.length ? this.listSort(this.matchAny) : [];
            this.matchAll = this.matchAll.length ? this.listSort(this.matchAll) : [];
        }

        this.frmDetails = this.fb.group({
            data_in: this.fb.array([]),
            data_or_in: this.fb.array([]),
            data_not_in: this.fb.array([]),
            // data_in:[""],
            // data_or_in:[""],
            // data_not_in: [""]
        });
        this.getExpertizeWithoutAuth();
        $( document ).ready(function() {
            $(".list-group-item").each(function (i: any, li: any) {
                var currentli = $(li);
                $(currentli).find("#optional").on('change', function () {
                    $(currentli).find("#required").not(i).prop('checked',false);
                });

                $(currentli).find("#required").on('change', function () {
                    $(currentli).find("#optional").not(i).prop('checked', false);
                });
            });
        });

        //Push existing specilization
        this.specialization = localStorage.getItem('specialization');
        this.specialization = JSON.parse(this.specialization);
        for (let i = 0; i < this.specialization.length; i++) {
            if (this.specialization[i]) {
                this.matchAllData.push(`${this.specialization[i]['key']}`);
            }
        }
    }

    listSort(list: any) {
        let Arr = [];
        // let select = [];
        for (let item of list) {
            Arr.push(item);
            // if (item.selected) {
            //   select.push(item)
            // }
        }
        Arr.sort((a, b) => {
            const nameA = a.service_name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.service_name.toUpperCase(); // ignore upper and lowercase
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });
        list = Arr;

        // for (let item of Arr) {
        //   list.push(item)
        //   for (let i of select) {
        //     if (item == i)
        //       list[list.length - 1].selected = true;
        //   }
        // }
        return list;
    }

    getExpertizeWithoutAuth() {
        this.allExpertiseDefault = this.demoDataList;
        this.isDataLoader = false;
        // this.fileService.getExpertiseWithoutAuth().then((res: any) => {
        //     if (res && res.status) {
        //         this.isDataLoader = false;
        //         // let data= res.data.data;
        //         // const unique = [...new Map(data.map((m: { service_name: any; }) => [m.service_name, m])).values()];
        //         // this.allExpertiseDefault = unique;
        //         let data= this.demoDataList;
        //         this.allExpertiseDefault = data
        //     }
        //     else {
        //         console.log('Err something went wrong');
        //     }
        // }).catch((err: any) => {
        //     console.log(err);
        // })
    }
    selector(event: any, e: any, type: number) {

        if (localStorage.getItem('data_or_in') !== null) {
            this.matchAnyData = localStorage.getItem('data_or_in');
            this.matchAnyData = JSON.parse(this.matchAnyData);
        }

        if (localStorage.getItem('data_in') !== null) {
            this.matchAllData = localStorage.getItem('data_in');
            this.matchAllData = JSON.parse(this.matchAllData);
        }

        if (type === 1) { //Excluded
            this.includeData.push(`${e.id}`);
        } else if (type === 2) { //Preferred, optional
            this.matchAnyData.push(`${e.id}`);
        } else if (type === 3) { //Required, speciality
            this.matchAllData.push(`${e.id}`);
        }
        //Check data

        // console.log(event.target.checked)
        // console.log(type);
        //
        if (event.target.checked && type === 2) {
            let i: number = 0;
            this.matchAllData.forEach((item: any) =>{
                if (item == event.target.value) {
                    // this.matchAllData.splice(item, 1);
                    //remove checked value from the matchAllData array
                    const indexToRemove = this.matchAllData.findIndex((item: any) => item === event.target.value);
                    if (indexToRemove !== -1) {
                        this.matchAllData.splice(indexToRemove, 1);
                    }
                    return;
                }
                i++;
            });
        } else if (!event.target.checked && type === 2) {
            let i: number = 0;
            this.matchAnyData.forEach((item: any) =>{
                if (item == event.target.value) {
                    // this.matchAnyData.splice(event.target.value, item);
                    //remove checked value from the matchAnyData array
                    const indexToRemove = this.matchAnyData.findIndex((item: any) => item === event.target.value);
                    if (indexToRemove !== -1) {
                        this.matchAnyData.splice(indexToRemove, 1);
                    }
                    return;
                }
                i++;
            });
        }
        //
        if (event.target.checked && type === 3) {
            let i: number = 0;
            this.matchAnyData.forEach((item: any) =>{
                if (item == event.target.value) {
                    // this.matchAnyData.splice(event.target.value, item);
                    //remove checked value from the matchAnyData array
                    const indexToRemove = this.matchAnyData.findIndex((item: any) => item === event.target.value);
                    if (indexToRemove !== -1) {
                        this.matchAnyData.splice(indexToRemove, 1);
                    }
                    return;
                }
                i++;
            });
        } else if (!event.target.checked && type === 3) {
            let i: number = 0;
            this.matchAllData.forEach((item: any) =>{
                if (item == event.target.value) {
                    // this.matchAnyData.splice(event.target.value, item);
                    //remove checked value from the matchAllData array
                    const indexToRemove = this.matchAllData.findIndex((item: any) => item === event.target.value);
                    if (indexToRemove !== -1) {
                        this.matchAllData.splice(indexToRemove, 1);
                    }
                    return;
                }
                i++;
            });
        }

        //removed duplicate from the matchAllData array
        this.matchAllData = this.matchAllData.filter((value:any, index:any, array:any) => array.indexOf(value) === index);
        //removed duplicate from the matchAnyData array
        this.matchAnyData = this.matchAnyData.filter((value:any, index:any, array:any) => array.indexOf(value) === index);
        // this.matchAllData = Array.from(new Set(this.matchAllData));

        //console.log(this.matchAnyData)
        // localStorage.setItem('matchAllData',JSON.stringify(this.matchAllData))
        // localStorage.setItem('matchAnyData',JSON.stringify(this.matchAnyData))
        // console.log(this.matchAnyData);
        // console.log(this.matchAllData);

        localStorage.setItem('data_not_in', JSON.stringify(this.includeData));
        localStorage.setItem('data_in', JSON.stringify(this.matchAllData));
        localStorage.setItem('data_or_in', JSON.stringify(this.matchAnyData));
    }

    selectorOLD(select: any, a: any) {
        switch (a) {
            case 4: {
                this.include = arr(this.allExpertiseDefault);
                break;
            }
            case 3: {
                this.matchAll = arr(this.allExpertiseDefault);
                break;
            }
            case 2: {
                this.matchAny = arr(this.allExpertiseDefault);
                break;
            }
            case 1: {
                this.include = arr(this.allExpertiseDefault);
                break;
            }
            case 0: {
                this.cars = arr(this.allExpertiseDefault);
                break
            }
        }
        function arr(array: any) {
            const index = array.indexOf(select);

            // console.log(array)
            if (array[index].selected) {
                array[index].selected = false;
            } else {
                array[index].selected = true;
            }
            // console.log(array);
            return array;
        }
        // this.btnDisable();
    }

    submitForm() {
        console.log(this.frmDetails.value);
        this.specialization = localStorage.getItem('specialization');
        this.specialization = JSON.parse(this.specialization);
        console.log(this.specialization)
        // console.log(this.include);
        // this.include.forEach((x: { id: number; }) => {
        //     this.includeData.push(`${x.id}`);
        // });
        //
        // this.matchAny.forEach((x: { id: number; }) => {
        //     this.matchAnyData.push(`${x.id}`);
        // });
        //
        if (this.matchAllData.length ===0) {
            this.specialization.forEach((x: { key: number; }) => {
                this.matchAllData.push(`${x.key}`);
            });
        }

        //Data not In
        this.includeData = ["128"];

        //Data Or In
        if (localStorage.getItem('data_or_in') !== null) {
            this.matchAnyData = localStorage.getItem('data_or_in')
            this.matchAnyData = JSON.parse(this.matchAnyData);
            //remove 128 value from the matchAnyData array
            const indexToRemoveValue = this.matchAnyData.findIndex((item: any) => item === "128");
            if (indexToRemoveValue !== -1) {
                this.matchAnyData.splice(indexToRemoveValue, 1);
            }
        }
        if (this.matchAnyData.length==0) {
            this.matchAnyData = ["128"];
        }

        //Data In
        if (localStorage.getItem('data_in') !== null) {
            this.matchAllData = localStorage.getItem('data_in')
            this.matchAllData = JSON.parse(this.matchAllData);
        }
        console.log('data_not_in => ', this.includeData);//exclude, data_not_in
        console.log('data_in => ', this.matchAllData);//preferred, speciality, data_in
        console.log('data_or_in => ', this.matchAnyData); //required, optional, data_or_in
        localStorage.setItem('data_not_in', JSON.stringify(this.includeData));
        localStorage.setItem('data_in', JSON.stringify(this.matchAllData));
        localStorage.setItem('data_or_in', JSON.stringify(this.matchAnyData));
        this.router.navigate(['/career-professional-additional']);
    }

    //On scroll to fixed thead and add class
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        this.isSticky = window.pageYOffset >= 200;
    }
}
