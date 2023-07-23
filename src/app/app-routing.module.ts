import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "src/app/modules/home/home.component";
import {UploadResumeComponent} from "src/app/modules/upload-resume/upload-resume.component";
import {AdditionalInputComponent} from "src/app/modules/additional-input/additional-input.component";
import {CuratedReportComponent} from "src/app/modules/curated-report/curated-report.component";
import {OurMissionComponent} from "./modules/our-mission/our-mission.component";
import {ReviewEditComponent} from "./modules/review-edit/review-edit.component";
import {SubmitApplyComponent} from "./modules/submit-apply/submit-apply.component";
import {LoginComponent} from "./modules/login/login.component";
import {OtpComponent} from "./modules/otp/otp.component";
import {
    CareerProfessionalMatchComponent
} from "./modules/career-professional-match/career-professional-match.component";
import {
    CandidateCareerProfessionalMatchComponent
} from "./modules/candidate-career-professional-match/candidate-career-professional-match.component";
import {MatchComponent} from "./modules/match/match.component";
import {ProfileUpdateComponent} from "./modules/profile-update/profile-update.component";
import {
    CareerProfessionalServicesComponent
} from "./modules/career-professional-services/career-professional-services.component";
import {
    CareerProfessionalAdditionalComponent
} from "./modules/career-professional-additional/career-professional-additional.component";
import {
    CareerProfessionalTopMatchComponent
} from "./modules/career-professional-top-match/career-professional-top-match.component";
import {CurrentChallengesComponent} from "./modules/current-challenges/current-challenges.component";
import {JobrepsExpertiseComponent} from "./modules/jobreps-expertise/jobreps-expertise.component";
import {JobrepsProfileDetailsComponent} from "./modules/jobreps-profile-details/jobreps-profile-details.component";
import {BothmatchSolutionsComponent} from "./modules/bothmatch-solutions/bothmatch-solutions.component";
import {PodcastComponent} from "./modules/podcast/podcast.component";
import {ErrorComponent} from "./modules/error/error.component";
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import {HeaderComponent} from "./layout/header/header.component";
import {UsefulLinksComponent} from "./modules/useful-links/useful-links.component";
import {ForgotLoginComponent} from "./modules/forgot-login/forgot-login.component";
import {ChangePasswordComponent} from "./modules/change-password/change-password.component";
import {DashboardComponent} from "./modules/admin/dashboard/dashboard.component";
import {UserProfileDetailsComponent} from "./modules/admin/user-profile-details/user-profile-details.component";
import {StepJobJourneyComponent} from "./modules/step-job-journey/step-job-journey.component";

const routes: Routes = [] = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'upload-resume/:searchType', component: UploadResumeComponent },
    { path: 'upload-resume', component: UploadResumeComponent },
    { path: 'additional-input', component: AdditionalInputComponent },
    { path: 'curated-report', component: CuratedReportComponent },
    { path: 'our-mission', component: OurMissionComponent },
    { path: 'review-edit', component: ReviewEditComponent },
    { path: 'submit-apply', component: SubmitApplyComponent },
    { path: 'submit-apply/:job_id', component: SubmitApplyComponent },
    { path: 'career-professional-match', component: CareerProfessionalMatchComponent },
    { path: 'candidate-career-professional-match', component: CandidateCareerProfessionalMatchComponent },
    { path: 'match/:type', component: MatchComponent },
    { path: 'profile-update', component: ProfileUpdateComponent },
    { path: 'career-professional-services', component: CareerProfessionalServicesComponent },
    { path: 'career-professional-additional', component: CareerProfessionalAdditionalComponent },
    { path: 'career-professional-top-match', component: CareerProfessionalTopMatchComponent },
    { path: 'current-challenges', component: CurrentChallengesComponent },
    { path: 'jobreps-expertise', component: JobrepsExpertiseComponent },
    { path: 'jobreps-profile-details', component: JobrepsProfileDetailsComponent },
    { path: 'bothmatch-solutions', component: BothmatchSolutionsComponent },
    { path: 'podcast', component: PodcastComponent },
    { path: 'login/:loginType', component: LoginComponent },
    { path: 'otp/:loginType', component: OtpComponent },
    { path: 'forgot-login/:loginType', component: ForgotLoginComponent },
    { path: 'forgot-password/:loginType', component: ForgotPasswordComponent },
    { path: 'useful-links/:tabType', component: UsefulLinksComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'step-job-journey', component: StepJobJourneyComponent },
    { path: 'error', component: ErrorComponent },
    // {
    //     path: '**',
    //     redirectTo: '/error',
    // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
