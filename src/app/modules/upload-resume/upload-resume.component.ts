import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {ActivatedRoute, Router} from "@angular/router"
import {GovtMatchApp} from 'src/app/core/services/govt-match-app.service';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-upload-resume',
    templateUrl: './upload-resume.component.html',
    styleUrls: ['./upload-resume.component.scss'],
    providers: [ToastrService]
})
export class UploadResumeComponent implements OnInit {

    searchType: any = [];
    headings: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    currentStep = 1;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;

    constructor(
        public config: ConfigService,
        private router: Router,
        private govtMatchApp: GovtMatchApp,
        private _activatedRoute: ActivatedRoute,
        public toast: ToastrService,
    ) { }

    ngOnInit(): void {
        this.searchType = localStorage.getItem('searchType');
        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.searchTypeParams = String(routeParams.get('searchType'));
        if (this.searchTypeParams === 'null') {
            this.router.navigate(['/'])
        }
        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;
        if (this.searchType === null) {
            this.router.navigate(['/']);
        }
        if (this.searchType === 'freeGovt') {
            this.currentStep = 1;
            this.maxStep = 6;
            this.progress = (this.currentStep/this.maxStep)*100;
            this.progress = Math.round(this.progress);
        } else {
            this.progress = Math.round(this.progress);
        }
    }

    showPrivateForm: any = false;
    isfileUploading = false;
    isfileUploadingText = 'Click Here';
    excludeList: any = [];
    include: any = [];
    matchAny: any = [];
    matchAll: any = [];
    match_id: any;
    searchTypeParams: any;
    isLoader: boolean = false;

    demoDataList = [
        {
            "word": "Budgeting",
            "word_type": "any"
        },
        {
            "word": "Data",
            "word_type": "any"
        },
        {
            "word": "Finance",
            "word_type": "any"
        },
        {
            "word": "Insurance",
            "word_type": "any"
        },
        {
            "word": "Investments",
            "word_type": "any"
        },
        {
            "word": "Management",
            "word_type": "any"
        },
        {
            "word": "Outsourcing",
            "word_type": "any"
        },
        {
            "word": "Project Manager",
            "word_type": "any"
        },
        {
            "word": "Python",
            "word_type": "any"
        },
        {
            "word": "modular",
            "word_type": "any"
        },
        {
            "word": "mongodb",
            "word_type": "any"
        },
        {
            "word": "debugging",
            "word_type": "any"
        },
        {
            "word": "CPA",
            "word_type": "all"
        },
        {
            "word": "Leadership",
            "word_type": "all"
        },
        {
            "word": "Teamwork",
            "word_type": "all"
        },
        {
            "word": "Venture Capital",
            "word_type": "all"
        },
        {
            "word": "Harvard University",
        },
        {
            "word": "Hiking",
        },
        {
            "word": "Painting",
        },
        {
            "word": "Photography",
        },
        {
            "word": "Traveling",
        },
        {
            "word": "Web Search",
        }
    ]

    fileUploadDemo() {
        this.isLoader = true;
        // this.federalJobHeading = 'Both Match - Interactive Demo';
        // this.federalJobSubHeading = 'Identity Protected Matching';
        // document.querySelector(".checkbox-list")?.classList.remove('disable-upload');
        // document.querySelector(".main-content-upload")?.classList.remove('disable-upload');
        let elements = document.querySelectorAll('.after-upload');
        for (let index = 0; index < elements.length; index++) {
            elements[index]?.classList.add('hidden');
        }
        localStorage.setItem('searchType', 'free');
        this.resetKewordsData();
        this.showPrivateForm = false;
        this.isfileUploading = true;
        this.isfileUploadingText = 'Please wait...';
        this.excludeList = this.demoDataList
        setTimeout(() => {
            //set dummy match_id
            localStorage.setItem('match_id', '32');

            this.setKewordsData();
            this.isfileUploading = false;
            // change tab after the list is added
            this.isLoader = false;
            this.router.navigate(['/review-edit'])
            //this.tabChange(1);
            for (let index = 0; index < elements.length; index++) {
                elements[index]?.classList.remove('hidden');
            }
        }, 1000);
    }

