//#region BackgroundImageHandler
var BackgroundImageHandler = {
    init: function() {
        var _backgroundImages = document.querySelectorAll('picture.background-image');
        if (_backgroundImages === null) return;

        $(_backgroundImages).each(function() {
            var $this = $(this);
            var $image = $this.find('> img');
            var src = $image.prop('currentSrc') || $image.prop('src');
            $this.siblings('.background-image').css('background-image', 'url(' + src + ')');
            $this.remove();
        });

    }
};
//#endregion

(function() {
    if (typeof useBackgroundImages !== 'undefined' && useBackgroundImages) {
        BackgroundImageHandler.init();
    }
})();
