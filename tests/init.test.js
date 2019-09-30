describe ('Carousel - Setup new carousel tests', function () {

    describe ('When class is initially instantiated', function () {
        
        beforeEach (function() {
            // TODO: Load fixtures

            const carousel = new ImageCarousel('.image-carousel', {
                numberOfImages: 6, 
                searchTerms: 'cats'
            });

        });

        it ('should be defined', function() {
            expect(carousel).toBeDefined();
        });

        it ('should contain a base element', function() {
            expect( document.querySelectorAll('.image-carousel') ).toBeDefined();
        });

        it ('should have at least one item within the carousel', function() { 
            expect( document.querySelectorAll('.image-carousel-list').length ).toBeGreaterThan(0);
        });

        it ('should have only 1 .is-ref class', function() { 
            expect( document.querySelectorAll('.image-carousel-list.is-ref').length ).toEqual(1);
        });
        
    });

    describe ('When class is incorrectly instantiated', function () {

        it ('should thrown a error when default params are not supplied', function() {
            expect( new ImageCarousel('.image-carousel') ).toThrow(new Error("Error initialising the carousel. Please supply required config parameters."))
        });

        it ('should thrown a error when selector is not supplied', function() {
            expect( new ImageCarousel() ).toThrow(new Error("Error initialising the carousel. Please supply a valid selector and config parameters."))
        });

    });

});