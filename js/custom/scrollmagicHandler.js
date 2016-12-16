const ScrollMagic = require('ScrollMagic');
//const ScrollMagicDebug = require('ScrollMagic.debug');

var ScrollmagicHandler = {
    initilized: false,
    init: function() {
        if (ScreensizeHandler.isSmallScreen) return;
        if (this.initilized) return;
        this.initilized = true;
        $('.content-wrapper').addClass('use-animation')
        var _scrollmagicElements = document.querySelectorAll('.content-wrapper > .page-section:not(.hero-text-section)');
        if (_scrollmagicElements === null) return;

        // init controller
        var controller = new ScrollMagic.Controller({ globalSceneOptions: { duration: 0 } });
        var elemSelector;

        $(_scrollmagicElements).each(function(i) {
            var $this = $(this);
            elemSelector = 'scroll-scene-' + i;

            $this.addClass(elemSelector);
            //var offset = -($(window).height() / 2);
            //var top = $this.position().top;
            var offset = -($(window).height() / 2) + 200; // + ($this.outerHeight()/2);

            //(ScreensizeHandler.isMdOrSmaller) ? offset += 100: offset += 130; //lower values, shows earlier

            // build sceness
            var scene = new ScrollMagic.Scene({ triggerElement: '.' + elemSelector })
                .setClassToggle('.' + elemSelector, 'active') // add class toggle
                //.addIndicators() // add indicators (requires plugin)
                .on('enter', function(event) {
                    event.target.removeClassToggle();

                    var $parent;
                    if ($this.hasClass('product-info') || $this.hasClass('product-quote')) {
                        $parent = $this.find('.card');
                        $parent.find('> div:first-child').addClass('animated fadeInLeft');
                        $parent.find('> div:last-child').addClass('animated fadeInRight');
                    } else if ($this.hasClass('buttons-section')) {
                        $parent = $this.find('> .section-container');
                        $parent.addClass('animated fadeInUp');
                    } else if ($this.hasClass('hero-image')) {
                        $parent = $this;
                        $parent.find('> .section-container').addClass('animated fadeInUp');
                        if ($this.hasClass('hero-text-image-summary')) {
                            $this.next().delay(700).queue(function() {
                                $(this).addClass('active').find('> .section-container').addClass('animated fadeIn').dequeue();
                            });
                        }
                    } else {
                        $parent = $this;
                        $parent.find('> .section-container').addClass('animated fadeIn');

                        if ($this.hasClass('product-features-section')) {
                            $this.next().queue(function() {
                                $(this).addClass('active').find('> .section-container').addClass('animated fadeIn').dequeue();
                            });
                        }
                    }
                    event.scene = null;
                })
                .offset(offset)
                .addTo(controller);
        });
    }
};
//#endregion

$(window).on('load', function() {
    initScrollMagic(true);
});



(function() {
    $(this).on('flexslider-started', function() {
        initScrollMagic(false);
    })
})();

function initScrollMagic(checkSlider) {
    //if (!$('body').hasClass('home')) {
    //if (typeof useScrollmagic !== 'undefined' && useScrollmagic) {
    if (checkSlider) {
        if (typeof useSlider !== 'undefined' && useSlider) return;
    }
    ScrollmagicHandler.init();
    //}
    //}
}
