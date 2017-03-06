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
    useZoomEffect: false,
    $images: null,
    init: function() {
        var _flexsliders = document.querySelector('.page-slider');
        if (_flexsliders === null) return;

        this.$pageslider = $(_flexsliders);
        this.$flexslider = this.$pageslider.find('.flexslider');
        this.$slidertext = this.$pageslider.find('.flexslider-figcaption');
        this.$pageheader = $('.page-header');

        this.$pageslider.find('.slides > li').each(function() {
            var $slide = $(this);
            var $image = $(this.querySelector('img')); //$slide.find('img');
            //var src = $image.prop('currentSrc') || $image.prop('src');
            var src = ""; //$image.prop('currentSrc') || $image.prop('src');
            if ($image.prop('currentSrc')) src = $image.prop('currentSrc');
            else src = $image.prop('src');
            var $flexsliderImage = $(this.querySelector('.flexslider-image'));
            $flexsliderImage.css('background-image', 'url(' + src + ')');
            //$slide.find('.flexslider-image').css('background-image', 'url(' + src + ')');
            if ($image.hasClass('use-gradient')) {
                //$slide.find('.flexslider-image')
                $flexsliderImage.css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(' + src + ')');
            }
            $slide.find('picture').remove();
        });

        this.$flexslider.flexslider({
            directionNav: true,
            controlNav: false,
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

                $(window).on('resize.flexslider', function() {
                    this.setTopPadding();
                }.bind(this));

                this.handleScroll();
                $(window).on('scroll.flexslider', function() {
                    this.handleScroll();
                }.bind(this));

                $(document).trigger('flexslider-started', new CustomEvent('flexslider-started'));

            }.bind(this),
            after: function(slider) {}
        });

    },
    setTopPadding: function() {
        $(window).off('resize.flexslider');
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
        var $body = $('body');
        if ($body.hasClass('template-article')) {
            this.sliderHeight = 670; //($(window).height() * 0.7) - this.menuHeight;

            if (ScreensizeHandler.isSmOrSmaller) {
                this.sliderHeight = 400;
            } else if (ScreensizeHandler.isMdOrSmaller) {
                this.sliderHeight = 400;
            } else if (ScreensizeHandler.isLgOrSmaller) {
                this.sliderHeight = 575;
            }
        } else if ($body.hasClass('template-academyarticle')) {
            this.sliderHeight = 480; //($(window).height() * 0.7) - this.menuHeight;

            if (ScreensizeHandler.isSmOrSmaller) {
                this.sliderHeight = 260;
            } else if (ScreensizeHandler.isMdOrSmaller) {
                this.sliderHeight = 260;
            } else if (ScreensizeHandler.isLgOrSmaller) {
                this.sliderHeight = 260;
            }
        } else if ($body.hasClass('template-support-folder') || $body.hasClass('template-uc-page')) {
            this.sliderHeight = 600; //($(window).height() * 0.7) - this.menuHeight;

            if (ScreensizeHandler.isSmOrSmaller) {
                this.sliderHeight = 260;
            } else if (ScreensizeHandler.isMdOrSmaller) {
                this.sliderHeight = 320;
            } else if (ScreensizeHandler.isLgOrSmaller) {
                this.sliderHeight = 388;
            }
        } 
        else {
            this.sliderHeight = 600; //($(window).height() * 0.7) - this.menuHeight;

            if (ScreensizeHandler.isSmOrSmaller) {
                this.sliderHeight = 240;
            } else if (ScreensizeHandler.isMdOrSmaller) {
                this.sliderHeight = 240;
            } else if (ScreensizeHandler.isLgOrSmaller) {
                this.sliderHeight = 320;
            } else if (ScreensizeHandler.isXlScreen) {
                this.sliderHeight = 388;
            }
        }

        if ($body.hasClass('template-home') || $body.hasClass('template-academyarticle')) {
            this.useZoomEffect = false;
        }
        else {
            this.useZoomEffect = true;
        }

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
        /*
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
        */

        if (scrollTop <= this.sliderHeight + this.menuHeight) {
            this.$pageslider.css({ transform: 'translateY(-' + scrollTop + 'px)' });
            if(this.useZoomEffect) {
                if(!this.$images) {
                    this.$images = this.$pageslider.find('.flexslider-image');
                }
                //console.log(scrollTop)
                this.$images.css({ 'background-size': (100 + (scrollTop / 50)) + '%' });
            }
            //this.$pageslider.css({ transform: 'translateY(-' + scrollTop / 2 + 'px)' });
            //this.$slidertext.css({ transform: 'translateY(-' + scroll / 2 + 'px)' });
        }
    }
};
//#endregion

(function() {
    //Flex slider
    if (typeof useSlider !== 'undefined' && useSlider) {
        require('../lib/jquery.flexslider.js');
        FlexsliderHandler.init();
    }
})();
