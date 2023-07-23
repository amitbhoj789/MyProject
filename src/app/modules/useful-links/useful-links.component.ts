import {Component, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from "@angular/router";

@Component({
    selector: 'app-useful-links',
    templateUrl: './useful-links.component.html',
    styleUrls: ['./useful-links.component.scss']
})
export class UsefulLinksComponent implements OnInit {

    browserName: string | undefined;
    helpCenterBlock: any;
    isFaqVisible: any;
    isJobseekerVisible: any;
    isCommunityVisible: any;
    useFulLinks: any;
    linksTabIndex = 0;
    helpCenterTab: boolean = true;
    resourcesTab: boolean = false;
    matchVsSearchTab: boolean = false;
    pressCornerTab: boolean = false;
    privacyPolicyTab: boolean = false;
    termsConditionsTab: boolean = false;

    tabType: any;
    constructor(
        private _activatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        console.log('Browser Name:-', this.detectBrowser())
        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.tabType = String(routeParams.get('tabType'));
        if (this.tabType == 'help-center') {
            this.useFulLinks = 0;
            this.linksTabIndex = 0;
            this.helpCenterTab = true;
            this.resourcesTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
            this.helpCenterBlock = true;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;

        } else if (this.tabType == 'resources') {
            this.useFulLinks = 1;
            this.linksTabIndex = 1;
            this.helpCenterTab = false;
            this.resourcesTab = true;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;

        } else if (this.tabType == 'search-vs-match') {
            this.useFulLinks = 2;
            this.linksTabIndex = 2;
            this.helpCenterTab = false;
            this.resourcesTab = false;
            this.matchVsSearchTab = true;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;

        } else if (this.tabType == 'press-corner') {
            this.useFulLinks = 3;
            this.linksTabIndex = 3;
            this.helpCenterTab = false;
            this.resourcesTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = true;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;

        } else if (this.tabType == 'privacy-policy') {
            this.useFulLinks = 4;
            this.linksTabIndex = 4;
            this.helpCenterTab = false;
            this.resourcesTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = true;
            this.termsConditionsTab = false;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;

        } else if (this.tabType == 'terms-and-conditions') {
            this.useFulLinks = 5;
            this.linksTabIndex = 5;
            this.helpCenterTab = false;
            this.resourcesTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = true;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;

        } else {
            this.useFulLinks = 0;
            this.linksTabIndex = 0;
            this.helpCenterTab = true;
            this.resourcesTab = false;
            this.matchVsSearchTab = false;
            this.pressCornerTab = false;
            this.privacyPolicyTab = false;
            this.termsConditionsTab = false;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;
        }
    }

    ngAfterViewInit() {
        // console.log('ngAfterViewInit')
    }

    ngAfterContentInit() {
        // console.log('ngAfterContentInit')
    }

    ngAfterContentChecked() {
        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.tabType = String(routeParams.get('tabType'));
        if (this.tabType == 'about-us') {
            this.useFulLinks = 0;
            this.linksTabIndex = 0;

        } else if (this.tabType == 'help-center') {
            this.useFulLinks = 1;
            this.linksTabIndex = 1;

        } else if (this.tabType == 'search-vs-match') {
            this.useFulLinks = 2;
            this.linksTabIndex = 2;

        } else if (this.tabType == 'press-corner') {
            this.useFulLinks = 3;
            this.linksTabIndex = 3;

        } else if (this.tabType == 'privacy-policy') {
            this.useFulLinks = 4;
            this.linksTabIndex = 4;

        } else if (this.tabType == 'terms-and-conditions') {
            this.useFulLinks = 5;
            this.linksTabIndex = 5;

        } else {
            this.useFulLinks = 0;
            this.linksTabIndex = 0;
        }
    }

    ngAfterViewChecked() {
        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.tabType = String(routeParams.get('tabType'));
    }

    ngOnDestroy() {
        // console.log('ngOnDestroy');
    }

    ngOnChanges(changes: SimpleChanges) {
        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.tabType = String(routeParams.get('tabType'));
    }

    detectBrowser() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes('edge')) {
            return 'Microsoft Edge';
        } else if (userAgent.includes('edg')) {
            return 'Microsoft Edge (Chromium)';
        } else if (userAgent.includes('chrome')) {
            return 'Google Chrome';
        } else if (userAgent.includes('safari')) {
            return 'Apple Safari';
        } else if (userAgent.includes('firefox')) {
            return 'Mozilla Firefox';
        } else if (userAgent.includes('opera') || userAgent.includes('opr')) {
            return 'Opera';
        } else if (userAgent.includes('trident') || userAgent.includes('msie')) {
            return 'Internet Explorer';
        } else {
            return'Unknown Browser';
        }
    }

    linksTabChange(index: number): void {
        if (index === 0) {
            this.useFulLinks = 0;
            this.linksTabIndex = 0;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;
            this.router.navigate(['/useful-links','about-us']);

        } else if (index === 1) {
            this.useFulLinks = 1;
            this.linksTabIndex = 1;
            this.helpCenterBlock = true;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;
            const queryParams: NavigationExtras = {
                queryParams: { helpCenterBlock: true }
            };
            this.router.navigate(['/useful-links','help-center'], queryParams );

        } else if (index === 2) {
            this.useFulLinks = 2;
            this.linksTabIndex = 2;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;
            this.router.navigate(['/useful-links','search-vs-match']);

        }  else if (index === 3) {
            this.useFulLinks = 3;
            this.linksTabIndex = 3;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;
            this.router.navigate(['/useful-links','press-corner']);

        }  else if (index === 4) {
            this.useFulLinks = 4;
            this.linksTabIndex = 4;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;
            this.router.navigate(['/useful-links','privacy-policy']);

        }  else if (index === 5) {
            this.useFulLinks = 5;
            this.linksTabIndex = 5;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;
            this.router.navigate(['/useful-links','terms-and-conditions']);

        } else {
            this.useFulLinks = 0;
            this.linksTabIndex = 0;
            this.helpCenterBlock = false;
            this.isFaqVisible = false;
            this.isJobseekerVisible = false;
            this.isCommunityVisible = false;
            this.router.navigate(['/useful-links','help-center']);
        }
    }

    // message: any;
    receiveMessage($event: string) {
        this.helpCenterBlock = $event;
    }

    receiveMessageFaq($event: string) {
        this.isFaqVisible = $event;
    }

    receiveMessageJobSeeker($event: string) {
        this.isJobseekerVisible = $event;
    }

    receiveMessageCommunity($event: string) {
        this.isCommunityVisible = $event;
    }

}