    // EMPTY THE STEP 2 ARRAYS
    resetKewordsData() {
        this.include = [];
        this.matchAny = [];
        this.matchAll = [];
    }

    setKewordsData() {
        //{ORIGINAL ARRAY}//
        // this.include.push({ name: '123 Any Address' }, { name: 'Fishing' }, { name: 'Harvard University' }, { name: 'Hiking' }, { name: 'Jane Doe' }, { name: 'jane-doe.com' }, { name: 'joedoe@gmail.com' }, { name: 'LinkedIn.com/janedoe' }, { name: 'Painting' }, { name: 'Photography' }, { name: 'Traveling' }
        //       , { name: 'Traveling' }, { name: 'Analysis' }, { name: 'CPA' }, { name: 'Insurance' }, { name: 'Investments' }, { name: 'Leadership' }, { name: 'Management' }, { name: 'Microsoft Access' }, { name: 'Outsourcing' }, { name: 'Project Manager' }, { name: 'Python' });
        //         this.include = this.listSort(this.include)

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
        return list;
    }

    fileUpload(event: any, str = null) {
        this.isLoader = true;
        this.resetKewordsData();
        let elements = document.querySelectorAll('.after-upload');
        for (let index = 0; index < elements.length; index++) {
            elements[index]?.classList.add('hidden');
        }
        if (event.target.files.length != 0) {
            var ext = event.target.files[0].name.split('.').pop();
            if (ext == 'pdf' || ext == 'docx' || ext == 'doc') {
                this.isfileUploading = true;
                this.isLoader = true;
                var formData: any = new FormData();
                if (this.config.environmentSetup === 'production') {
                    // formData.append('fileName', event.target.files[0].name);
                    formData.append('doc_file', event.target.files[0]);
                } else {
                    formData.append('fileName', event.target.files[0].name);
                    formData.append('docfile', event.target.files[0]);
                }

                this.govtMatchApp.resumeUpload(formData).then((res: any) => {
                    if (res) {
                        // console.log(res);
                        if (res.status === true) {
                            this.match_id = res.data.match_id;
                            localStorage.setItem('match_id', JSON.stringify(this.match_id));
                            this.isfileUploading =  (res.status || res.status) ? true : false
                            if (this.match_id) {
                                this.govtMatchApp
                                    .getReviewWords({ match_id: this.match_id })
                                    .then((res: any) => {
                                        if (res) {
                                            this.excludeList = res.data.all_words;
                                            localStorage.setItem('excludeList', JSON.stringify(this.excludeList));
                                            this.setKewordsData();
                                            // change tab after the list is added
                                            this.router.navigate(['/login','jobApply']);
                                            // this.tabChange(1);
                                            // document.querySelector(".after-upload")?.classList.remove("hidden");
                                            for (let index = 0; index < elements.length; index++) {
                                                elements[index]?.classList.remove('hidden');
                                            }
                                            // this.isfileUploading = false
                                        }
                                    });
                            }
                        } else {
                            this.isfileUploading = false;
                            this.isLoader = false;
                            let elements = document.querySelectorAll('.after-upload');
                            for (let index = 0; index < elements.length; index++) {
                                elements[index]?.classList.remove('hidden');
                            }
                            this.toast.error(res.message,'',{timeOut: 5000,});
                        }
                    }
                    this.isLoader = false;
                });


                // setTimeout(() => {
                // this.setKewordsData();
                // this.isfileUploading = false;
                // // change tab after the list is added
                // this.tabChange(1);
                // // document.querySelector(".after-upload")?.classList.remove("hidden");
                // for (let index = 0; index < elements.length; index++) {
                //   elements[index]?.classList.remove("hidden");
                // }
                // }, 1000)
            } else {
                alert('Please upload pdf, doc or docx file');
            }
        } else {
            alert('Please upload pdf, doc or docx file');
        }

        // let file = event.target.files[0];
        // if (file) {
        //     const formData = new FormData();
        //     formData.append('docfile', file);
        //     formData.append('fileName', file?.name);
        //     this.fileService.resumeUpload(formData).then((res: any) => {
        //
        //   }).catch((err: any) => {
        //     console.log(err);
        //
        //   })
        // }
    }

}
