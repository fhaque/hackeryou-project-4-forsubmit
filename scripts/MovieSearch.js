class MovieSearch {
    constructor (movieApp) {
        this.movieApp = movieApp;
        this.query = '';

        this.createDomElement();
    }

    createDomElement () {
        this.fillDomTemplate();

        this.initEvents();
    }

    fillDomTemplate() {
        this.el = $( 
            `<form class="searchForm">
                <label for="searchBar" class="searchForm__searchBarLabel">Movie Title</label>
                <input type="text" name="searchBar" id="searchBar" class="searchForm__searchBar">
                <input type="submit" value="Search" class="searchForm__searchBtn">
            <form>`);
    }

    initEvents() {
        const self = this;

        self.el.off(); //clear any potential other handlers.

        self.el.on('submit', function(e) {
            e.preventDefault();

            this.query = self.el.children('input[class="searchForm__searchBar"]').val();
            console.log(this.query);
            self.movieApp.updateMovieAppState('searchResults', this.query);
        });
    }

}