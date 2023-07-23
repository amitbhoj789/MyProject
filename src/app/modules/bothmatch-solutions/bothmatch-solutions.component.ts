import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";

@Component({
    selector: 'app-bothmatch-solutions',
    templateUrl: './bothmatch-solutions.component.html',
    styleUrls: ['./bothmatch-solutions.component.scss']
})
export class BothmatchSolutionsComponent implements OnInit {

    constructor(
        public config: ConfigService,
    ) { }

    ngOnInit(): void {
    }

}
