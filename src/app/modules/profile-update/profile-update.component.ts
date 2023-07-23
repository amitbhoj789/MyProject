import { Component, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ConfigService} from "../../core/config.service";
import {FunctionService} from "../../core/services/function.service";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { FilesService } from 'src/app/core/services/files.service';
import { ValidateBothMatchUrl, ValidateJobrepUrl, ValidateUrl } from 'src/app/core/services/url.validator';

@Component({
    selector: 'app-profile-update',
    templateUrl: './profile-update.component.html',
    styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('modalView', {static: true}) modalView$ : ElementRef | undefined;
    userForm!: FormGroup;
    userDetails: any = [];
    isLoader: boolean = false;
    test: any;
    getExpData: any;
    loginToken: any;
    loginType: any;
    baseImage: any;
    imageUrl: any = this.config.assetsImages+'profile-pic.svg';
    imgLoader: boolean = false
    inputLoader: boolean = false
    dropdownSettings = {};
    imageSrc:string | ArrayBuffer =  'assets/images/uploads.png';

    constructor(
        public config: ConfigService,
        public fun: FunctionService,
        public fb: FormBuilder,
        public auth: AuthService,
        private router: Router,
        private toast: ToastrService,
        public fileService: FilesService,
    ) { }

    ngAfterViewInit() {
        this.getData();
    }

    ngOnInit(): void {
        this.loginToken = localStorage.getItem('loginToken');
        this.loginType = localStorage.getItem('loginType');
        this.getData();
        this.formData();
        this.getExpertize();
        this.listenToUrlChange();
    }


    getData(){
        this.inputLoader = true;
        try {
            this.fun.getUserData().then((res: any) => {
                if (res) {
                    this.inputLoader = false;
                    this.fun.userData = res;
                    if (res.image) {
                        this.imageUrl = this.config.imageStoragePath()+ res.image
                    }
                    localStorage.setItem('userDetails', JSON.stringify(res))

                    let data = res;
                    Object.keys(data).forEach((key) => {
                        const result = key;
                        const value = data[key];
                        if (this.userForm.controls[result]) {
                            this.userForm.controls[result].patchValue(value);
                            if (result == 'total_years_in_career_service') {
                                if (value == 0) {
                                    this.userForm.controls['total_years_in_career_service'].patchValue('');
                                }
                            }
                            this.userDetails = data;
                        }
                    });
                }
            }).catch(err => {
                this.inputLoader = false;
                this.router.navigate(['/login',this.loginType])
                console.log("eee => ", err);
            });
        } catch (e) {
            this.inputLoader = false;
            this.router.navigate(['/login',this.loginType])
        }
    }



    ngOnChanges(changes: any = this.getData): void {
        this.fun.userData = changes.userData.currentValue;
        this.baseImage = this.fun?.userData?.image

        if(this.baseImage){
            this.imageUrl = this.config.imageStoragePath() + this.baseImage
        }
        // this.imageUrl = this.baseImage
        // this.updateData(this.fun.userData)
        // this.formDisabled(this.fun.userData);
        this.getExpertize()
    }

    formData() {
        this.userForm = this.fb.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
            city: ["", Validators.required],
            state: ["", Validators.required],
            country: ["", Validators.required],
            total_years_in_career_service: ["", Validators.required],
            professional_sertification: [""],
            image: ["", Validators.required],
            custom_tags: [""],
            profile_header: ["", Validators.required],
            service_summary: ["", Validators.required],
            industry_experience: [""],
            pofile_share_link: [""],
            website_link: [""],
            linkedin_link: ["", Validators.required],
            jobrep_profile_link: [""],
            top3_specialites: ["",Validators.required],
            profile_status_id: [""],
            approved_at: [""],
            updated_at: [""]
        })
    }

    public listenToUrlChange(){
        // @ts-ignore
        this.userForm.get('linkedin_link').valueChanges.subscribe(value => {
            if(value) {
                // @ts-ignore
                this.userForm.get('linkedin_link').setValidators(ValidateUrl)
                // @ts-ignore
                this.userForm.get('linkedin_link').updateValueAndValidity({emitEvent: false, onlySelf: true})
            } else {
                // @ts-ignore
                this.userForm.get('linkedin_link').setValidators([Validators.required, ValidateUrl]);
                // @ts-ignore
                this.userForm.get('linkedin_link').updateValueAndValidity({emitEvent: false, onlySelf: true})
                return;
            }
        });
    }

    getExpertize() {
        this.fileService.getExpertise().then((res: any) => {
            if (res && res.status) {
                this.getExpData = res.data.data;
                this.dropdownSettings = {
                    singleSelection: false,
                    idField: 'service_id',
                    textField: 'service_name',
                    limitSelection: 3,
                    enableCheckAll: false,
                };
                // console.log('Get Exp > ', this.getExpData);
            }
            else {
                this.inputLoader = false;
                console.log('Err something went wrong');
            }
        }).catch((err: any) => {
            console.log('error', err);
        })
    }

    onItemSelect(item: any) {
        //console.log(item);
    }

    onSelectAll(items: any) {
        //console.log(items);
    }

    logoutResetReload() {
        this.auth.logout();
        this.fun.checkToken = false;
        this.fun.isLoggedIn = false;
        this.fun.userData = {};
        // window['grecaptcha'].reset();
        window.location.reload();
        this.router.navigate(['/']);
    }

    updateProfile() {
        if ( this.userForm.invalid ) {
            this.userForm.markAllAsTouched();
            return;
        }
        this.isLoader = true;
        if (this.userForm.valid) {
            localStorage.setItem('top3_specialites',JSON.stringify(this.userForm.value.top3_specialites))
            let newData = {userDetails : this.userForm.value}
            // Check user is loggedIn or not using getuserdata API
            this.auth.getUserDetails().then((res: any) => {
                try{
                    if (res && res.description === "Token has Expired" || res.description === "Authorization") {
                        this.logoutResetReload();
                    }
                } catch (e){
                    this.logoutResetReload();
                }
            }).catch((err: any) => {
                console.log('errGetUser => ', err);
            });

            this.auth.userDataUpdate(newData).then((res: any) => {
                if (res && res.status) {
                    this.isLoader = false;
                    localStorage.setItem('userDetails', JSON.stringify(res.data))
                    this.toast.success('Profile Updated Successfully');

                    setTimeout(() => {
                        this.router.navigate(['/jobreps-expertise'])
                    }, 1500);
                    // this.registerForm.reset();
                }
                else {
                    this.toast.error(res.description);
                    this.isLoader = false;
                    if (res.description === 'Authorization') {
                        this.logoutResetReload();
                    }
                }
            }).catch((err: any) => {
                console.log('err22 => ', err);
                this.toast.error(err.message)
                this.isLoader = false
            })
        } else {
            this.isLoader = false
        }

        if (!this.loginToken) {
            this.isLoader = false;
        }

    }

    uploadProfile() {
        // @ts-ignore
        this.modalView$.nativeElement.classList.add('visible');
    }

    closeUploadProfile() {
        // @ts-ignore
        this.modalView$.nativeElement.classList.remove('visible');
    }

    onFileSelected(ev: any) {
        this.imgLoader = true
        let file = ev.target.files[0];
        if (ev.target.files && ev.target.files[0]) {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.userForm.patchValue({
                    image: reader.result
                });
                this.fun.updateValue(reader.result);
                // this.imageSrc = reader.result;
            };
        }

        // const reader = new FileReader();
        if (file.size < this.config.maxImageSize) {
            const formData = new FormData();
            formData.append('imageData', file);
            formData.append('fileName', file?.name);
            this.fileService.userFileUpload(formData).then((res: any) => {
                this.imgLoader = false

                if (res && res.status) {
                    this.baseImage = res.data.url;
                    this.imageUrl = this.config.imageStoragePath()+res.data.key_img;
                    this.userForm.patchValue({image: res.data.key_img})
                }
            }).catch((err: any) => {

                this.imgLoader = false
                if (err && err.detail) {
                    this.toast.error(err.detail)
                } else {
                    // this.toastr.error('Internal err')
                }
            })
        }
        else {
            this.toast.error('Less then 10mb image size upload')
            this.imgLoader = false
        }
        // reader.readAsDataURL(file);
    }

    backToOtp() {
        if (this.fun.loginToken) {
            localStorage.removeItem('loginToken')
            localStorage.removeItem('loginEmail')
            localStorage.removeItem('isLoggedIn')
            this.fun.checkToken = false;
            this.fun.isLoggedIn = false;
            this.fun.loginToken = '';
            this.fun.userData = {};
        }

        if (this.loginType) {
            this.router.navigate(['/otp',this.loginType])
        } else {
            this.router.navigate(['/'])
        }
    }

}
