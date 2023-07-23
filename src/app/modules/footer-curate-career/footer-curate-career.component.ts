import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";

@Component({
  selector: 'app-footer-curate-career',
  templateUrl: './footer-curate-career.component.html',
  styleUrls: ['./footer-curate-career.component.scss']
})
export class FooterCurateCareerComponent implements OnInit {

  constructor(
      public config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

}
