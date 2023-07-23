import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ConfigService} from "../../core/config.service";
import { GovtMatchApp } from 'src/app/core/services/govt-match-app.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-review-edit',
    templateUrl: './review-edit.component.html',
    styleUrls: ['./review-edit.component.scss']
})
export class ReviewEditComponent implements OnInit {

    emailOtp: any = [];
    include: any = [];
    searchType: any = [];
    excludeList: any = [];
    matchAny: any = [];
    matchAll: any = [];
    isInvalid: boolean = false;
    isStep3Loading : boolean = false
    match_id: number | undefined;
    headings: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    frmDetails!: FormGroup;
    currentStep = 2;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;

    constructor(
        public config: ConfigService,
        private fb: FormBuilder,
        private govtMatchApp: GovtMatchApp,
        private router: Router,
    ) {
    }

    demoDataList = [
        {
            "id": 1,
            "word": "Accounting",
            "word_type": "all",
            "required" : true
        },
        {
            "id": 2,
            "word": "Analysis",
            "word_type": "any",
            "preferred" : true
        },
        {
            "id": 3,
            "word": "Any College",
            "excluded": true,
        },
        {
            "id": 4,
            "word": "Budgeting",
            "word_type": "any",
            "preferred" : true
        },
        {
            "id": 5,
            "word": "Communication",
            "word_type": "any",
            "preferred" : true
        },
        {
            "id": 6,
            "word": "CPA",
            "word_type": "all",
            "required" : true
        },
        {
            "id": 7,
            "word": "Finance",
            "word_type": "any",
            "preferred" : true
        },
        {
            "id": 8,
            "word": "Hiking",
            "excluded": true,
        },
        {
            "id": 9,
            "word": "Investment",
            "word_type": "any",
            "preferred" : true
        },
        {
            "id": 10,
            "word": "Leadership",
            "word_type": "all",
            "required" : true
        },
        {
            "id": 11,
            "word": "Management",
            "word_type": "any",
            "preferred" : true
        },
        {
            "id": 12,
            "word": "Photography",
            "excluded": true,
        },
        {
            "id": 13,
            "word": "Project Manager",
            "word_type": "any",
            "preferred" : true
        },
        {
            "id": 14,
            "word": "Teamwork",
            "word_type": "any",
            "preferred" : true
        },
        {
            "id": 15,
            "word": "Traveling",
            "excluded": true,
        },
        {
            "id": 16,
            "word": "Venture Capital",
            "word_type": "all",
            "required" : true
        }
    ]

    ngOnInit(): void {
        localStorage.removeItem('additionalInput');
        this.searchType = localStorage.getItem('searchType');
        this.emailOtp = localStorage.getItem('emailOtp');
        if (this.searchType === 'free') {
            this.excludeList = this.demoDataList;

        } else {
            this.excludeList = localStorage.getItem('excludeList');
            this.excludeList = JSON.parse(this.excludeList);
        }

        if (this.searchType === 'freeGovt') {
            this.maxStep = 6;
            this.currentStep = 3;
            this.progress = (this.currentStep/this.maxStep)*100;
            this.progress = Math.round(this.progress);
        } else {
            this.progress = Math.round(this.progress);
        }

        // this.excludeList = this.demoDataList;
        if(this.excludeList.length){
            this.excludeList.forEach((x: { word_type: string; }) => {
                if (this.searchType === 'free') {
                    this.matchAll.push(x);
                } else {
                    if (x.word_type == 'any') {
                        this.matchAny.push(x);
                    } else if (x.word_type == 'all') {
                        this.matchAll.push(x);
                    } else {
                        this.include.push(x);
                    }
                }

            });
            /* shorting all listing  */
            this.include = this.include.length ? this.listSort(this.include) : [];
            this.matchAny = this.matchAny.length ? this.listSort(this.matchAny) : [];
            this.matchAll = this.matchAll.length ? this.listSort(this.matchAll) : [];
        }

        this.frmDetails = this.fb.group({

        });

        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;
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
            const nameA = a.word.toUpperCase(); // ignore upper and lowercase
            const nameB = b.word.toUpperCase(); // ignore upper and lowercase
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

    submitForm() {
        this.isStep3Loading = true
        if (this.matchAny[0] || this.matchAll[0]) {
            // this.tabIndex = index;
        }
        else if ( (localStorage.getItem('searchType') == null || localStorage.getItem('searchType') == 'free') ) {
            // this.showDemo = true;
            this.frmDetails.reset()
            // this.setDemoData();
            // this.tabIndex = index;
        }
        // this.showPaymentDiv = false;
        this.router.navigate(['/additional-input']);
    }

    selector(select: any, a: any) {
        switch (a) {
            case 4: {
                this.include = arr(this.include);
                break;
            }
            case 3: {
                this.matchAll = arr(this.matchAll);
                break;
            }
            case 2: {
                this.matchAny = arr(this.matchAny);
                break;
            }
            case 1: {
                this.include = arr(this.include);
                break;
            }
        }
        function arr(array: any) {
            const index = array.indexOf(select);
            if (array[index].selected) {
                array[index].selected = false;
            } else {
                array[index].selected = true;
            }
            return array;
        }
    }

    //On scroll to fixed thead and add class
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        this.isSticky = window.pageYOffset >= 200;
    }
}
