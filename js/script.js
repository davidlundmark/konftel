//require('./lib/ScrollMagic.min.js');

(function() {
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

(function() {

    //project specific var
    // var useAccordion = true;
    // var useMenuToggle = true;
    // var useSubMenus = true;
    // var useMenuScrollEffect = true;
    // var useCookie = true;

    //libs
    require('./lib/jquery.easing.1.3.js');
    //require('./lib/prism.js');
    //require('./lib/fastclick.js');
    require('./lib/picturefill.js');

    //globals
    require('./custom/screensizeHandler.js');

    //customs
    require('./custom/scrollmagicHandler.js');
    require('./custom/menuscrollHandler.js');
    require('./custom/mobilemenuHandler.js');
    require('./custom/flexsliderHandler.js');
    require('./custom/accordionHandler.js');
    require('./custom/heroimageHandler.js');
    require('./custom/backgroundimageHandler.js');
    //require('./custom/swipeboxHandler.js');
    //require('./custom/carouselHandler.js');
    require('./custom/expanderHandler.js');
    //require('./custom/informationHandler.js');
    require('./custom/cookieHandler.js');
    require('./custom/arrowdownHandler.js');
    require('./custom/matchheightHandler.js');
    require('./custom/dekai.js');

    console.log('deKai v.2-konftel');

    //document.addEventListener("DOMContentLoaded", function() {
    (function() {

        //Anchor card   
        if (typeof useAnchorCard !== 'undefined' && useAnchorCard) {
            if (!deKai.isMobile) {
                var _cards = document.querySelectorAll('.card');
                if (_cards !== null) {
                    $(_cards).filter('.card-anchor').find('.card-link').hover(function() {
                        var $this = $(this).closest('.card');
                        $this.toggleClass('hover');
                        $this.find('.link').toggleClass('hover');
                        $this.find('.card-image-overlay').toggleClass('hover');
                    });
                    /*
                    $(_cards).filter('.card-lightbox').find('.card-image').hover(function() {
                        var $this = $(this);
                        $this.find('.card-image-overlay').toggleClass('hover');
                    });
                    $(_cards).filter('.card-lightbox').find('.card-link').hover(function() {
                        var $this = $(this);
                        var $card = $this.closest('.card');
                        $card.toggleClass('hover');
                        $card.find('.link').toggleClass('hover');
                    });
                    */
                }
            }
        }

        $(document.querySelector('.page-header .search .icon-container')).on('click triggered-click', function(e) {
            var $this = $(this);
            var $searchcontainer = $this.closest('.search-container');
            $searchcontainer.toggleClass('open');
            $this.siblings('.label').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                $(this).focus();
            });

            if (ScreensizeHandler.isBigScreen) return;

            $(document.querySelector('.page-header .logo-container')).toggleClass('no-opacity');

            if (e.type == 'triggered-click') return;

            var _mobilemenu = document.getElementById('mobile-menu');
            if ($(_mobilemenu).hasClass('open')) {
                var _menutoggle = document.querySelector('.menu-toggle');
                $(_menutoggle).trigger('triggered-click', new CustomEvent('triggered-click'));
            }
        });

        $(document.querySelector('.page-header .search .label')).keypress(function(e) {
            if (e.which == 13) {
                alert('SÖK: ' + $(this).val());
            }
        });

        $(document.querySelector('#mobile-menu .search .label')).keypress(function(e) {
            if (e.which == 13) {
                alert('SÖK: ' + $(this).val());
            }
        });

        $(document.querySelector('#mobile-menu .search .icon-container')).on('click', function(e) {
            var $this = $(this);
            alert('SÖK: ' + $this.parent().find('.label').val());
        });

        if (document.querySelector('.page-image') !== null) {
            $('body').css({
                'padding-top': $('.page-header').outerHeight()
            });
        }

        /*
        $('#mobile-menu .search .label').on('click', function(e) {
            var scrollTop = $(window).scrollTop();
            var interval = 0;
            var scroller = setInterval(function() {
                $(window).scrollTop(scrollTop);
                interval++;
                if (interval > 10) {
                    clearInterval(scroller);
                }
            }, 1);
        });
        */

    })();

    $(window).on('load', function() {
        /*
        if (ScreensizeHandler.isBigScreen) {
            
            $('.row.same-height').each(function() {
                var height = 0;
                var $this = $(this);
                var $cardTexts = $this.find('.card-text');
                $cardTexts.each(function() {
                    var $this = $(this);
                    var currentHeight = $this.height();
                    if (currentHeight > height) height = currentHeight;
                });
                $cardTexts.height(height);
                $cardTexts.find('> p').addClass('bottom');
            });
        }
        */

        if (typeof useSubMenus !== 'undefined' && useSubMenus) {
            positionSubmenus();
            $(window).on('resize', positionSubmenus);

            function positionSubmenus() {
                if (!ScreensizeHandler.isBigScreen) return;
                //var $subMenus = $('.page-header li.has-child');
                var _submenus = document.querySelectorAll('.page-header li.has-child');
                if (_submenus === null) return;

                $(_submenus).each(function() {
                    var $this = $(this);
                    //var $text = $this.find('.text');
                    var $subMenu = $this.find('.submenu');
                    var marginLeft = $subMenu.width() * 0.5;
                    marginLeft -= $this.width() * 0.5;
                    //$subMenu.width($text.outerWidth());
                    $subMenu.css({ 'left': -(marginLeft) });
                });
            }
        }

        $('#mobile-menu .content').css({ 'padding-top': $('.page-header').outerHeight() });
        //topmenuHandler.init();

        //fix for showing menu under sitecore toolbar
        if (document.documentElement.className == 'sitecore') {
            var _scRibbon = document.getElementById('scWebEditRibbon');
            var _height = _scRibbon.offsetHeight;
            var _timer = setInterval(function() {
                if (_scRibbon.offsetHeight > _height) {
                    _height = _scRibbon.offsetHeight;
                    $('.page-header').css({ 'top': _height + 'px' });
                    $('#mobile-menu .content').css({ 'padding-top': $('.page-header').outerHeight() + _height });
                    clearInterval(_timer);
                }
            }, 200);
            $(window).trigger('resize');
        }

        var _backtotop = document.querySelector('.back-to-top');
        if (_backtotop !== null) {
            $(_backtotop).bind('click', function(e) {
                var _scrollTop = $(window).scrollTop();
                _scrollTop *= 0.5;
                $('html, body').animate({
                    scrollTop: 0
                }, _scrollTop);
                return false;
            });
        }
    });
})();
