import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    changePasswordform!: FormGroup;
    isLoader: boolean = false;
    constructor(
        public config: ConfigService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.changePasswordform = this.fb.group({
            current_password: ['',],
            new_password: ['',],
            confirm_password: ['',],
        });
    }

    changePassword() {

    }
}
