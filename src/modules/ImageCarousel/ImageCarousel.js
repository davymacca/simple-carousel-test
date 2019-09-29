'use strict';



const API = {
    'host': 'https://pixabay.com/api/',
    'endpoint': '?key=9656065-a4094594c34f9ac14c7fc4c39&q=',
}



/**
 * This createas an isntance of ImageCarousel.
 * @class
 */
export class ImageCarousel {

    /**
     * Creates the ImageCarousel.
     * @param {String} selector - The class name or id of the element 
     * @param {Object} config - An object with optional values 
     */
    constructor(selector, config) {      
        
        // Check all the params
        this._checkConfigParameters(selector, config);
    
        // Initialise the carousel
        this._setupCarouselMarkup();
        
        // Call the API to get the images
        this._getImages();

        /**
         * The main containing element for the carousel.
         * @type {HTMLElement}
         * @private
         */
        this._carouselElement = document.querySelectorAll(selector)[0];        

        /**
          * The wrapper element <ul> for the enclosing the carousel items.
         * @type {HTMLElement}
         * @private
         */
        this._carouselList = this._carouselElement.querySelectorAll('.image-carousel-list');

        /**
        * A collection of item <li> elements.
         * @type {HTMLElement}
         * @private
         */
        this._carouselItems = this._carouselElement.querySelectorAll('.image-carousel-item');
    }



    // ::: 
    // ::: Public methods
    // :::

    /**
     * Moves the carousel along one.
     * @public
     */
    next () {      
        this._carouselChange('next');
    }

    /**
     * Moves the carousel backwards one.
     * @public
     */
    prev () {
        this._carouselChange('prev');
    }

    /**
     * Moves the carousel to a specif index.
     * @param {Number} index - A index of item to be moved to
     * @public
     */
    moveTo (index) {
        // TODO: this._carouselChange(null, index);
    }








    // ::: 
    // ::: Private methods
    // :::

    /**
     * Calls the API to retrive a list of images then creates a new object to work
     * @param {String} selector - A css selector
     * @param {Object} config - An object containing configuration items
     * @private
     */
    async _getImages () {

        // Create the API call, make sure we only return as many images as we need
        let url = API.host + API.endpoint + this._searchTerms + '&per_page=' + this._numberOfImages;
        
        try {
            const response = await fetch(url)
            const images = await response.json();
            this._imageData = images.hits;
        } catch (error) {
            console.error(error);
        }

        
        // TODO: Take the newly fetched object
        // TODO: loop through each created element in the carousel
        // TODO: add the new image url to the <img> elements src this._imageData.webformatURL
        // TODO: include data from this._imageData.tags for alt tags and titles

        // NB: Ideally we won't be making a call clientside directly to a different domain
        // This could be proxied locally through a backend service so we could correctly configure CORS and reduce security risks
    }

    /**
     * Checks to see if all parameters are valid 
     * @param {String} selector - A css selector
     * @param {Object} config - An object containing configuration items
     * @private
     */
    _checkConfigParameters (selector, config) {
        // Check for a valid selector and element exists
        // Check required fields exist and are the correct type (numberOfImages, searchTerms)
        // Check all other config values and set them to (_sudo) private variables or default values
        
        // TODO: Perform checks on types 
        // TODO: Perform checks if no values are present for numberOfImages or searchTerms 
        // TODO: Throw an error 
        // TODO: Set to internal acessible vars if successful 

        this._numberOfImages = config.numberOfImages || 6;
        this._searchTerms = config.searchTerms || 'cats';
        this._speed = config.speed || 50;
        this._startPosition = config.startPosition || 0;
        this._loop = config.loop || true;
        return;
    }

