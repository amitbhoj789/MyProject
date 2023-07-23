import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
    selector: 'app-career-professional-top-match',
    styleUrls: ['./career-professional-top-match.component.scss'],
    templateUrl: './career-professional-top-match.component.html'
})
export class CareerProfessionalTopMatchComponent implements OnInit {

    currentStep = 5;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;
    showOne = false;
    showTwo = false;
    showThree = false;
    buttonName = 'Show';
    hide: any;
    imgUrl:any
    imageData: any

    constructor(
        public config: ConfigService,
        public fun: FunctionService
    ) {
        this.imgUrl = config.imageStoragePath()
    }

    ngOnInit(): void {
        this.imageData = localStorage.getItem('imageData')
        this.imageData = JSON.parse(this.imageData)
    }

    toggleOne() {
        this.showOne = !this.showOne
        // if(this.showOne) {
        //     this.buttonName = 'Hide'
        // } else {
        //     this.buttonName = 'Show'
        // }
    }

    transform(value: any){
        const splittedText = value.split(",");
        let htmlString = ""
        splittedText.forEach((item: any) => {
            htmlString = `${htmlString} <div>${item}</div>`
        });
        return htmlString;
    }

    toggleTwo() {
        this.showTwo = !this.showTwo
    }

    toggleThree() {
        this.showThree = !this.showThree
    }

}
