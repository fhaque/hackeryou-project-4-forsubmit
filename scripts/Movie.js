class Movie {
    constructor (movieObj) {
        $.extend(this, movieObj);

        this.background_path = CONSTANTS.moviePosterBaseUrl + CONSTANTS.moviePosterBGResolution + this.poster_path;

        this.thumbnail_path = CONSTANTS.moviePosterBaseUrl + CONSTANTS.moviePosterThumbResolution + this.poster_path;

        this.getKeywords();
    }

    getKeywords() {
        $.ajax({
            url: CONSTANTS.movieMovieBaseUrl + this.id + '/keywords',
            data: {
                'api_key': CONSTANTS.movieKey
            }

        })
        .then( (res) => {
            this.keywords = res.keywords;
        });
    }
}