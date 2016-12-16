var vex = null;
var Handlebars = null;

//#region VexHandler
var VexHandler = {
    init: function() {
        var _modal = document.querySelectorAll('.modal-trigger');
        if (_modal === null) return;

        var templateDefault =
            '<p class="title">{{title}}</p>' +
            '<div class="body">' +
            '{{body}}' +
            '</div>';

        $(_modal).on('click', function(e) {
            var $this = $(this);

            if ($this.data('modal-default')) {
                vex.defaultOptions.className = 'modal-default';
                var template = Handlebars.compile(templateDefault);
                var data = {
                    title: $this.data('modal-title'),
                    body: $this.data('modal-body')
                };

                vex.dialog.confirm({
                    unsafeMessage: template(data),
                    //message: 'Are you absolutely sure you want to destroy the alien planet?',
                    callback: function(value) {
                        if (value) {
                            console.log('Successfully destroyed the planet.')
                        } else {
                            console.log('Chicken.')
                        }
                    }
                });
            }

            return false;
        });
    }
};
//#endregion

(function() {
    //Lightbox
    if (typeof useModal !== 'undefined' && useModal) {
        vex = require('vex');
        vex.registerPlugin(require('vex-dialog'));
        vex.dialog.defaultOptions.showCloseButton = true;
        vex.dialog.defaultOptions.buttons = [];

        Handlebars = require('../lib/handlebars-v4.0.5.js');

        VexHandler.init();
    }
})();
