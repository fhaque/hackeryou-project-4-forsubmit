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
                        this.trailerUrl = `${CONSTANTS.youtubeEmbedBaseUrl}${result.key}?controls=2`;

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
                    this.trailerUrl = CONSTANTS.youtubeEmbedBaseUrl + res.items[0].id.videoId + '?controls=2';

                    // this.addWatchTrailerBtn();
                }
            }
        });
    }

    expand() {
        this.getTrailerLink().then( () => {
            if ('trailerUrl' in this) {
                this.el.find('.movie__section').append(this.createWatchTrailerBtn());
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

        this.el.find('.movie__summary')
                .text(this.overview)
                .removeClass('.movie__summary--noOverflow');
    }

    unexpandDomElement() {
        this.el.removeClass('movie--expanded');

        this.el.find('.movie__summary')
                .text(this.overview.substring(0,140) + '...')
                .addClass('.movie__summary--noOverflow');
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
        const self = this;

        const $closeBtn = $('<button>')
                        .addClass('movie__embeddedTrailerCloseBtn')
                        .text('Close')
                        .on('click', function(e) {
                            e.preventDefault();

                            self.movieApp.el.find('.movie__embeddedTrailerContainer').remove();
                        });
        const $videoDisplay = $('<div>')
                .addClass('movie__embeddedTrailerContainer')
                .append(
                        `
                        <iframe class="movie__embeddedTrailerVideo" width="560" height="315" src="${this.trailerUrl}" frameborder="0" allowfullscreen></iframe>
                        `
                        )
                .append($closeBtn);
        
        this.movieApp.el.append( $videoDisplay );
    }

    isExpandable() {
        return true;
    }


}