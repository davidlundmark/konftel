//#region MenuScrollHandler
var MenuScrollHandler =  {
    $pageheader: null,
    scrolledClass: 'scrolled',
    hideClass: 'slide-up',
    scrolled: false,
    hidden: false,
    senseSpeed: 5,
    offsetTop: 0,
    prevScrollTop: 0,
    init: function() {
        var _pageheader = document.querySelectorAll('.page-header');
        if (_pageheader === null) return;

        this.$pageheader = $(_pageheader);
        //console.log(ScreensizeHandler.isBigScreen)
        
        if (window.ScreensizeHandler.isBigScreen && document.querySelector('.flexslider') !== null) {
        //if (window.ScreensizeHandler.isBigScreen && $('.flexslider').length) {
            this.offsetTop = 200;
        } else {
            this.offsetTop = this.$pageheader.outerHeight();
        }

        $(window).scroll(function() {
            this.handleTopMenu();
        }.bind(this));
    },
    handleTopMenu: function() {
        if (this.$pageheader.hasClass('menu-open')) return;

        var scrollTop = $(window).scrollTop();

        //console.log(this.offsetTop, scrollTop)

        //change bg color, hide flexslider nav
        if (scrollTop >= this.offsetTop) {
            if (!this.scrolled) {
                this.scrolled = true;
                this.$pageheader.addClass(this.scrolledClass);
            }
        } else {
            if (this.scrolled) {
                this.scrolled = false;
                this.$pageheader.removeClass(this.scrolledClass);
            }
        }

        if (scrollTop >= this.offsetTop) {
            //hide show menu
            if (scrollTop - this.senseSpeed > this.prevScrollTop) {
                if (!this.hidden) {
                    this.hidden = true;
                    this.$pageheader.addClass(this.hideClass);
                }
            } else if (scrollTop + this.senseSpeed < this.prevScrollTop) {
                if (this.hidden) {
                    this.hidden = false;
                    this.$pageheader.removeClass(this.hideClass);
                }
            }
        } else {
            if (this.hidden) {
                this.hidden = false;
                this.$pageheader.removeClass(this.hideClass);
            }
        }
        this.prevScrollTop = scrollTop;
    }
};
//#endregion

$(window).on('load', function() {
    if (typeof useMenuScrollEffect !== 'undefined' && useMenuScrollEffect) {
        MenuScrollHandler.init();
    }
});