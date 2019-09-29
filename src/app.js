'use strict';

// TODO: Split out later into SCSS _partials
// import "normalize.css";
import "./styles.scss";
import "./modules/ImageCarousel/ImageCarousel.scss";

import { ImageCarousel } from './modules/ImageCarousel/ImageCarousel';



// :::
// ::: Entry point for app
// :::




// Create new instance of the Carousel
const carousel = new ImageCarousel('.image-carousel', {
    numberOfImages: 6, 
    searchTerms: 'cats'
});

// Setup click events for the navigation items
let navButtons = document.querySelectorAll('.image-carousel-nav');
Array.from(navButtons).forEach(button => {

    button.addEventListener('click', function(event) {
        event.preventDefault();
        if (button.dataset.direction === 'next') {
            carousel.next();
        } else {
            carousel.prev();
        }
    });

});




