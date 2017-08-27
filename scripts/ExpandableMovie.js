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

    expand() {
        this.expandDomElement();
    }

    unexpand() {
        this.unexpandDomElement();
    }

    expandDomElement() {
        console.log('ExpandedDomElement');

        this.el.addClass('movie--expanded');
    }

    unexpandDomElement() {
        this.el.removeClass('movie--expanded');
    }

    isExpandable() {
        return true;
    }
}