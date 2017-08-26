class MovieApp {
    constructor($domContainer) {
        this.searchResults = [];
        this.foreignFilmResults = [];
        this.movieSelected = {};

        //initialize searchbar
        this.searchBar = new MovieSearch(this);

        this.el = $domContainer;
        this.initDisplay();

        this.getGenreList();

        this.foreignLanguageSelection = 'fr';

        this.displayResults();
    }

/************* INITIALIZATION FUNCTIONS *********/
    initDisplay() {
        //create header of movie app and add search bar
        this.headerContainer = {};
        this.headerContainer.el = $('<header>').addClass('movieApp__headerContainer');
        this.headerContainer.el.append(this.searchBar.el);

        //create the results container of the app containing all results
        this.resultsContainer = {};
        this.resultsContainer.el = $('<main>').addClass('movieApp__resultsContainer');
        
        this.el.append(this.headerContainer.el, this.resultsContainer.el);
    }

/************* STATE UPDATES *******************/
    updateMovieAppState(state) {
        this.updateToState[state]();
    }


/************* GET FUNCTIONS *******************/
    getMovieList(query) {
        $.ajax({
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

            this.displayResults();
        } )
        .fail( (err) => console.log(err) );
    }

    getGenreList() {
        $.ajax({
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
        console.log(categoriesObj);

        $.ajax({
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
            this.foreignFilmResults = this.createMovieArrayFromResponse(res.results);

            this.displayResults();            
        });
    }

/********* DISPLAY FUNCTIONS  *************/
    displayResults(results) {
        const $results = this.resultsContainer.el;

        $results.empty();
        
        if ( $.isEmptyObject(results) || results === undefined) {
            //if a movie has been selected from search results,
            //display foreign film result
            if ( !$.isEmptyObject(this.movieSelected) ) {
                $results.append( this.movieSelected.el.addClass('movie--selected') );
                this.appendMovieListToDomElement($results, this.foreignFilmResults);

            //if no movie is selected but there are search results
            } else if ( !$.isEmptyObject(this.searchResults) ) {
                this.appendMovieListToDomElement($results, this.searchResults);

            //case if there are no search results
            } else {
                $results.append(`<p class="movieApp__searchMessage">Please try a new search.`);
            }
        //case where an argument has been given.
        } else {
            this.appendMovieListToDomElement($results, results);
        }

    }

/****** EVENT HANDLE FUNCTIONS  ********/

    movieClickHandle(movie) {
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
    
            this.getForeignFilms(categoriesObj);

        });
        
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

        console.log(searchResults);

        return searchResults;
    }

    appendMovieListToDomElement($domElement, movieList) {
        $domElement.append( movieList.map( (movie) => movie.el ) );
    }

}