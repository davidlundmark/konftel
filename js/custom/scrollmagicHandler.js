const ScrollMagic = require('ScrollMagic');
//const ScrollMagicDebug = require('ScrollMagic.debug');

var ScrollmagicHandler = {
    initilized: false,
    init: function() {
        if (ScreensizeHandler.isSmallScreen) return;
        if (deKai.isInSitecore) return;
        if (this.initilized) return;
        this.initilized = true;
        //only use on product page
        //var _useMagic = document.querySelectorAll('.template-product, .template-home');
        //if (_useMagic === null) return;
        //$(_useMagic).find('.content-wrapper:not(.top-content)').addClass('use-animation');

        var $content = $('.content-wrapper:not(.top-content)');
        $content.addClass('use-animation');

        var $scrollmagicElements = $content.find('> .use-magic'); //document.querySelectorAll('.template-product .content-wrapper:not(.top-content) > .page-section');
        if (!$scrollmagicElements.length) return;

        // var filtered = [];
        // $(_scrollmagicElements).each(function() {
        //     var $this = $(this);
        //     if (!$this.hasClass('card-product-info') && !$this.hasClass('find-dealer') && !$this.hasClass('product-tech-spec-section') && !$this.hasClass('hero-text-section') && !$this.hasClass('product-features-section') && !$this.hasClass('documents-section') && !$this.hasClass('list-related') && !$this.hasClass('buttons-section') && !$this.hasClass('academy-featured-picker-section')) {
        //         filtered.push($this);
        //     } else {
        //         $this.addClass('active');
        //     }
        // });

        //if (!$(filtered).length) return;

        // init controller
        var controller = new ScrollMagic.Controller({ globalSceneOptions: { duration: 0 } });
        var elemSelector;

        //$(filtered).each(function(i) {
        $scrollmagicElements.each(function(i) {
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
                    var $useFadeInUp = $this.find('.useFadeInUp');
                    $useFadeInUp.each(function() {
                        var $this = $(this);
                        $this.addClass('animated fadeInUp');
                        /*
                        if ($this.hasClass('useFadeDelay')) {
                            setTimeout(function() {
                                //$this.addClass('animated fadeInUp');
                                $this.fadeIn({ duration: 200, queue: false }).css('display', 'none').slideDown();  
                            }, 2000);
                        } else {
                            
                        }
                        */
                        var $soundIcon = $this.find('.audio');
                        if ($soundIcon.length) {
                            $soundIcon.addClass('fadeInUpAudio');
                            // setTimeout(function() {
                            //     $soundIcon.animate({ bottom: '0' }, { duration: 200 });
                            //     setTimeout(function() {
                            //         $soundIcon.animate({ opacity: '1' }, { duration: 200, queue: false });
                            //     }, 200);
                            // }, 300);
                        }
                    });
                    /*
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
                    } else if ($this.hasClass('youtube-section')) {
                        $parent = $this;
                        $parent.find('> .section-container').addClass('animated fadeInLeft');
                        var $iframe = $parent.find('iframe');
                        var _src = $iframe.attr('src');
                        //$iframe.attr('src', _src + (_src.indexOf('?') ? '&autoplay=1' : '?autoplay=1'));
                    } else {
                        $parent = $this;
                        $parent.find('> .section-container').addClass('animated fadeIn');

                        if ($this.hasClass('product-features-section')) {
                            $this.next().queue(function() {
                                $(this).addClass('active').find('> .section-container').addClass('animated fadeIn').dequeue();
                            });
                        }
                    }
                    */
                    //event.scene = null;
                    controller.removeScene(event.target);
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
    if (typeof useScrollmagic !== 'undefined' && useScrollmagic) {
        if (checkSlider) {
            if (typeof useSlider !== 'undefined' && useSlider) return;
        }
        ScrollmagicHandler.init();
    }
}
