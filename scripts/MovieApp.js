class MovieApp {
    constructor($domContainer) {
        const self = this;

        this.searchResults = [];
        this.foreignFilmResults = [];
        this.movieSelected = {};

        this.foreignLanguageSelection = 'fr';

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

    updateNewSearch() {
        this.displayNewSearch();
    }

    updateSearchResults() {
        console.log('update to search results');
        console.log(this);
        this.displaySearchResults();
    }

    updateResultsFromPick() {
        this.displayResultsFromPick();
    }

    updateMovieInfo() {
        this.displayMovieInfo();
    }

/********* DISPLAY FUNCTIONS  *************/
    displayNewSearch() {
        const $results = this.resultsContainer.el;
        $results.empty();

        $results.append(`<p class="movieApp__searchMessage">Please try a new search.`);
    }

    displaySearchResults() {
        const $results = this.resultsContainer.el;
        $results.empty();

        this.appendMovieListToDomElement($results, this.searchResults);
    }

    displayResultsFromPick() {
        const $results = this.resultsContainer.el;
        $results.empty();

        $results.append( this.movieSelected.el.addClass('movie--selected') );
        this.appendMovieListToDomElement($results, this.foreignFilmResults);
    }

    displayMovieInfo() {
        console.log('displayMovieInfo: need to code');
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

            this.updateMovieAppState('searchResults');
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

            this.updateMovieAppState('resultsFromPick');            
        });
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