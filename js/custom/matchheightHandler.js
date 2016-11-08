require('../lib/jquery.matchHeight.js');

$(document).ready(function() {
    //Grid same height
    if (typeof useGridSameHeight !== 'undefined' && useGridSameHeight) {
        var _sameheight = document.querySelectorAll('.same-height');
        if (_sameheight !== null) {
            $(_sameheight).find('> .column').matchHeight();
            //$('.same-height > .column').matchHeight();
        }
    }
});
