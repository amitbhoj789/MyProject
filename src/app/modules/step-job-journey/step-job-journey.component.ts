import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";

@Component({
  selector: 'app-step-job-journey',
  templateUrl: './step-job-journey.component.html',
  styleUrls: ['./step-job-journey.component.scss']
})
export class StepJobJourneyComponent implements OnInit {

  constructor(
    public config: ConfigService
  ) { }

  ngOnInit(): void {
  }

}
