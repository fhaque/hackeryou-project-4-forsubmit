class MovieApp {
    constructor($domContainer) {
        const self = this;

        this.searchResults = [];
        this.foreignFilmResults = [];
        this.movieSelected = {};

        this.foreignLanguageSelection = 'en';

        //initialize searchbar
        this.searchBar = new MovieSearch(this);

        //set app state handles
        this.updateToState = {
            'newSearch': self.updateNewSearch.bind(self),
            'searchResults': self.updateSearchResults.bind(self),
            'resultsFromPick': self.updateResultsFromPick.bind(self),
            'movieInfo': self.updateMovieInfo.bind(self), 
        };

        this.getGenreList();

        this.el = $domContainer;
        this.initDisplay();
        this.updateMovieAppState('newSearch');
    }

/************* INITIALIZATION FUNCTIONS *********/
    initDisplay() {
        const self = this;

        //create header of movie app
        this.headerContainer = {};
        this.headerContainer.el = $('<header>').addClass('movieApp__headerContainer');

        //create the results container of the app containing all results
        this.resultsContainer = {};
        this.resultsContainer.el = $('<main>').addClass('movieApp__resultsContainer');
        
        this.el.append(this.headerContainer.el, this.resultsContainer.el);

        this.screenRatioDisplayFix();

        //window resize detection
        $(window).resize(function(e) {
            self.screenRatioDisplayFix();
        });
    }

/************* STATE UPDATES *******************/
    updateMovieAppState(state, ...data) {
        this.updateToState[state](...data);
    }

    updateNewSearch() {
        this.displayNewSearch();
    }

    updateSearchResults(query) {
        if (query !== '' && query !== undefined) {
            this.getMovieList(query)
            .then( () => {
                this.displaySearchResults();
            });
        } else {
            this.updateMovieAppState('newSearch');
        }
    }

    //get the keywords of the selected movie and pick
    //category and keyword from movie. Search for it,
    //then display results.
    updateResultsFromPick(movie, language) {

        if ( movie !== undefined ) {
            this.movieSelected = movie;
            this.movieSelected.getKeywords().then( () => {

                let categoriesObj = {};
                //pick category to search
                if ('keywords' in movie) {
                    categoriesObj.keyword = movie.keywords[Math.floor( Math.random() * movie.keywords.length )].id;
                }
        
                if ('genre_ids' in movie){
                    categoriesObj.genre = movie.genre_ids[ Math.floor( Math.random() * movie.genre_ids.length ) ];
        
                } 
                
                if ( $.isEmptyObject(categoriesObj) ) {
                    console.log('No category to search for foreign film');
                }

                this.movieSelected.categoriesObj = categoriesObj; //save for later 'gets'
                
            
                this.getForeignFilms(categoriesObj)
                .then( () => this.displayResultsFromPick() );

            });

        } else if (language !== undefined) {
            this.foreignLanguageSelection = language;
            this.getForeignFilms(this.movieSelected.categoriesObj)
            .then( () => this.displayResultsFromPick() );
        } else {
            this.displayResultsFromPick();
        }
    }

    updateMovieInfo(movie) {
        this.displayMovieInfo(movie);
    }

/********* DISPLAY FUNCTIONS  *************/
    displayNewSearch() {
        const $header = this.headerContainer.el;
        const $results = this.resultsContainer.el;

        this.el.find('.movieApp__movieBackdrop').remove();
        this.el.find('.movieApp__movieTitle').remove();

        this.resetHeaderContainer();

        this.searchBar.initEvents(); //re-bind event handlers
        $header.append( this.searchBar.el );

        this.resetResultsContainer();

        $results.append(`<p class="movieApp__searchMessage">Welcome to Foreign Film Suggester! Search for a film you like. Then pick a foreign language. Get suggestions :). Try searching above!.`);
    }

    displaySearchResults() {
        const $results = this.resultsContainer.el;

        this.resetResultsContainer();
        

        this.appendMovieListToDomElement($results, this.searchResults);
    }

    displayResultsFromPick() {
        const $header = this.headerContainer.el;
        const $results = this.resultsContainer.el;

        this.el.find('.movieApp__movieBackdrop').remove();
        this.el.find('.movieApp__movieTitle').remove();

        this.resetHeaderContainer();
        $header.addClass('movieApp__headerContainer--resultsFromPick');

        // this.movieSelected.el.parentToAnimate($header, 'slow');
        if (this.movieSelected.el.hasClass('movie--selected') ) {
            $header.append( this.movieSelected.el );
        } else {
            moveAnimateFixed(this.movieSelected.el, $header, 1000);
            setTimeout( () => this.movieSelected.el.addClass('movie--selected'), 0 );
        }

        // $header.append( this.movieSelected.el );
        $header.append( this.createLanguageSelectMenu() );
        $header.append( this.createNewSearchBtn() );

        
        

        this.resetResultsContainer();
        $results.addClass('movieApp__resultsContainer--resultsFromPick');
        
        if ( this.foreignFilmResults.length === 0 ) {
            $results.append(`<p class="movieApp__searchMessage">No related ${LANGUAGES[this.foreignLanguageSelection]} movies found. Please select a different language.`);
        } else {
            this.appendMovieListToDomElement($results, this.foreignFilmResults);
        }
        
    }

    displayMovieInfo(movie) {
        const self = this;

        const $header = this.headerContainer.el;
        const $results = this.resultsContainer.el;

        this.resetHeaderContainer();
        $header.addClass('movieApp__headerContainer--movieInfo');

        $header.append( this.createToResultsFromPickBtn(movie) );
        $header.append( this.createNewSearchBtn() );

        this.resetResultsContainer();
        $results.addClass('movieApp__resultsContainer--movieInfo');
        

        //create backdrop and fix its display
        const $backdropImage = $(`<img src="${movie.background_path}">`)
            //To use Vibrant JS library
            //fix idea from: https://stackoverflow.com/questions/22097747/how-to-fix-getimagedata-error-the-canvas-has-been-tainted-by-cross-origin-data
            .attr('crossOrigin', '')
            .on('load', function(e) {
                    const vibrant = new Vibrant(this);
                    const swatches = vibrant.swatches();
                    self.changeTheme(movie, swatches);
                   
                    window.scrollTo(0, 0); //scroll to top of page          
            });
        
        this.el
            .prepend( $('<p>')
                        .text(movie.title)
                        .addClass('movieApp__movieTitle') 
            )
            .prepend( $(`<div>`)
                    .addClass('movieApp__movieBackdrop')
                    .append($backdropImage)
            );

        this.displayFixBackdrop();

        //allow for movie info to work in full page.
        if ( movie.isExpandable() ) {
            movie.expand();
            $results.append(movie.el);
        }

    }


/************* GET FUNCTIONS *******************/
    getMovieList(query) {
        return $.ajax({
            url: CONSTANTS.movieSearchUrl,
            method: 'GET',
            dataType: 'json',
            data: {
                'query': query,
                'api_key': CONSTANTS.movieKey,
                'language': 'en-US',
                'sort_by': 'popularity.desc',
                'include_adult':'false',
                'page': 1,
            }
        })
        .then( (res) => {
            this.searchResults = this.createMovieArrayFromResponse(res.results);
        } )
        .fail( (err) => console.log(err) );
    }

    getGenreList() {
        return $.ajax({
            url: CONSTANTS.movieGenreListUrl,
            method: 'GET',
            dataType: 'json',
            data: {
                'api_key': CONSTANTS.movieKey,
            }
        })
        .then( (res) => {
            this.genres = res.genres;
        });
    }

    getForeignFilms(categoriesObj) {
    

        return $.ajax({
            url: CONSTANTS.movieDiscoverUrl,
            method: 'GET',
            dataType: 'json',
            data: {
                'api_key': CONSTANTS.movieKey,
                'with_genres': categoriesObj.genre,
                'with_keywords': categoriesObj.keywords,
                'sort_by': 'popularity.desc',
                'with_original_language': this.foreignLanguageSelection,
            }
        })
        .then( (res) => {
            this.foreignFilmResults = this.createExpandableMovieArrayFromResponse(res.results);          
        });
    }


/****** EVENT HANDLE FUNCTIONS  ********/

    movieClickHandle(movie) {
        if (movie.constructor === ExpandableMovie) {
            this.expandableMovieHandle(movie);
        } else if (movie.constructor === Movie) {
            this.nonExpandableMovieHandle(movie);
        }
    }

    nonExpandableMovieHandle(movie) {
        this.updateMovieAppState('resultsFromPick', movie);
        
    }

    expandableMovieHandle(movie) {
        this.updateMovieAppState('movieInfo', movie);
    }


/************* HELPER FUNCTIONS *******************/
    createMovieArrayFromResponse(responseArray) {
        const searchResults = [];

        if (responseArray.length > CONSTANTS.movieSearchResultCountLimit) {
            responseArray = responseArray.slice(0, CONSTANTS.movieSearchResultCountLimit);
        }

        for (let movie of responseArray) {
            searchResults.push( new Movie( movie, this ) );
        }



        return searchResults;
    }

    createExpandableMovieArrayFromResponse(responseArray) {
        const searchResults = [];

        if (responseArray.length > CONSTANTS.movieSearchResultCountLimit) {
            responseArray = responseArray.slice(0, CONSTANTS.movieSearchResultCountLimit);
        }

        for (let movie of responseArray) {
            searchResults.push( new ExpandableMovie( movie, this ) );
        }


        return searchResults;
    }

    appendMovieListToDomElement($domElement, movieList) {
        $domElement.append( movieList.map( (movie) => {
            movie.initEvents();
            return movie.el;
        }) );
    }

    createNewSearchBtn() {
        const self = this;

        return $('<button>')
            .addClass('movieApp__newSearchBtn')
            .text('Start New Search')
            .on('click', function(e) {
                e.preventDefault();
                self.updateMovieAppState('newSearch');
            });
    }

    createToResultsFromPickBtn(movie) {
        const self = this;

        return $('<button>')
            .addClass('movieApp__ToResultsFromPickBtn')
            .text('Back to Results')
            .on('click', function(e) {
                e.preventDefault();
                
                movie.unexpand();

                self.updateMovieAppState('resultsFromPick');
            });
    }

    createLanguageSelectMenu() {
        const self = this;

        const $label = $('<label for="languageMenu">')
                        .addClass('movieApp__languageMenuLabel')
                        .text('Please select a film language.');

        const $optionElArray = Object.keys(LANGUAGES)
            .map( (language) => {
                const $option = $(`<option value="${language}">${LANGUAGES[language]}</option>`);

                if (language === this.foreignLanguageSelection) {
                    $option.attr('selected','selected');
                }

                return $option;
            });
        

        const $menu = $('<select name="languageMenu" id="languageMenu">')
                .addClass('movieApp__languageMenu')
                .append(...$optionElArray)
                .on('change', function(e) {
                   
                    self.updateMovieAppState('resultsFromPick',undefined,$(this).val());
                });

        return $('<div class="movieApp__languageMenuContainer">')
                .append($label, $menu);
    }

    changeTheme(movie, swatch) {
        this.addBackdropEffects(movie, swatch);

        this.changeMovieTheme(movie, swatch);
        

    }

    addBackdropEffects(movie, swatch) {
        //if a horror movie
        if(movie.genre_ids.includes(27)) {
            this.el.find('.movieApp__movieBackdrop')
                    .addClass('pulse');
        }

    }

    changeMovieTheme(movie, swatch) {
        const bgColor = swatch['DarkVibrant'].getRgb();
        const titleColor = swatch['DarkVibrant'].getTitleTextColor();
        const textColor = swatch['DarkVibrant'].getBodyTextColor();
        const btnBgColor = swatch['Vibrant'].getRgb();
        const btnTextColor = swatch['Vibrant'].getTitleTextColor();
        const btnShadowColor = swatch['DarkMuted'].getRgb();

        movie.el.css('background-color', `rgba(${bgColor},0.75)` );
        movie.el.find('.movie__summary').css('color', `${textColor}`);
        movie.el.find('.movie__title').css('color', `${titleColor}`);

        movie.el.find('button')
                .css('background-color', `rgb(${btnBgColor})`)
                .css('color', `${btnTextColor}`)
                .css('box-shadow', `0px 0px 35px 0px rgba(${btnShadowColor}, 1)`)
                .hover(function(e){
                    $(this).css('box-shadow', 'none');
                })
                .mouseleave(function(e){
                    $(this).css('box-shadow', 'none').css('box-shadow', `0px 0px 35px 0px rgba(${btnShadowColor}, 1)`);
                });
    }

    screenRatioDisplayFix() {
        this.displayFixBackdrop();
    }

    displayFixBackdrop() {
        const width = $( window ).width();
        const height = $( window ).height();

        const $movieBackdrop = this.el.find('.movieApp__movieBackdrop');
        
                //if in portrait
                if( width < height) {
                    $movieBackdrop
                        .addClass('movieApp__movieBackdrop--portrait')
                        .removeClass('movieApp__movieBackdrop--landscape');
                //if landscape
                } else {
                    $movieBackdrop
                        .removeClass('movieApp__movieBackdrop--portrait')
                        .addClass('movieApp__movieBackdrop--landscape');
                }
    }

    resetHeaderContainer() {
        const $header = this.headerContainer.el;

        $header.removeAttr('class');
        $header.addClass('movieApp__headerContainer');
        $header.empty();
    }

    resetResultsContainer() {
        const $results = this.resultsContainer.el;
        
        $results.removeAttr('class');
        $results.addClass('movieApp__resultsContainer');
        $results.empty();
    }

}
