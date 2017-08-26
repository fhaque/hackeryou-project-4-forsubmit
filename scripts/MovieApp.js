class MovieApp {
    constructor(domContainer) {
        this.searchResults = [];
        this.foreignFilmResults = [];
        this.movieSelected = {};

        this.el = domContainer;

        this.getGenreList();

        this.foreignLanguageSelection = 'fr';
    }

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

            this.displayResults(this.searchResults);
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


    displayResults(results) {
        this.el.empty();
        if ( !$.isEmptyObject(this.movieSelected) ) {
            this.el.append(this.movieSelected.el);
        }

        this.el.append( results.map( (movie) => movie.el) );
    }

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

            this.displayResults(this.foreignFilmResults);            
        });
    }

}