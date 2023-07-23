import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";

@Component({
  selector: 'app-our-mission',
  templateUrl: './our-mission.component.html',
  styleUrls: ['./our-mission.component.scss']
})
export class OurMissionComponent implements OnInit {

  constructor(
      public config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

}
