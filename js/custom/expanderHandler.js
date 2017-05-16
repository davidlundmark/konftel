//#region ExpanderHandler
var ExpanderHandler = {
    initialized: null,
    init: function() {
        if (this.initialized) return;
        this.initialized = true;

        var _triggers = document.querySelectorAll('.expander-trigger');
        if (_triggers === null) return;

        var animating = false;
        $(_triggers).on('click', function(e) {
            if (animating) return;
            var $this = $(this);
            var $expander = $this.closest('.expander');
            animating = true;
            $expander.find('> .expander-content').slideToggle(400, 'easeOutSine', function() {
                var hideText = $this.data('hide-text');
                if (hideText) {
                    if ($(this).is(':visible')) {
                        //$this.width($this.width());
                        $this.text(hideText);
                    } else {
                        $this.text($this.data('show-text'));
                        //$this.width('');
                    }
                }

                animating = false;
            }); // apply the toggle to the ul
            $expander.toggleClass('is-expanded');
            e.preventDefault();
            return false;
        });

    }
};
//#endregion

(function() {
    if (typeof useExpander !== 'undefined' && useExpander) {
        ExpanderHandler.init();
    }
})();
