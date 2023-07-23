import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ConfigService} from "../../core/config.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-forgot-login',
    templateUrl: './forgot-login.component.html',
    styleUrls: ['./forgot-login.component.scss']
})
export class ForgotLoginComponent implements OnInit {

    forgotform!: FormGroup;
    isInvalid: boolean = false;
    isLoader: boolean = false;
    loginType: any;
    constructor(
        public config: ConfigService,
        private fb: FormBuilder,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.forgotform = this.fb.group({
            email_mobile: ['',],
        });
        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.loginType = String(routeParams.get('loginType'));
    }

    submitForgot() {

    }
}
