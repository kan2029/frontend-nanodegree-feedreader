/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         /*Looping over the array to check for URL, then 
         expecting its count to be equal to array length*/
         it('have URL', function(){
            var allFeedsLength = allFeeds.length;
            var URLNumber = 0;
            for(var i=0; i < allFeedsLength; i ++){
                expect(allFeeds[i].url).toBeDefined();
                if(allFeeds[i].url !== ''){
                    URLNumber++;
                }
            }
            expect(URLNumber).toBe(allFeedsLength);
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         /*Looping over the array to check for name, then 
         expecting its count to be equal to array length*/
         it('have name', function(){
            var allFeedsLength = allFeeds.length;
            var nameNumber = 0;
            for(var i=0; i < allFeedsLength; i ++){
                expect(allFeeds[i].name).toBeDefined();
                if(allFeeds[i].name !== ''){
                    nameNumber++;
                }
            }
            expect(nameNumber).toBe(allFeedsLength);
         });

    });

    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
            * hidden by default. You'll have to analyze the HTML and
            * the CSS to determine how we're performing the
            * hiding/showing of the menu element.
        */

        /* Checking for the initial position of menu. It should 
        be shifted to left by an amount equal to its width (192px)*/ 
        it('is hidden by default', function(){
            var slidingMenu = $('.slide-menu');
            expect(slidingMenu.offset().left).toBe(-192);
        });

        /* TODO: Write a test that ensures the menu changes
            * visibility when the menu icon is clicked. This test
            * should have two expectations: does the menu display when
            * clicked and does it hide when clicked again.
        */

        it('should toggle visibility', function(){
            var slidingMenu = $('.slide-menu');
            /*$('.icon-list').click(function(){
                expect(slidingMenu.offset().left).toBe(0);
            });*/
            if($('body').attr('class') == ''){
                expect(slidingMenu.offset().left).toBe(0);    
            }
            if($('body').attr('class') == 'menu-hidden'){
                expect(slidingMenu.offset().left).toBe(-192);    
            }   
        });
    });      

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function(){

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it('loads feed', function(done){
            expect($('.feed').find('a').length>=1).toBe(true);
            done();
        });

    });     

    /* TODO: Write a new test suite named "New Feed Selection" */
    
    describe('New Feed Section', function(){

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         /* Calls the `loadFeed` function with callbacks to ensure that
         * they're complete.
         */
        var before, after; 
        beforeEach(function(done) {
            // Make sure that there are at least two feeds to test
            expect(allFeeds.length >= 2).toBe(true);

            // Load the first feed at index 0 
            loadFeed(0, function() {
                // Set before to content of feed 
                before = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
                // Load second feed at index 1
                loadFeed(3, function() {
                    // Set the after to content of new feed
                    after = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
                    done();
                });
            });
        });

        /* Tests that when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        it('changes content', function(done) {
            console.log(before);
            console.log(after);
            expect(before != after).toBe(true);
            done();
        });


    });     
}());
