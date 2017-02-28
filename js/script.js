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
    //require('./lib/tooltip.js');

    //globals
    require('./custom/screensizeHandler.js');
    require('./custom/matchheightHandler.js');
    require('./custom/dekai.js');

    //customs
    require('./custom/scrollmagicHandler.js');
    require('./custom/menuscrollHandler.js');
    require('./custom/mobilemenuHandler.js');
    require('./custom/flexsliderHandler.js');
    require('./custom/accordionHandler.js');
    require('./custom/heroimageHandler.js');
    require('./custom/backgroundimageHandler.js');
    //require('./custom/swipeboxHandler.js');
    require('./custom/carouselHandler.js');
    require('./custom/expanderHandler.js');
    //require('./custom/informationHandler.js');
    require('./custom/cookieHandler.js');
    require('./custom/arrowdownHandler.js');
    require('./custom/audioHandler.js');
    require('./custom/loginHandler.js');
    require('./custom/webapiHandler.js');
    require('./custom/findDealerHandler.js');
    //require('./custom/submenuHandler.js');
    require('./custom/vexHandler.js');

    console.log('deKai v.2-konftel');

    (function() {

        if (typeof useAccessoriesSearch !== 'undefined' && useAccessoriesSearch) {
            var _accButton = document.getElementById('accessories-search-button');
            if (_accButton !== null) {
                var _accSelect = document.getElementById('acc_select_product');
                var _accInput = document.getElementById('acc_search_field');
                $(_accButton).on('click', function(e) {
                    var _selectVal = $(_accSelect).find('option:selected').val();
                    var _inputVal = $(_accInput).val();

                    var _accessoriesRow = document.querySelectorAll('.list-accessories-section .row');
                    var $accessories = $(_accessoriesRow).find('> .column');
                    var $matchingAccessories = $accessories.length;

                    var $counter = $(document.getElementById('accessories-count'));

                    if (_selectVal == 'All' && !_inputVal) {
                        $accessories.show();
                        $counter.text($accessories.length);
                        return;
                    }

                    if (_selectVal != 'All' && _inputVal) {
                        console.log('sel', _selectVal);
                        console.log('inp', _inputVal);
                        $matchingAccessories = $(_accessoriesRow).find("> .column[data-products*='" + _selectVal + "'][data-serialnumber*='" + _inputVal + "']");
                    } else if (_selectVal != 'All') {
                        console.log('sel', _selectVal);
                        $matchingAccessories = $(_accessoriesRow).find("> .column[data-products*='" + _selectVal + "']");
                    } else if (_inputVal) {
                        console.log('inp', _inputVal);
                        $matchingAccessories = $(_accessoriesRow).find("> .column[data-serialnumber*='" + _inputVal + "']");
                    }

                    $accessories.hide();
                    $matchingAccessories.show();
                    $counter.text($matchingAccessories.length);

                    return false;
                });
            }
        }

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

        var _mobileFindADealer = document.getElementById('mobilefindadealer');
        if (_mobileFindADealer !== null) {
            $(_mobileFindADealer).on('click', function(e) {
                var _menutoggle = document.querySelector('.menu-toggle');
                _menutoggle.click();
                return false;
            });
        }

        var _searchButtons = document.querySelectorAll('.page-header .search .icon-container');
        $(_searchButtons).on('click triggered-click', function(e) {
            //console.log('yeah')
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

        // $(document.querySelector('.page-header .search .label')).keypress(function(e) {
        //     if (e.which == 13) {
        //         alert('SÖK: ' + $(this).val());
        //     }
        // });

        // $(document.querySelector('#mobile-menu .search .label')).keypress(function(e) {
        //     if (e.which == 13) {
        //         alert('SÖK: ' + $(this).val());
        //     }
        // });

        // $(document.querySelector('#mobile-menu .search .icon-container')).on('click', function(e) {
        //     var $this = $(this);
        //     alert('SÖK: ' + $this.parent().find('.label').val());
        // });

        //if (document.querySelector('.page-image') !== null) {
        if (document.querySelector('.page-slider') === null) {
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

        //$('#mobile-menu .content').css({ 'padding-top': $('.page-header').outerHeight() });
        //topmenuHandler.init();

        //fix for showing menu under sitecore toolbar
        if (deKai.isInSitecore) {
            //if(document.querySelector('.page-slider') === null) $(document.querySelector('.content-wrapper')).css({ 'padding-top': headerHeight });
            var _scRibbon = document.getElementById('scWebEditRibbon');
            if (_scRibbon === null) return;

            var _height = 0;

            fixRibbon();

            function fixRibbon() {
                if (_scRibbon.offsetHeight != _height) {
                    //if (_scRibbon.offsetHeight > _height) {
                    _height = _scRibbon.offsetHeight;
                    $('.page-header').css({ 'top': _height });
                    $('#mobile-menu .content').css({ 'padding-top': $('.page-header').outerHeight() + _height });
                    $('.page-slider').css({ 'padding-top': _height });
                    $(window).trigger('resize');
                    //}
                }
                window.setTimeout(fixRibbon, 500);
            }
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

        //if (typeof useAnchor !== 'undefined' && useAnchor) {
        var _anchorlinks = document.querySelectorAll('a[href*="#"]:not([href="#"])');
        if (_anchorlinks !== null) {
            $(_anchorlinks).click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1500);
                        return false;
                    }
                } else {
                    console.log('The element was not found:', this)
                }
            });
        }
        //}

    });
})();
