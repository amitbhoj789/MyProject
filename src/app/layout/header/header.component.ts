import { Component, OnInit, Inject, Renderer2} from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {FunctionService} from "../../core/services/function.service";
import {AuthService} from "../../core/services/auth.service";
import Swal from 'sweetalert2';
import {NavigationEnd, Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    showPeopleImage: boolean = true;
    opened = false;
    loginToken: any;
    isLoggedIn: any;
    userData: any;
    name: any;
    email: any;
    loginType: any;
    imageUrl: any = this.config.assetsImages+'profile-pic.svg';

    slides = [
        { img: "assets/images/Row1.png" },
        { img: "assets/images/Row2.png" },
        { img: "assets/images/Row3.png" },
        { img: "assets/images/Row4.png" }
    ];
    slide : any = 0;
    slideConfig = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "dots": false,
        "infinite": true,
        "autoplay": false,
        "autoplaySpeed": false
    };
    constructor(
        public config: ConfigService,
        public fun: FunctionService,
        public auth: AuthService,
        private router: Router,

        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2

    ) { }


    ngOnInit(): void {
        this.fun.opened$.subscribe((isVisible: boolean) => {
            if (this.opened) {
                this.opened = isVisible;
            }
        });

        //Get profile image from function service
        this.fun.value$.subscribe(value => {
            this.imageUrl = value;
        });

        this.loginToken = localStorage.getItem('loginToken');
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
        this.loginType = localStorage.getItem('loginType');
        if (this.isLoggedIn && this.loginToken !=='') {
            this.patchLoginData();
        }

        if(localStorage.getItem('slideValue') != undefined && localStorage.getItem('slideValue') != null && localStorage.getItem('slideValue') != ''){
            let current:any = localStorage.getItem('slideValue') ? localStorage.getItem('slideValue') :'';
            if(JSON.parse(current).slide == 3){
                localStorage.setItem('slideValue',JSON.stringify({"slide":0}));
                this.slide = 0;
            } else{
                this.slide = JSON.parse(current).slide + 1;
                localStorage.setItem('slideValue',JSON.stringify({"slide":this.slide}));
            }
        } else {
            localStorage.setItem('slideValue',JSON.stringify({"slide":0}));
            this.slide = 0;
        }

        this.router.events.subscribe(
            (events: any) => {
                if (events instanceof NavigationEnd) {
                    const routeUrl = this.router.url;
                    let pathUrls: Array<string> = [
                        '/jobreps-profile-details'
                    ];
                    const existUrl = pathUrls.includes(routeUrl);
                    if (existUrl) {
                        this.showPeopleImage = false;
                    } else {
                        this.showPeopleImage = true;
                    }
                    // console.log(pathUrls.includes("our-mission"))
                    // if (routeUrl === '/our-mission') {
                    //     this.showFooter = false;
                    // }
                }
            }
        )
    }

    toggleClick(isHidden?:boolean) {
        this.opened = !this.opened;
        if(isHidden){
            this.renderer.addClass(this.document.body, 'sidebar-open');
            return;
        } else{
            this.renderer.removeClass(this.document.body, 'sidebar-open');
            return;
        }
    }

    toggleLogoClick() {
        this.opened = false;
        this.renderer.removeClass(this.document.body, 'sidebar-open');
    }

    patchLoginData() {
        try {
            this.fun.getUserData().then((res: any) => {
                if (res) {
                    this.userData = res;
                    this.imageUrl = this.config.imageStoragePath()+ res.image
                    this.name = res.name
                    this.email = res.email
                }
            }).catch(err => {
                console.log("eee => ", err);
            })
        } catch (e) {

        }
    }

    logout() {
        this.opened = !this.opened;
        Swal.fire({
            title: 'Are you sure want to logout?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes.',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.auth.logout();
                this.fun.checkToken = false;
                this.fun.isLoggedIn = false;
                this.fun.loginToken = '';
                this.loginToken = '';
                this.isLoggedIn = false;
                this.fun.userData = {};
                localStorage.removeItem('loginType');
                localStorage.removeItem('emailOtp');
                this.router.navigate(['/login',this.loginType])
                Swal.fire('Logout!', 'You have been successfully logout', 'success');
                // window.location.reload();

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire('Cancelled', 'Product still in our database.)', 'error');
            }
        });

        this.fun.confirmBox('Are sure logout?', 'Yes', 'Cancel')
            .then((res: any) => {
                if (res) {
                    this.auth.logout();
                    this.fun.checkToken = false;
                    this.fun.isLoggedIn = false;
                    this.fun.userData = {}
                    window.location.reload();
                } else {
                    // this.toast.error('Canceled');
                }
            })
            .catch((err: any) => {
                console.log('err => ', err);
                this.fun.checkToken = true;
                // this.toast.error('Canceled');
            });
    }
}
