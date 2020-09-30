import { inject, bindable, bindingMode } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Community {
    @bindable({defaultBindingMode: bindingMode.oneWay}) caption;
    constructor(router) {

        this.message = 'this is the Community Section';
        this.router = router;

        this.box1_header_text='Join the ITS Open-Source Community';
        this.box1_p_text='Contribute to the advancement of the Intelligent Transportation Systems research by making your repository easily discoverable to other ITS software developers and researchers.';
        this.box1_button_text='Contribute Repository';
        this.box1_button_route='route:repopublishing;';
        this.box1_button_aria_text='Link to Repository Publishing page';
        this.box1_image_url='/img/connect-people.svg';
        this.box1_image_alt_text='Plain cartoon faces connected by flowing lines.';
        
        this.box2_header_text='ITS Repositories';
        this.box2_p_text='Discover open-source ITS software and products already built within the U.S. DOT community.';
        this.box2_button_text='Discover ITS Repositories';
        this.box2_button_route='route:explore;';
        this.box2_button_aria_text='Link to Explore All Repositories page';
        this.box2_image_url='/img/laptop_with_clouds.svg';
        this.box2_image_alt_text='Laptop computer with clouds above it.';

        this.box3_header_text='Repository Metrics';
        this.box3_p_text='Explore repository and organizational metrics.';
        this.box3_button_text='Explore Metrics ';
        this.box3_button_route='route:metrics;';
        this.box3_button_aria_text='Link to Repository Metrics page';
        this.box3_image_url='/img/magnifying_glass_final.svg';
        this.box3_image_alt_text='Hand holding a magnifying glass over a vertical bar chart';
    }
}
