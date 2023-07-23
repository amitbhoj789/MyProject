import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-slider',
    templateUrl: './header-slider.component.html',
    styleUrls: ['./header-slider.component.scss']
})
export class HeaderSliderComponent implements OnInit {

    slides = [
        { img: "assets/images/Row1.png" },
        { img: "assets/images/Row2.png" },
        { img: "assets/images/Row3.png" },
        { img: "assets/images/Row4.png" }
    ];
    slide : any = 0;
    slideConfig = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "dots": false,
        "infinite": true,
        "autoplay": false,
        "autoplaySpeed": false
    };
    constructor() { }

    ngOnInit(): void {
        if (localStorage.getItem('slideValue') !== undefined && localStorage.getItem('slideValue') != null && localStorage.getItem('slideValue') !== ''){
            let current: any = localStorage.getItem('slideValue') ? localStorage.getItem('slideValue') : '';
            if (JSON.parse(current).slide === 3){
                localStorage.setItem('slideValue', JSON.stringify({"slide": 0}));
                this.slide = 0;
            } else{
                this.slide = JSON.parse(current).slide + 1;
                localStorage.setItem('slideValue', JSON.stringify({"slide": this.slide}));
            }
        } else {
            localStorage.setItem('slideValue', JSON.stringify({"slide": 0}));
            this.slide = 0;
        }
    }

}
