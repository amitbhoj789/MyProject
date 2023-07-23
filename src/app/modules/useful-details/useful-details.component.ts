import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, Output, EventEmitter} from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import {ContactFormService} from "../../core/services/contact-form.service";
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-useful-details',
    templateUrl: './useful-details.component.html',
    styleUrls: ['./useful-details.component.scss'],
    providers: [NgForm]
})
export class UsefulDetailsComponent implements OnInit {
    @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef | undefined;
    @Input() useFulLinks: any;
    @Input() helpCenterBlock: any;
    @Input() isFaqVisible: any;
    @Input() isJobseekerVisible: any;
    @Input() isCommunityVisible: any;


    @Output() messageEvent = new EventEmitter();
    @Output() messageEventFaq = new EventEmitter();
    @Output() messageEventJobSeeker = new EventEmitter();
    @Output() messageEventCommunity = new EventEmitter();

    aboutTabIndex = 0;
    linksTabIndex = 0;
    aboutTab: boolean = true;
    helpCenterTab: boolean = false;
    matchVsSearchTab: boolean = false;
    pressCornerTab: boolean = false;
    privacyPolicyTab: boolean = false;
    termsConditionsTab: boolean = false;
    isSearchMatchVisible: boolean = true;
    isArtificialVisible: boolean = false;
    matchingTabIndex: number = 0;
    artificialIntelligence: boolean = false;


    // isJobseekerVisible: boolean = false;
    // isFaqVisible: boolean = false;
    youtubeVideoLink: any = 'https://jobrep.com/spaces/9236453/page'

    isLoader: boolean = false;
    siteKey: any;
    isInvalid: boolean = false;
    loginform!: FormGroup;
    constructor(
        private fb: FormBuilder,
        public config: ConfigService,
        public NgForm: NgForm,
        private _contactService: ContactFormService,
        public sanitizer: DomSanitizer,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.siteKey = config.siteKey;
    }

    customOptions: OwlOptions = {
        loop: true,
        autoplay:true,
        stagePadding: 70,
        autoplayTimeout:5000,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: true,
        margin:35,
        navSpeed: 700,
        responsive: {
            0: {
                items: 1
            }, 
        },
        nav: false
    }


    ngOnInit(): void {
        // console.log(this.useFulLinks)
        this.loginform = this.fb.group({
            first_name: ['',Validators.required],
            last_name: [''],
            email: ['',Validators.required],
            comment: ['',Validators.required],
            recaptcha: ['', ],
        });
        //this.onSubmit(this.NgForm);

        this._activatedRoute.queryParams.subscribe(params => {
            this.isJobseekerVisible = params['isJobseekerVisible'];
            if (params['isJobseekerVisible']) {
                this.helpCenterBlock = false
            }

            this.helpCenterBlock = params['helpCenterBlock'];
            if (params['helpCenterBlock']) {
                this.helpCenterBlock = true
            }

            this.artificialIntelligence = params['artificialIntelligence'];
            if (params['artificialIntelligence']) {
                this.matchingTabIndex = 1;
                this.isArtificialVisible = true;
                this.isSearchMatchVisible = false;
            }
        });
    }

    getLink(){
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeVideoLink);
    }

    ngOnDestroy() {
        // console.log('ngOnDestroy');
    }

    showFaq() {
        this.isFaqVisible = true;
        this.helpCenterBlock = false;
        this.messageEvent.emit(false);
        this.messageEventCommunity.emit(false);
        this.messageEventFaq.emit(true);
    }
    showJobseeker(){
        this.isJobseekerVisible = true;
        this.helpCenterBlock = false;
        this.messageEvent.emit(false);
        this.messageEventCommunity.emit(false);
        this.messageEventJobSeeker.emit(true);
    }
    showCommunity(){
        this.isCommunityVisible = true;
        this.helpCenterBlock = false;
        this.messageEvent.emit(false);
        this.messageEventJobSeeker.emit(false);
        this.messageEventCommunity.emit(true);
    }

    showArtificialMatch(index:any){
        if(index === 0){
            this.isSearchMatchVisible = true;
            this.isArtificialVisible = false;
            this.matchingTabIndex = 0;
        }
        else if(index === 1){
            this.isSearchMatchVisible = false;
            this.isArtificialVisible = true;
            this.matchingTabIndex = 1;
        }
        else{
            this.isSearchMatchVisible = true;
            this.isArtificialVisible = false;
            this.matchingTabIndex = 0;
        }
    }

    get getControls() {
        return this.loginform.controls;
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => {
            window.scrollTo(0, 45);
        },1);
        // console.log(this.useFulLinks)

        if (this.useFulLinks === 0) {
            this.useFulLinks = 0;
            this.linksTabIndex = 0;
            this.aboutTab = true;
            this.helpCenterTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
            //this.isFaqVisible = false;

        } else if (this.useFulLinks === 1) {
            this.useFulLinks = 1;
            this.linksTabIndex = 1;
            this.aboutTab = false;
            this.helpCenterTab = true;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
            //this.isFaqVisible = true;

        } else if (this.useFulLinks === 2) {
            this.useFulLinks = 2;
            this.linksTabIndex = 2;
            this.aboutTab = false;
            this.helpCenterTab = false;
            this.matchVsSearchTab = true;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
           // this.isFaqVisible = false;

        }  else if (this.useFulLinks === 3) {
            this.useFulLinks = 3;
            this.linksTabIndex = 3;
            this.aboutTab = false;
            this.helpCenterTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = true;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
            //this.isFaqVisible = false;

        }  else if (this.useFulLinks === 4) {
            this.useFulLinks = 4;
            this.linksTabIndex = 4;
            this.aboutTab = false;
            this.helpCenterTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = true;
            this.termsConditionsTab = false;
            //this.isFaqVisible = false;

        }  else if (this.useFulLinks === 5) {
            this.useFulLinks = 5;
            this.linksTabIndex = 5;
            this.aboutTab = false;
            this.helpCenterTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = true;
            //this.isFaqVisible = false;

        } else {
            this.useFulLinks = 0;
            this.linksTabIndex = 0;
            this.aboutTab = true;
            this.helpCenterTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
           // this.isFaqVisible = false;
        }
        // console.log(this.isFaqVisible)
    }

    submitForm(FormData: any) {
        this.isInvalid = this.loginform.invalid;
        this.isLoader = true;
        this.loginform.markAllAsTouched();
        if (!this.isInvalid) {
            this._contactService.PostMessage(FormData)
                .subscribe(response => {
                    //location.href = 'https://mailthis.to/confirm'
                    //console.log(response)
                }, error => {
                    console.warn(error.responseText)
                    console.log({ error })
                })
        }  else {
            console.log('invalid form control');
            this.isLoader = false;
        }
    }

    faqTabs(index:any) {
        if (index == 0) { //FAQ's
            this.isFaqVisible = true;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;
        } else if (index == 1) { // Job Seekers
            this.isFaqVisible = false;
            this.isJobseekerVisible = true;
            this.isCommunityVisible = false;
        } else if (index == 2) { //community
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = true;
        }
    }

    linksTabChange(index: number): void {
        if (index === 0) {
            this.aboutTabIndex = 0;
        } else if (index === 1) {
            this.aboutTabIndex = 1;
        } else {
            this.aboutTabIndex = 0;
        }
    }
}
