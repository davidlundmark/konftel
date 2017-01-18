MatchHeightHandler = {
    update: function(selector) {
        var _elements = document.querySelectorAll(selector);
        $(selector).matchHeight({ remove: true });
        $(_elements).matchHeight();
    }
};

(function() {
    //Grid same height
    if (typeof useGridSameHeight !== 'undefined' && useGridSameHeight) {
        require('../lib/jquery.matchHeight.js');
        if ($('html').hasClass('ie-old')) { //only do this for IE <= 9
            var _sameheight = document.querySelectorAll('.same-height');
            if (_sameheight !== null) {
                $(_sameheight).find('> .column').matchHeight();
            }
        }
       
        //only map subtitle heights to largest
        var _subtitles = document.querySelectorAll('.same-height .card-top .subtitle');
        if(_subtitles !== null) {
            $(_subtitles).matchHeight();
        }

        var _titles = document.querySelectorAll('.same-height .card-text .title');
        if(_titles !== null) {
            $(_titles).matchHeight();
        }
    }
})();
