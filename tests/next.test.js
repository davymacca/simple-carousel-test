describe ('Carousel - Test public methods', function () {

    describe ('Transition carousel to the next item', function () {

        beforeEach (function() {
            // TODO: Load fixtures
            // TODO: create helper function getCurrentCarouselIndex() which checks the internal index of the carousel 
    
            const carousel = new ImageCarousel('.image-carousel', {
                numberOfImages: 6, 
                searchTerms: 'cats'
            });
    
        });
    
        it ('should move carousel one forward', function () {
   
            let currentIndex = getCurrentCarouselIndex();
            carousel.next();
            
            expect( currentIndex ).toEqual(1);
        });

        it ('should move the carousel directly to item 4', function () {   
            let currentIndex = getCurrentCarouselIndex();
            carousel.moveTo(4);
            currentIndex = getCurrentCarouselIndex();
            
            expect( currentIndex ).toEqual(4);
        });

        it ('should move the carousel back to the first item when it gets to the last item', function () {   
            let currentIndex = getCurrentCarouselIndex();
            
            carousel.next();
            carousel.next();
            carousel.next();
            carousel.next();
            carousel.next();
            carousel.next();

            currentIndex = getCurrentCarouselIndex();
            
            expect( currentIndex ).toEqual(0);
        });
    
    });

});