    /**
     * Creates the initial markup for the carousel with all classes and elements required
     * @private
     */
    _setupCarouselMarkup () {
        // TODO: Takes the current markup which is just a <ul> with an <li>
        // TODO: using a templating like Handlebarsjs
        // TODO: turn it onto markup that looks like this
        
        // this._numberOfImages
        
        // <div class="image-carousel" aria-live="polite">
        //     <ul class="image-carousel-list is-set">
        //         {{#each items}}
        //         <li class="image-carousel-item" aria-hidden="false">
        //             <img src="{{webformatURL}}" alt="A photo containing {{tags}}">
        //             <p class="image-carousel-item-title">{{tags}}</p>
        //         </li>
        //         {{/each}}  
        //     </ul>
        // </div>
        return;
    }

    /**
     * Utility class which takes a list of elements and removes class names from them all.
     * @param {HTMLElement} elements - A collection of elements
     * @param {String} className - The class name to be removed
     * @private
     */
    _removeClassNames (elements, className) {
        Array.from(elements).forEach(element => {
            element.classList.remove(className);
        });
    }

    /**
     * Takes the current carousel reference item from the list of carousel items. Returns the imediatly
     * follwoing item. If current reference is last item in the list then it returns the first.
     * @param {HTMLElement} currentItemElement - The current refernce item element
     * @return {HTMLElement} The next element in the carousel list
     * @private
     */
    _getNextItem (currentItemElement) {
        // Get the imediatly following item
        let el = currentItemElement.nextElementSibling;
        if (el === null) {
            // at the end of the list so set it to the first 
            return this._carouselItems[0];
        } else {
            return el;
        }
    }

    /**
     * Takes the current carousel reference item from the list of carousel items. Returns the imediatly
     * previous item. If the current reference is the first item then it returns the last.
     * @param {HTMLElement} currentItemElement - The current refernce item element
     * @return {HTMLElement} The previous element in the carousel list
     * @private
     */
    _getPrevItem (currentItemElement) {
        let element = currentItemElement.previousElementSibling;
        if(element === null) {
            return this._carouselItems[this._carouselItems.length -1];
        } else {
            return element;
        }
    }

    /**
     * Transitions the carousel to the next or previous item 
     * @param {String} direction - The direction to slide the carousel "next" or "prev"
     * @private
     */
    _carouselChange (direction) {

        // Find the current item reference - this is the bases to work out which item is next and previous
        let currentItemElement = this._carouselElement.querySelectorAll('.is-ref')[0];
        let nextItem;
    
        // Which direction are we going to move?
        // Get the nextItem in the list of <li> elements
        if (direction === 'next') {
            nextItem = this._getNextItem(currentItemElement);
            this._carouselList[0].classList.remove('is-reversing'); 
        } else {
            nextItem = this._getPrevItem(currentItemElement);
            // Extra styling is needed when are going in reverse (transitionX() values are negative)
            this._carouselList[0].classList.add('is-reversing'); 
        }
    
        // Move reference element to the next item so we can keep track next time 
        this._removeClassNames(this._carouselItems, 'is-ref');
        nextItem.classList.add('is-ref');
    
        // Reorder the css order:n values for each item starting from new index in sequence
        nextItem.style.order = 1;
        
        // loop from 2 and go up each time we get a new element
        for (var i = 2; i <= this._carouselItems.length; i++) {
            nextItem = this._getNextItem(nextItem);
            nextItem.style.order = i;
        }

        // Change each aria-hidden attributes based on if they are in view or not.
        // TODO: When looping through the items, work out which ones aren't currently 
        // TODO: visible and change aria-hidden="false" or aria-hidden="true" if they are off screen 
        // TODO: This should be each time the carousel is transitioned
        // TODO: Also add coresponding css selectors so they are actually hidden
        // TODO: li[aria-hidden='true'] { display: none; }
        // TODO: li[aria-hidden='false'] { display: block; }


        // Animate the carousel items 
        // TODO: Here is where I would use a small animation libirary to animate between items
        // TODO: Below works to show how the items will look when animated but use of setTimeout is not a recomeded method

        // We need to remove the class so that the css animation gets chance to work (HACK!)
        this._carouselList[0].classList.remove('is-set');
        let _this = this;
        return setTimeout(function() {
            _this._carouselList[0].classList.add('is-set');
            return _this.carouselList;
        }, 50);

    }


    

}






















