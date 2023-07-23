import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(
    public config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

}
