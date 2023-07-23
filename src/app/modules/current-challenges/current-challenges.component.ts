import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";

@Component({
    selector: 'app-current-challenges',
    templateUrl: './current-challenges.component.html',
    styleUrls: ['./current-challenges.component.scss']
})
export class CurrentChallengesComponent implements OnInit {

    constructor(
        public config: ConfigService,
    ) { }

    ngOnInit(): void {
    }

}
