import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { CapchaVerifyService } from 'src/app/core/services/capcha-verify.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
    providers: [ToastrService]
})
export class OtpComponent implements OnInit {

    emailOtp: any;
    siteKey: any;
    isLoader: boolean = false;
    isResendLoader: boolean = false;
    otpForm!: FormGroup;
    isUserVerify: boolean = false;
    isInvalid: boolean = false;
    searchType: any = [];
    loginToken: any;
    isLoggedIn: any;
    loginType: any;
    currentStep = 2;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;
    resentForm!: FormGroup;
    @ViewChild('recaptcha', {static: true}) recaptchaElement: ElementRef | undefined;

    constructor(
        private fb: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        public config: ConfigService,
        public auth: AuthService,
        public fun: FunctionService,
        public captcha: CapchaVerifyService,
        private router: Router,
        private toast: ToastrService
    ) {
        this.siteKey = config.siteKey;
    }

    ngOnInit(): void {
        this.emailOtp = localStorage.getItem('emailOtp');
        this.searchType = localStorage.getItem('searchType');
        this.loginToken = localStorage.getItem('loginToken');
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.loginType = String(routeParams.get('loginType'));
        localStorage.setItem('loginType',this.loginType);

        if (this.emailOtp === 'null' || this.emailOtp === null) {
            this.router.navigate(['/login']);
        }

        if (this.isLoggedIn && this.loginToken !=='' || this.loginType === null) {
            this.router.navigate(['/']);
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

        //Forgot Password
        if (this.loginType === 'forgotPassword') {

        }
        // @ts-ignore
        // this.captcha.addRecaptchaScript(this.recaptchaElement.nativeElement);
        this.resendData()
        this.otpForm = this.fb.group({
            emailOtp: [this.emailOtp, [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
            otp: ['', Validators.required],
            recaptcha: ['', ],
        });

        this.patchLoginData()
    }
    get getControls() {
        return this.otpForm.controls;
    }

    verifyOtp() {
        this.isInvalid = this.otpForm.invalid;
        this.isLoader = true;
        this.otpForm.markAllAsTouched();
        if (this.otpForm.valid) {
            // if (this.captcha.verifyCaptcha != null) {
                this.auth.verifyOtp(this.otpForm.value).then((res: any) => {
                    if (res && res.status) {
                        this.fun.checkToken = res.status;
                        this.fun.isLoggedIn = true;
                        this.patchLoginData()
                        this.auth.setUserToken(res.data.loginToken, res.status);
                        this.fun.loginToken = res.data.loginToken;
                        localStorage.setItem('loginEmail', this.otpForm.value.emailOtp);
                        if (this.searchType === 'freeGovt') {
                            this.router.navigate(['/review-edit']);
                        } else {
                            if (localStorage.getItem('loginEmail') === this.config.adminEmail || localStorage.getItem('loginEmail') === this.config.testingEmail) {
                                this.router.navigate(['/admin/dashboard']);
                            } else {
                                this.router.navigate(['/profile-update']);
                            }
                        }

                        // this.changeTab.emit(1);
                        this.isUserVerify = false
                        this.captcha.verifyCaptcha = null
                        this.otpForm.reset();
                        this.isLoader = false;
                    } else {
                        this.toast.error(res.message);
                        this.isLoader = false;
                        //console.log(res.message);
                    }
                }).catch((err: any) => {
                    console.log('err => ', err);
                    this.toast.error(err.message);
                    this.isLoader = false;
                    this.fun.checkToken = false;
                });
            // } else {
            //     this.isLoader = false;
            //     this.fun.checkToken = false;
            //     //this.toast.error('Verify captcha is required');
            //     console.log('Verify captcha is required')
            // }
        } else {
            this.isLoader = false;
            this.fun.checkToken = false;
        }
    }

    patchLoginData() {
        try {
            this.fun.getUserData().then((res: any) => {
                if (res) {
                    // console.log(res);
                    // this.Loginform.get('email').setValue(res.email);
                    // this.Loginform.get('password').setValue('Q****1**f');
                    // this.Loginform.get('fullname').setValue(res.name);
                }
            }).catch(err => {
                console.log("eee => ", err);
            })
        } catch (e) {

        }
    }

    resendData() {
        this.resentForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
        });
    }

    resendOtp() {
        this.isResendLoader = true
        this.resentForm.patchValue({email: this.otpForm.value.emailOtp})
        this.otpForm.patchValue({otp: ''});
        if (this.resentForm.valid) {
            this.auth.resendOtpPass(this.resentForm.value).then((res: any) => {
                this.isResendLoader = false;
                if (res && res.status) {
                    this.toast.success('We have sent you again verification email.')
                } else {
                    this.toast.error(res.message);
                    this.isResendLoader = false;
                }
            }).catch((err: any) => {
                console.log('err => ', err);
                this.isResendLoader = false;
                this.toast.error(err.message);
            });
        } else {
            this.toast.error('Email is required*')
        }
    }
}
