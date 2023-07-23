import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarModule } from 'ng-sidebar';
import { UploadResumeComponent } from './modules/upload-resume/upload-resume.component';
import { AdditionalInputComponent } from './modules/additional-input/additional-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuratedReportComponent } from './modules/curated-report/curated-report.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import {NgSelectModule} from "@ng-select/ng-select";
import { OurMissionComponent } from './modules/our-mission/our-mission.component';
import { ReviewEditComponent } from './modules/review-edit/review-edit.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SubmitApplyComponent } from './modules/submit-apply/submit-apply.component';
import { LoginComponent } from './modules/login/login.component';
import { OtpComponent } from './modules/otp/otp.component';
import { CareerProfessionalMatchComponent } from './modules/career-professional-match/career-professional-match.component';
import { CandidateCareerProfessionalMatchComponent } from './modules/candidate-career-professional-match/candidate-career-professional-match.component';
import { MatchComponent } from './modules/match/match.component';
import { ProfileUpdateComponent } from './modules/profile-update/profile-update.component';
import { AuthInterceptor } from './app.interceptor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CareerProfessionalServicesComponent } from './modules/career-professional-services/career-professional-services.component';
import { CareerProfessionalAdditionalComponent } from './modules/career-professional-additional/career-professional-additional.component';
import { CareerProfessionalTopMatchComponent } from './modules/career-professional-top-match/career-professional-top-match.component';
import { CurrentChallengesComponent } from './modules/current-challenges/current-challenges.component';
import { JobrepsExpertiseComponent } from './modules/jobreps-expertise/jobreps-expertise.component';
import { JobrepsProfileDetailsComponent } from './modules/jobreps-profile-details/jobreps-profile-details.component';
import { BothmatchSolutionsComponent } from './modules/bothmatch-solutions/bothmatch-solutions.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PodcastComponent } from './modules/podcast/podcast.component';
import { ErrorComponent } from './modules/error/error.component';
import { FooterCurateCareerComponent } from './modules/footer-curate-career/footer-curate-career.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { JobSeekerTabComponent } from './modules/job-seeker-tab/job-seeker-tab.component';
import {OAuthModule} from "angular-oauth2-oidc";
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { JobDetailsComponent } from './modules/job-details/job-details.component';
import { UsefulLinksComponent } from './modules/useful-links/useful-links.component';
import { UsefulDetailsComponent } from './modules/useful-details/useful-details.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ForgotLoginComponent } from './modules/forgot-login/forgot-login.component'
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { AdminModule } from "./modules/admin/admin.module";
import { ResetPasswordComponent } from './modules/reset-password/reset-password.component';
import { StepJobJourneyComponent } from './modules/step-job-journey/step-job-journey.component';
import { HeaderSliderComponent } from './layout/header-slider/header-slider.component';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from '@fullcalendar/interaction';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';

// FullCalendarModule.registerPlugins([
//     // register FullCalendar plugins
//     dayGridPlugin,
//     interactionPlugin,
//     googleCalendarPlugin
// ]);

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        UploadResumeComponent,
        AdditionalInputComponent,
        CuratedReportComponent,
        OurMissionComponent,
        ReviewEditComponent,
        SubmitApplyComponent,
        LoginComponent,
        OtpComponent,
        CareerProfessionalMatchComponent,
        CandidateCareerProfessionalMatchComponent,
        MatchComponent,
        ProfileUpdateComponent,
        CareerProfessionalServicesComponent,
        CareerProfessionalAdditionalComponent,
        CareerProfessionalTopMatchComponent,
        CurrentChallengesComponent,
        JobrepsExpertiseComponent,
        JobrepsProfileDetailsComponent,
        BothmatchSolutionsComponent,
        PodcastComponent,
        ErrorComponent,
        FooterCurateCareerComponent,
        JobSeekerTabComponent,
        ForgotPasswordComponent,
        JobDetailsComponent,
        UsefulLinksComponent,
        UsefulDetailsComponent,
        ForgotLoginComponent,
        ChangePasswordComponent,
        ResetPasswordComponent,
        StepJobJourneyComponent,
        HeaderSliderComponent
    ],
    imports: [
        BrowserModule,
        // FullCalendarModule,
        AppRoutingModule,
        AdminModule,
        SidebarModule.forRoot(),
        ReactiveFormsModule,
        SlickCarouselModule,
        FormsModule,
        HttpClientModule,
        NgSelectModule,
        NgxCaptchaModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 2000, // 2 seconds
            closeButton: true,
            progressBar: true,
            preventDuplicates: true,
        }),
        NgMultiSelectDropDownModule.forRoot(),
        CarouselModule,
        OAuthModule.forRoot(),
        NgxMaskModule.forRoot(),
        DragDropModule
    ],
    exports:[
        SlickCarouselModule,
        CarouselModule
    ],
    providers: [DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor, multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
