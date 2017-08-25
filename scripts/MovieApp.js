class MovieApp {
    constructor(domContainer) {
        this.searchResults = [];

        this.el = domContainer;
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
            
            this.createMovieArrayFromResponse(res.results);

            this.displayResults();
        } )
        .fail( (err) => console.log(err) );
    }

    createMovieArrayFromResponse(responseArray) {

        if (responseArray.length > CONSTANTS.movieSearchResultCountLimit) {
            responseArray = responseArray.slice(0, CONSTANTS.movieSearchResultCountLimit);
        }

        for (let movie of responseArray) {
            this.searchResults.push( new Movie( movie, this ) );
        }

        console.log(this.searchResults);
    }

    displayResults() {
        this.el.append( this.searchResults.map( (movie) => movie.el) );
    }

}