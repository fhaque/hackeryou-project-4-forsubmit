class Movie {
    constructor (movieObj, movieApp) {
        $.extend(this, movieObj);
        this.movieApp = movieApp;

        if (this.backdrop_path) {
            this.background_path = CONSTANTS.moviePosterBaseUrl + CONSTANTS.moviePosterBGResolution + this.backdrop_path;
        } else {
            this.background_path = "";
        }
        
        if (this.poster_path) {
            this.thumbnail_path = CONSTANTS.moviePosterBaseUrl + CONSTANTS.moviePosterThumbResolution + this.poster_path;
        } else {
            this.thumbnail_path = "http://placehold.it/154x231";
        }

        this.createDomElement();        

        this.getKeywords();

        
    }

    getKeywords() {
        $.ajax({
            url: CONSTANTS.movieMovieBaseUrl + this.id + '/keywords',
            method: 'GET',
            dataType: 'json',
            data: {
                'api_key': CONSTANTS.movieKey
            }

        })
        .then( (res) => {
            this.keywords = res.keywords;

            this.addKeywordsToDom();
        });
    }

    getWordsFromKeyWords() {
        const wordArray = [];
        for (let keyword of this.keywords) {
            wordArray.push(keyword.name);
        }

        return wordArray;
    }

    addKeywordsToDom() {
        const justWords = this.getWordsFromKeyWords();
        
        this.el.append(
            `<p class="movie__keywords">
                ${justWords || ""}
            </p>`);
    }

    createDomElement() {
        this.fillDomTemplate();

        this.initEvents();
    }

    initEvents() {
        const self = this;

        this.el.on('click', function(e) {
            console.log('clicked');

            self.movieApp.movieClickHandle(self);
        });

    }
    
    fillDomTemplate() {
        this.el = $(
        `<article class="movie">
            <img src="${this.thumbnail_path || ""}" alt="">
            <p class="movie__rating">${this.vote_average || ""}</p>
            <p class="movie__title">${this.title || ""}</p>
            <p class="movie__summary">${this.overview || ""}</p>
        </article>`);

        //remove the voter rating if there is none
        if (this.vote_average === 0) {
            this.el.remove('.movie__rating');
        }
    }


}