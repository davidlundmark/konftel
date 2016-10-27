//#region HeroImageHandler
var HeroImageHandler = {
    init: function() {
        var _heroImages = document.querySelectorAll('.hero-image');
        if (_heroImages === null) return;

        $(_heroImages).each(function() {
            var $this = $(this);
            var $image = $this.find('img');
            var src = $image.prop('currentSrc') || $image.prop('src');
            $this.find('.background-image').css('background-image', 'url(' + src + ')');
            $this.find('picture').remove();
        });

    }
};
//#endregion

$(document).ready(function() {
    if (typeof useHeroImage !== 'undefined' && useHeroImage) {
        HeroImageHandler.init();
    }
});
