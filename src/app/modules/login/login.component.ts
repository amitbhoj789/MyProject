import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import { CapchaVerifyService } from 'src/app/core/services/capcha-verify.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CustomValidators } from 'src/app/core/services/CustomValidators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

// import { CapchaVerifyService } from 'src/app/core/services/capcha-verify.service';
import { FunctionService } from 'src/app/core/services/function.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FilesService} from "../../core/services/files.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ToastrService]
})
export class LoginComponent implements OnInit, OnChanges {
    siteKey: any;
    loginform!: FormGroup;
    isInvalid: boolean = false;
    isUserVerify: boolean = false;
    loginCheck: boolean = true;
    resgisterCheck: boolean = false;
    isLoader: boolean = false;
    searchType: any = [];
    headings: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    currentStep = 1;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;
    loginToken: any;
    isLoggedIn: any;
    loginType: any;
    actionButton: string = 'Next';
    @ViewChild('reUser', { static: true }) userEle: ElementRef | undefined;
    @Input() userData: any;
    @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef | undefined;

    images = [];
    imageData: any = [];
    isUserDataLoader: boolean = true;
    constructor(
        private fb: FormBuilder,
        public captcha: CapchaVerifyService,
        public config: ConfigService,
        private reCaptchaV3Service: ReCaptchaV3Service,
        public auth: AuthService,
        public fun: FunctionService,
        private router: Router,
        private toast: ToastrService,
        private _activatedRoute: ActivatedRoute,
        public fileService: FilesService
    ) {
        this.siteKey = config.siteKey;
    }

    ngOnInit(): void {
        localStorage.removeItem('emailOtp');
        this.loginToken = localStorage.getItem('loginToken');
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.loginType = String(routeParams.get('loginType'));

        // this.formData();
        this.loginform = this.fb.group({
            fullname: [''],
            // email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[-.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
            email: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                CustomValidators.patternValidator(
                    /[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/,
                    { hasSpecialCharacters: true }
                ),
            ]],
            user_type: ['jobrep', Validators.required],
            recaptcha: ['', ],
        });

        this.searchType = localStorage.getItem('searchType');
        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;

        if (this.isLoggedIn && this.loginToken !=='' && this.loginType === 'jobApply' && this.searchType === 'freeGovt') {
            this.router.navigate(['/review-edit']);
        }

        if (this.isLoggedIn && this.loginToken !=='' && this.searchType !== 'freeGovt' && this.loginType === 'jobReps') {
            this.router.navigate(['/profile-update']);
        }

        if (this.loginType === 'jobReps') {
            this.currentStep = 1;
            this.maxStep = 3;
            this.progress = (this.currentStep/this.maxStep)*100;
            this.progress = Math.round(this.progress);
        }

        if (this.loginType === 'jobApply') {
            this.currentStep = 2;
            this.maxStep = 6;
            this.progress = (this.currentStep/this.maxStep)*100;
            this.progress = Math.round(this.progress);
        }

