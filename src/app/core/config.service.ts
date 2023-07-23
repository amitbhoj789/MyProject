import { Injectable } from "@angular/core"
import {formatDate} from "@angular/common";
@Injectable({
    providedIn: 'root'
})
//1.1.7
export class ConfigService {
    public environmentSetup: string = 'development' //development, production

    public baseUrl: string = "https://2nfrmwo081.execute-api.us-east-1.amazonaws.com/dev/" //can be pass blank
    //public imageUrl: string = "https://curate-files.s3.ap-south-1.amazonaws.com/"
    public imgPathUrl: string = "https://curate-files.s3.ap-south-1.amazonaws.com/"
    public baseUrlStaging:string = 'https://2nfrmwo081.execute-api.us-east-1.amazonaws.com/dev/'; //Staging
    public baseUrlProduction:string = 'https://yc06x2tnld.execute-api.us-east-1.amazonaws.com/'; //Production

    public imageStorageStaging: string = "https://curate-files.s3.ap-south-1.amazonaws.com/" //Staging
    public imageStorageProduction: string = "https://bothmatch-prod-upload-resume.s3.amazonaws.com/" //Production


    public logoImage: string = "assets/images/logo.png"
    public desktopAppUrl: string = "http://dev-bothmatch-vlink.s3-website-us-east-1.amazonaws.com"
    public assetsImages: string = "assets/images/"
    public usaJobsUrl: string = "https://data.usajobs.gov/api"
    // public siteKey: string = "6LdMJdcZAAAAACxFRcp-pOKFICutsSI_DZkZUo6y"
    // public siteKey: string = "6LfabCklAAAAAIrAD7l_XKDUCzT6jhLswrBm92-q"//v3
    public siteKey: string = "6LdKbyklAAAAAJaXdBmn60YkEQIF5VmtrikTU5-7"//v2
    public passwordEncryptionKey: string = "ZKzeE1JApIA_ycm-nuaI5R8PrZDNgofKH05FOOgCsmI="
    public imgBaseUrl: string = "http://ec2-54-211-175-15.compute-1.amazonaws.com:8080"
    public maxImageSize: number = 10000000 //10MB
    private federalJobHeading: any;
    private federalJobSubHeading: any;
    public dateFormat: string = "d-MMM-Y";
    public dateTimeFormat: string = "d-MMM-Y h:mm a";

    public prodDesktopUrl: string = 'https://bothmatch.com'
    public stagingDesktopUrl: string = 'https://d1d86evu4nl948.cloudfront.net'
    public isShowPodcast: boolean = false;
    public adminEmail: string = 'website@bothmatch.com';
    public testingEmail: string = 'shradhapandey94@gmail.com';

    public isShowVisitorPassword: boolean = true;
    public visitorPassword: string = 'BothMatch@jul2023';
    public visitorPasswordExpireIn: number = 100000000000; //Minutes

    public isShowCaptcha: boolean = false;

    apiUrl() {
        if (this.environmentSetup === 'production') {
            this.baseUrl = this.baseUrlProduction
        } else {
            this.baseUrl = this.baseUrlStaging
        }
        return this.baseUrl;
    }

    imageStoragePath() {
        if (this.environmentSetup === 'production') {
            this.imgPathUrl = this.imageStorageProduction
        } else {
            this.imgPathUrl = this.imageStorageStaging
        }
        return this.imgPathUrl;
    }

    headings(value = '') {
        if (value === 'free') {
            this.federalJobHeading = 'Both Match - Interactive Demo';
            this.federalJobSubHeading = 'Instant Identity Protected Matching';

        } else if (value === 'freeGovt') {
            this.federalJobHeading = 'GOVERNMENT JOBS';
            this.federalJobSubHeading = 'Instant Identity Protected Matching';

        } else if (value === 'careerProfessionalMatch') {
            this.federalJobHeading = 'CAREER PROFESSIONAL MATCH';
            this.federalJobSubHeading = 'Jobseekers Need Based Matching';

        } else if (value === 'paid') {
            this.federalJobHeading = 'USA PRIVATE SECTOR JOBS';
            this.federalJobSubHeading = 'Instant Identity Protected Matching';

        } else if (value === 'companyMatch') {
            this.federalJobHeading = 'INDIVIDUAL USA COMPANY';
            this.federalJobSubHeading = 'Instant Identity Protected Matching';

        } else {
            this.federalJobHeading = 'JOB SEEKERS + CANDIDATES';
            this.federalJobSubHeading = 'Identity Protected Matching';
        }

        return {
            'federalJobHeading': this.federalJobHeading,
            'federalJobSubHeading': this.federalJobSubHeading
        }
    }

    dateConvertDBtoUI(date = '', type = '', format = '', msg ='') {
        if (type === 'date') {
            if (format === '') {
                if (this.dateFormat !== '') {
                    format = this.dateFormat;
                } else {
                    format = 'd-MM-y'
                }
            }
        } else if (type === 'datetime') {
            if (format === '') {
                if (this.dateTimeFormat !== '') {
                    format = this.dateTimeFormat;
                } else {
                    format = 'd-MMM-Y h:mm a'
                }
            }
        } else {
            format = 'd-MM-y'
        }

        if (date === '1970-01-01 00:00:00') {
            return msg;
        } else if (date === '1970-01-01') {
            return msg;
        } else if (date === '0000-00-00 00:00:00') {
            return msg;
        } else if (date === '0000-00-00') {
            return msg;
        } else if (date === '') {
            return msg;
        } else {
            return formatDate(date, format, 'en-US')
        }
    }
}
