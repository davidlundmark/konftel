require('../lib/jquery.flexslider.js');

//#region FlexsliderHandler
var FlexsliderHandler = {
    $pageslider: null,
    $pageheader: null,
    $flexslider: null,
    $slidertext: null,
    $figCaption: null,
    $directionNav: null,
    itemsVisible: true,
    menuHeight: 0,
    sliderHeight: 0,
    init: function() {
        var _flexsliders = document.querySelector('.page-slider');
        if (_flexsliders === null) return;

        this.$pageslider = $(_flexsliders);
        this.$flexslider = this.$pageslider.find('.flexslider');
        this.$slidertext = this.$pageslider.find('.flexslider-figcaption');
        this.$pageheader = $('.page-header');

        this.$pageslider.find('.slides > li').each(function() {
            var $slide = $(this);
            var $image = $slide.find('img');
            var src = $image.prop('currentSrc') || $image.prop('src');
            $slide.find('.flexslider-image').css('background-image', 'url(' + src + ')');
            $slide.find('picture').remove();
        });

        this.$flexslider.flexslider({
            directionNav: true,
            controlNav: true,
            animationLoop: true,
            slideshow: false,
            slideshowSpeed: 0,
            animation: 'slide',
            useCSS: true,
            startAt: 0,
            init: function(slider) {}.bind(this),
            start: function(slider) {
                this.$directionNav = this.$flexslider.find('.flex-direction-nav a');

                this.$figCaption = this.$pageslider.find('.flexslider-figcaption');
                this.setTopPadding();

                $(window).resize(function() {
                    this.setTopPadding();
                }.bind(this));

                $(window).scroll(function() {
                    this.handleScroll();
                }.bind(this));

                $(document).trigger('flexslider-started',new CustomEvent('flexslider-started'));

            }.bind(this),
            after: function(slider) {}
        });

    },
    setTopPadding: function() {
        this.menuHeight = this.$pageheader.outerHeight();
        this.$pageslider.css({
            'top': this.menuHeight
        });

        /*
        if (ScreensizeHandler.isLgOrSmaller) {
            var height = 0;
            this.$figCaption.each(function() {
                var $this = $(this);
                var currentHeight = $this.height();
                if (currentHeight > height) height = currentHeight;
            });
            this.$figCaption.height(height);
            return;
        }
        */

        this.sliderHeight = ($(window).height() * 0.7) - this.menuHeight;

        $('body').css({
            'padding-top': this.sliderHeight + this.menuHeight
        });

        // $('.content-wrapper').css({
        //     'margin-top': this.sliderHeight + this.menuHeight
        // });

        this.$flexslider.css({
            'height': this.sliderHeight
        });

        this.$figCaption.find('.content').css({
            'top': -this.sliderHeight / 2
        });
    },
    handleScroll: function() {
        if (ScreensizeHandler.isLgOrSmaller) return;
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= (this.sliderHeight + this.menuHeight) / 2) {
            if (this.itemsVisible) {
                this.itemsVisible = false;
                this.$figCaption.stop().fadeOut(400);
                this.$directionNav.stop().fadeOut(200);
            }
        } else {
            if (!this.itemsVisible) {
                this.itemsVisible = true;
                this.$figCaption.stop().fadeIn(400);
                this.$directionNav.stop().fadeIn(200);
            }
        }

        if (scrollTop <= this.sliderHeight + this.menuHeight) {
            this.$pageslider.css({ transform: 'translateY(-' + scrollTop / 2 + 'px)' });
            this.$slidertext.css({ transform: 'translateY(-' + scroll / 2 + 'px)' });
        }
    }
};
//#endregion

$(document).ready(function() {
    //Flex slider
    if (typeof useSlider !== 'undefined' && useSlider) {
        FlexsliderHandler.init();
    }
});


