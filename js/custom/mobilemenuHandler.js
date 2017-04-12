//#region MobilemenuHandler
var MobileMenuHandler = {
    lastScrollPos: 0,
    init: function() {
        var _menutoggle = document.querySelector('.menu-toggle');
        if (_menutoggle === null) return;

        $(_menutoggle).on('click triggered-click', function(e) {
                e.stopPropagation();

                var $this = $(this);
                $this.toggleClass('open');
                $this.find('.burger-container').toggleClass('active');

                var $target = $($this.data('target'));
                $target.toggleClass('open');

                $(document.querySelector('.page-header')).toggleClass('menu-open')
                $('body').toggleClass('no-scroll');
                $(document.querySelectorAll('.content-wrapper')).toggleClass('sidenav-open');

                var $content = $target.find('.content');
                //var $blocker = $target.find('.blocker');
                //$blocker.fadeToggle();
                var _blocker = document.querySelector('.blocker');
                var $blocker = $(_blocker);
                $blocker.fadeToggle();
                var $triggers = $content.find('.accordion-trigger');

                if ($target.hasClass('open')) { //menu is open
                    window.scrollTo(0,0);

                    MobileMenuHandler.checkNavHeight($target);

                    $triggers.on('resize-start', function() {
                        $blocker.height(0);
                    });

                    $triggers.on('resize-end', function() {
                        $blocker.height($content.outerHeight());
                        MobileMenuHandler.checkNavHeight($target);
                    });

                    $blocker.on('click touchmove', function(e) {
                        if (e.type == 'click') $this.trigger('click');
                        return false;
                    });

                    $(window).on('resize.mobilemenu', function() {
                        if (ScreensizeHandler.isBigScreen) {
                            $this.trigger('click');
                        }
                    });
                } else {
                    $blocker.off('click touchmove');
                    $triggers.off('resize-start resize-end');
                    MobileMenuHandler.checkNavHeight($target, true); //reset event listeners
                    $(window).off('resize.mobilemenu');
                }

                if(ScreensizeHandler.isBigScreen || e.type == 'triggered-click') return;

                //close search if open
                var _searchcontainer = document.querySelector('.page-header .mobile-search.search-container');
                if ($(_searchcontainer).hasClass('open')) {
                    var _searchtoggle = $(_searchcontainer).find('.search .icon-container');
                    $(_searchtoggle).trigger('triggered-click',new CustomEvent('triggered-click'));
                }
    });
},
checkNavHeight: function($elem, reset) {
    var $content = $elem.find('.content');

    if (reset) {
        $content.off('touchmove touchstart');
        return;
    }

    var $menuHeight = $elem.find('.accordion').outerHeight();
    //var $windowHeight = MobileMenuHandler.viewportToPixels('100vh'); 
    var $windowHeight = $(window).outerHeight() - $('.page-header').outerHeight();

    $content.off('touchmove touchstart');
    var scrollTop = 0;
    if ($menuHeight > $windowHeight) {
        //console.log('enable scroll');
        scrollTop = $(window).scrollTop();
        $elem.addClass('scroll');
        $content.on('touchstart touchmove', function(e) {
            $(window).scrollTop(scrollTop);
        });
    } else {
        //console.log('disable scroll');
        $elem.removeClass('scroll');
        $content.on('touchmove', function(e) {
            return false;
        });
    }
},
viewportToPixels: function (value) {
  var parts = value.match(/([0-9\.]+)(vh|vw)/)
  var q = Number(parts[1])
  var side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]]
  return side * (q/100)
}

};
//#endregion

(function() {
    //if (typeof useMenuToggle !== 'undefined' && useMenuToggle) {
        MobileMenuHandler.init();
    //}
})();
