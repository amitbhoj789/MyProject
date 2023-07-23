import {Component, isDevMode, OnInit, Renderer2, ViewChild, HostListener, Inject} from '@angular/core';
import {FormGroup, FormControl, NgForm,FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from "@angular/router";
import {ConfigService} from "./core/config.service";
import * as timers from "timers";
import {DOCUMENT} from "@angular/common";
import {HeaderComponent} from "./layout/header/header.component";
import {FunctionService} from "./core/services/function.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [HeaderComponent]
})
export class AppComponent implements OnInit {
    @ViewChild('standardCommonNgForm') standardCommonNgForm!: NgForm;
    standardCommonForm!: UntypedFormGroup;
    invalidPass : boolean = false;

    matchPassword: boolean = false;
    deviceInfo : any;
    title = 'mobile_both_match';
    visitorPasswordExpireAt: any;
    visitorPassword: any;
    constructor(
        private renderer: Renderer2,
        private _formBuilder: UntypedFormBuilder,
        public config: ConfigService,
        private router: Router,
        private header: HeaderComponent,
        private deviceService: DeviceDetectorService,
        private fun: FunctionService,
        @Inject(DOCUMENT) private document: Document) {
        this.epicFunction();
        // this.visitorConfirmation('');
        this.visitorPassword = localStorage.getItem('visitorPassword');
        if (this.config.isShowVisitorPassword && this.visitorPassword !== this.config.visitorPassword) {
            this.renderer.addClass(document.body, 'visit-popup-wrapper');
        }
    }

    ngOnInit(): void {
        this.standardCommonForm = this._formBuilder.group({
            password : ['', [Validators.required]],
        });

        const visitorPassword = localStorage.getItem('visitorPassword');
        if (visitorPassword === this.config.visitorPassword) {
            this.matchPassword = true;
        }
    }

    onClose() {
        this.config.isShowVisitorPassword = false;
        this.config.isShowVisitorPassword = false;
        this.renderer.removeClass(document.body, 'visit-popup-wrapper');
        this.renderer.addClass(document.body, 'd-none');
        // throw new Error('Application has crashed!')
    }

    onSubmit () {
        this.standardCommonForm = this._formBuilder.group({
            password : [this.standardCommonForm.value.password, [Validators.required]],
        });
        if ( this.standardCommonNgForm.invalid ) {
            this.invalidPass = true;
            return;
        }
        this.visitorConfirmation(this.standardCommonForm.value.password);
    }

    visitorConfirmation(password:any) {
        if (this.config.isShowVisitorPassword) {
            let time = this.addMin(this.config.visitorPasswordExpireIn);
            this.visitorPasswordExpireAt = localStorage.getItem('visitorPasswordExpireAt');
            this.visitorPassword = localStorage.getItem('visitorPassword');

            if (time.now>this.visitorPasswordExpireAt || this.visitorPassword !== this.config.visitorPassword) {
                if (password===this.config.visitorPassword) {
                    localStorage.setItem('visitorPassword', this.config.visitorPassword)
                    localStorage.setItem('visitorPasswordExpireAt', `${time.next}`);
                    this.renderer.removeClass(document.body, 'visit-popup-wrapper');
                    this.config.isShowVisitorPassword = false;
                    this.matchPassword = true;
                } else {
                    this.invalidPass = true;
                }
                // if(confirm("Are you sure ?")) {
                //
                // } else {
                //     throw new Error('Application has crashed!');
                // }
            }
        }
    }


    addMin(min: number) {
        let now = new Date();
        // let next = new Date(now.getTime() + (hour * 60 * 60 * 1000)); //Add hour
        let next = new Date(now.getTime() + (min * 60 * 1000)); //Add minutes
        return {'now': this.convertUnixTimestamp(now), 'next': this.convertUnixTimestamp(next)};
    }

    convertUnixTimestamp(hour:any) {
        return Math.floor(hour.getTime() / 1000);
    }

    epicFunction() {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();
        const isDesktopDevice = this.deviceService.isDesktop();

        if (!isMobile) {
            if(!isDevMode()){
                if (this.config.environmentSetup === 'production') {
                    window.location.href = this.config.prodDesktopUrl;
                } else {
                    window.location.href = this.config.stagingDesktopUrl;
                }
            }
        }
        // console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
        // console.log(isTablet);  // returns if the device us a tablet (iPad etc)
        // console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    }

    private _opened: boolean = false;

    @HostListener('window:popstate', ['$event'])
    // @ViewChild('sidenav') sidenav: SidenavComponent;
    onPopState(event:any) {
        this.header.toggleLogoClick();
        this.fun.toggleSidebarVisibility();
        console.log('Back button pressed');
        // this.header.toggleClick(false)
        // this.renderer.removeClass(this.document.body, 'sidebar-open');
        // this.renderer.removeClass('ng-sidebar', 'ng-sidebar--opened');
        // return;
    }
}
