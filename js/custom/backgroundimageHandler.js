//#region BackgroundImageHandler
var BackgroundImageHandler = {
    init: function() {
        var _backgroundImages = document.querySelectorAll('picture.background-image');
        if (_backgroundImages === null) return;
        $(_backgroundImages).each(function() {
            var $this = $(this);
            var $image = $this.find('> img');
            var src = ""; //$image.prop('currentSrc') || $image.prop('src');
            if ($image.prop('currentSrc')) src = $image.prop('currentSrc');
            else src = $image.prop('src');
            //console.log($image, src)
            $this.siblings('.background-image').css('background-image', 'url(' + src + ')');
            $this.remove(); 
        });

    }
};
//#endregion

(function() {
    //if (typeof useBackgroundImages !== 'undefined' && useBackgroundImages) {
    BackgroundImageHandler.init();
    //}
})();