        this.imageData = localStorage.getItem('imageData');
        this.imageData = JSON.parse(this.imageData);
        if (!this.imageData) {
            if (this.loginType !== 'jobApply') {
                this.getApprovedUsers();
            }
        } else {
            this.isLoader = false;
        }
    }

    conditionallyRequiredValidator(masterControlLabel: string, operator: string, conditionalValue: any, slaveControlLabel: string) {
        return (group: FormGroup): { [p: string]: any } | null => {
            const masterControl = group.controls[masterControlLabel];
            const slaveControl = group.controls[slaveControlLabel];
            if (Function(`"use strict"; return '${masterControl.value}' ${operator} '${conditionalValue}'`)()) {
                return Validators.required(slaveControl)
            }
            slaveControl.setErrors(null);
            return null;
        }
    }

    formData() {
        // this.loginform.controls["fullname"].addValidators([Validators.required]);
    }

    get getControls() {
        return this.loginform.controls;
    }

    checkEmailExistInterval() {
        var timesRun = 0;
        var interval = setInterval(() =>{
            timesRun += 1;
            if(timesRun === 6){
                clearInterval(interval);
            }
            //do whatever here..
            let email = this.loginform.value.email;
            let expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (expr.test(email)) {
                let value = {email: this.loginform.value.email}
                this.auth.userExitOrNot(value).then((res:any)=>{
                    if(res && res.status){
                        this.loginCheck = res.status
                        this.resgisterCheck = false;
                        this.actionButton = 'Login'
                    } else{
                        this.formData();
                        this.resgisterCheck = true;
                        this.actionButton = 'Register'
                        this.loginCheck = res.status;
                    }
                });
            }
        }, 1000);
    }

    keyPress(event: KeyboardEvent) {
        let value = (<HTMLInputElement>event.target).value;
        let expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!expr.test(value)) {

        } else {
            this.checkEmailExistInterval()
            this.loginform.patchValue({email: value});
            if(
                this.loginform &&
                this.loginform.controls &&
                this.loginform.controls['email'] &&
                this.loginform.controls['email'].valid
            ){
                let value = {email: this.loginform.value.email}
                if(value){
                    this.isLoader = true;
                    this.auth.userExitOrNot(value).then((res:any)=>{
                        if(res && res.status){
                            this.loginCheck = res.status
                            this.resgisterCheck = false;
                            this.actionButton = 'Login'
                            this.isLoader = false;
                        } else{
                            this.formData();
                            this.resgisterCheck = true;
                            this.actionButton = 'Register'
                            this.loginCheck = res.status;
                            this.isLoader = false;
                        }
                        event.preventDefault();
                    }).catch(err =>{
                        this.resgisterCheck = false;
                        this.actionButton = 'Next'
                        this.loginCheck = false;
                        this.isLoader = false;
                        console.log('Erro => ', err);
                    })
                } else {
                    this.actionButton = 'Next'
                }
            }
        }
    }

    ngOnChanges(changes: any = this.userData): void {
        this.isUserVerify ? this.fun.userData = changes.userData.currentValue : " "
    }

    submitLogin() {
        // if (!this.resgisterCheck) {
        //     this.loginform.controls['fullname'].clearValidators(); // 6. Clear All Validators
        //     this.loginform.controls['fullname'].updateValueAndValidity(); // 6. Clear All Validators
        // }
        // console.log(this.resgisterCheck);
        // console.log(this.loginform);
        this.isInvalid = this.loginform.invalid;
        this.isLoader = true;
        this.loginform.markAllAsTouched();
        if (!this.isInvalid) {
            // this.isRegisterLoader = false;
            // this.isLoader = true;
            // if (this.loginCheck) {
                this.auth
                    .userLogin(this.loginform.value)
                    .then((res: any) => {
                        if (res && res.status) {
                            //this.isLoader = false;
                            // this.isRegisterLoader = false;
                            // this.isLoader = false;
                            this.isUserVerify = true
                            // this.otpForm.patchValue({emailOtp: res.data.userDetails.email});
                            localStorage.setItem('emailOtp', res.data.userDetails.email);
                            localStorage.setItem('loginEmail', res.data.userDetails.email);
                            this.router.navigate(['/otp',this.loginType]);

                            // this.toast.success(`${res.message}`);
                            //window['grecaptcha'].reset();
                            // if(this.userEle.nativeElement.innerHTML == ''){
                            //     this.captcha.addRecaptchaScript(this.userEle.nativeElement);
                            // }
                            // this.captcha.verifyCaptcha = null
                        } else if (res && res.message === 'User does not exists') {
                            // if (res) {
                                this.auth.userRegister(this.loginform.value)
                                    .then((user: any) => {
                                        if (user && user.status) {
                                           // this.isLoader = false;
                                            this.isUserVerify = true
                                            localStorage.setItem('emailOtp', this.loginform.value.email);
                                            this.router.navigate(['/otp',this.loginType]);
                                            // this.otpForm.patchValue({emailOtp: this.loginform.value.email})
                                            this.captcha.verifyCaptcha = null
                                            this.toast.success(`${user.message}`);
                                        } else {
                                            this.isLoader = false;
                                            // this.isRegisterLoader = false;
                                            this.toast.error('Unknown Error');
                                        }
                                    })
                                    .catch((err: any) => {
                                        this.isLoader = false;
                                        // this.isRegisterLoader = false;
                                        console.log('err => ', err);
                                        this.toast.error(err.message);
                                    });
                            // }
                        } else {
                            this.isLoader = false;
                            this.toast.error(res.message);
                            // this.toast.error(res.message);
                            // this.isRegisterLoader = false;
                            // this.isLoader = false;
                        }
                    })
                    .catch((err: any) => {
                        this.toast.error( err.message);
                        // this.toast.error(err.message);
                        // this.isRegisterLoader = false;
                        // this.isLoader = false;
                        this.isLoader = false;
                    });
            // } else {
            //     this.toast.error( 'Verify captcha is required');
            //     // this.toast.error('Verify captcha is required');
            //     // this.isLoader = false;
            //     this.isLoader = false;
            // }
        } else {
            this.isLoader = false;
        }
    }

    getApprovedUsers() {
        let arrData: any[] = []
        this.fileService.getAllUsers().then((res: any) => {
            if (res && res.status) {
                let resData = res.data.data;
                if(resData && resData.length > 0){
                    this.isUserDataLoader = false;
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
                this.isUserDataLoader = false;
            } else {
                this.isUserDataLoader = false;
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
