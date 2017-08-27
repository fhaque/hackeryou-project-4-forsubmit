class ExpandableMovie extends Movie {
    constructor(movieObj, movieApp) {
        super(movieObj, movieApp);
    }

    initEvents() {
        const self = this;

        self.el.off(); //clear any past event handlers

        self.el.on('click', function(e) {
            e.preventDefault();

            self.movieApp.movieClickHandle(self);
        });

    }

    getTrailerLink() {
        if ('trailerUrl' in this) {
            return $.when(this.trailerUrl);
        }
        return $.ajax({
            url: CONSTANTS.movieMovieBaseUrl + this.id + '/videos',
            method: 'GET',
            dataType: 'json',
            data: {
                'api_key': CONSTANTS.movieKey,
                'id': this.id,
            }

        })
        .then( (res) => {
            if(res.results.length !== 0) {
                trailerloop:
                for(let result of res.results) {
                    if (result.site === 'YouTube') {
                        this.trailerUrl = `${CONSTANTS.youtubeEmbedBaseUrl}${result.key}?ecver=1`;

                        // this.addWatchTrailerBtn();

                        break trailerloop;
                    }
                }

                if ( !('trailerUrl' in this) ) {
                    this.getYoutubeTrailer();
                }
            } else {
                this.getYoutubeTrailer();
            }
        });
    }

    getYoutubeTrailer() {
        if ('trailerUrl' in this) {
            return $.when(this.trailerUrl);
        }
        return $.ajax({
            url: CONSTANTS.youtubeApiUrl,
            method: 'GET',
            dataType: 'json',
            data: {
                'key': CONSTANTS.youtubeKey,
                'part': 'snippet',
                'maxResults': 1,
                'q': this.title + ' trailer',
            }

        }).then( (res) => {
            if ('items' in res) {
                if(res.items.length !== 0) {
                    this.trailerUrl = CONSTANTS.youtubeEmbedBaseUrl + res.items[0].id.videoId + '?ecver=1';

                    // this.addWatchTrailerBtn();
                }
            }
        });
    }

    expand() {
        this.getTrailerLink().then( () => {
            if ('trailerUrl' in this) {
                this.el.append(this.createWatchTrailerBtn());
            }
        });

        this.expandDomElement();
    }

    unexpand() {
        this.el.find('.movie__watchTrailerBtn').remove();
        this.unexpandDomElement();
    }

    expandDomElement() {
        console.log('ExpandedDomElement');

        this.el.addClass('movie--expanded');
    }

    unexpandDomElement() {
        this.el.removeClass('movie--expanded');
    }

    createWatchTrailerBtn() {
        const self = this;

        return $('<button>')
                .text('Play Trailer/Relevant Video')
                .addClass('movie__watchTrailerBtn')
                .on('click',function(e) {
                    self.showVideo();
                });
    }

    showVideo() {
        console.log('show video function needs to be done');
    }

    isExpandable() {
        return true;
    }


}