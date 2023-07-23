import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import { lastValueFrom } from 'rxjs';
import {GoogleApiService, UserInfo} from "../../core/services/google-api.service";
import {Router} from "@angular/router";
// import { CalendarOptions } from '@fullcalendar/core';
// import { EventInput } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction'; // for dateClick

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnInit {
    //Full Calendar
    // Events: any[] = [];
    // calendarOptions: CalendarOptions = {
    //     headerToolbar: {
    //         left: 'prev,next today',
    //         center: 'title',
    //         right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    //     },
    //     initialView: 'dayGridMonth',
    //     weekends: true,
    //     editable: true,
    //     selectable: true,
    //     selectMirror: true,
    //     dayMaxEvents: true
    // };
    // onDateClick(res: any) {
    //     alert('Clicked on date : ' + res.dateStr);
    // }

    challengeTab: boolean = false;
    pastPodcastTab: boolean = true;
    nextEventTab: boolean = false;
    podcastTabIndex = 0;

    mailSnippets: string[] = []
    userInfo?: UserInfo

    constructor(
        public config: ConfigService,
        private router: Router,
        // private readonly googleApi: GoogleApiService
    ) {
        // googleApi.userProfileSubject.subscribe((info) => {
        //     this.userInfo = info;
        //
        // });
    }

    // isLoggedIn(): boolean {
    //     return this.googleApi.isLoggedIn()
    // }
    //
    // logout() {
    //     this.googleApi.signOut()
    // }
    //
    // async getEmails() {
    //     if (!this.userInfo) {
    //         return;
    //     }
    //
    //     const userId = this.userInfo?.info.sub as string
    //     const messages = await lastValueFrom(this.googleApi.emails(userId))
    //     messages.messages.forEach( (element: any) => {
    //         const mail = lastValueFrom(this.googleApi.getMail(userId, element.id))
    //         mail.then( mail => {
    //             this.mailSnippets.push(mail.snippet)
    //         })
    //     });
    // }



    ngOnInit(): void {
        // https://calendar.google.com/calendar/u/3?cid=c2VydmljZUBqb2JyZXAub3Jn
        // setTimeout(() => {
        //     this.calendarOptions = {
        //         // headerToolbar: { center: 'dayGridMonth,timeGridWeek' },
        //         initialView: 'dayGridMonth',
        //         dateClick: this.onDateClick.bind(this),
        //         // events: this.Events,
        //         // googleCalendarApiKey: 'AIzaSyDpq6zb896mCrES6zyB4kHtgx6D9_VSEN4',
        //         // events: {
        //         //     googleCalendarId: 'service@jobrep.org',
        //         //     className: 'gcal-event'
        //         // },
        //         eventSources: [
        //             {
        //                 googleCalendarApiKey: 'AIzaSyDpq6zb896mCrES6zyB4kHtgx6D9_VSEN4',
        //                 googleCalendarId: 'service@jobrep.org',
        //                 className: 'fc-event-email'
        //             }
        //         ],
        //         // eventClick: function(event) {
        //
        //         //     // opens events in a popup window
        //         //     // @ts-ignore
        //         //     window.open(event.href, '_blank', 'width=700,height=600');
        //         //     return false;
        //         // }
        //     };
        // }, 2500);
        if (!this.config.isShowPodcast) {
            this.router.navigate(['/home'])
        }
    }

    tabChange(index: number): void {
        if (index === 0) {
            this.podcastTabIndex = 0;
            this.pastPodcastTab = true;
            this.nextEventTab = false;
            this.challengeTab = false;

        } else if (index === 1) {
            this.podcastTabIndex = 1;
            this.pastPodcastTab = false;
            this.challengeTab = false;
            this.nextEventTab = true;

        } else if (index === 2) {
            this.podcastTabIndex = 2;
            this.nextEventTab = false;
            this.pastPodcastTab = false;
            this.challengeTab = true;

        } else {
            this.podcastTabIndex = 0;
            this.pastPodcastTab = true;
            this.nextEventTab = false;
            this.challengeTab = false;
        }
    }

}
