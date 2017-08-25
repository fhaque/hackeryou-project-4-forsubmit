class MovieApp {
    constructor() {
        this.searchResults = [];
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
            this.createSearchResultsFromResponse(res.results);
        } );
    }

    createSearchResultsFromResponse(responseArray) {
        for (let movie of responseArray) {
            this.searchResults.push( new Movie( movie ) );
        }

        console.log(this.searchResults);
    }


}