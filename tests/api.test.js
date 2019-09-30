describe ('Carousel - Test images API', function () {

    beforeEach (function() {
        // TODO: Load fixtures

        const carousel = new ImageCarousel('.image-carousel', {
            numberOfImages: 6, 
            searchTerms: 'cats'
        });

    });

    it ('should contain an object of images', function () {
        expect( carousel._imageData ).toBe(true);
    });

    it ('should return the number of items as specified in the config parameters', function () {
        expect( carousel._imageData.length ).toEqual(carousel._numberOfImages);
    });

});