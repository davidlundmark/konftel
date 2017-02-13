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
        // var _subtitles = document.querySelectorAll('.same-height .card-top .subtitle.match-height');
        // if(_subtitles !== null) {
        //     $(_subtitles).matchHeight();
        // }

        // var _titles = document.querySelectorAll('.same-height .card-text .title.match-height');
        // if(_titles !== null) {
        //     $(_titles).matchHeight();
        // }

        var _texts = document.querySelectorAll('.same-height .match-height');
        if (_texts !== null) {
            $(_texts).matchHeight();
        } 

        var _texts2 = document.querySelectorAll('.same-height .match-height-title');
        if (_texts2 !== null) {
            $(_texts2).matchHeight();
        } 

        var _texts3 = document.querySelectorAll('.same-height .match-height-text');
        if (_texts3 !== null) {
            $(_texts3).matchHeight();
        } 
    }
})();
