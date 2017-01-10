var vex = null;
var Handlebars = null;

//#region VexHandler
var VexHandler = {
    openVex: function(contentEl) {
        var marginTop = Math.round(contentEl.offsetHeight / 2);
        contentEl.style.marginTop = -(marginTop + 40) + 'px';
        contentEl.style.marginLeft = -(Math.round(contentEl.offsetWidth / 2)) + 'px';
        $(contentEl).animate({ 'marginTop': -marginTop }, 500);
    },
    closeVex: function(contentEl) { 
        var marginTop = parseInt(contentEl.style.marginTop, 10) - 40;
        $(contentEl).animate({ 'marginTop': marginTop + 'px' }, 500);
    },
    comparePage: function() {
        var _triggers = document.querySelectorAll('.remove-table-data');
        if (_triggers === null) return;

        var _this = this;

        $(_triggers).on('click', function(e) {
            console.log('remove cookie')
            _this.removeCookie('compare', this.getAttribute('data-id'), 21);
            //window.location.reload(false); 
            var column = this.getAttribute('data-column');

            var elems = document.querySelector('.compare-table tr:first-child > *:nth-child(' + column + ') ~ td');
            $(elems).each(function(i) {
                console.log(this.querySelector('a'))
                this.querySelector('a').setAttribute('data-column', parseInt(column) + i);
            });

            var remaining = document.querySelectorAll('.compare-table tr:first-child > *');
            if (remaining.length - 2 <= 1) {
                // $(document.querySelector('.compare-info')).fadeOut();
                // $(document.querySelector('.compare-table')).slideToggle();
                // $(document.querySelector('.no-items')).fadeIn();
                window.location.reload(false);
            } else {
                $(document.querySelectorAll('.compare-table tr')).each(function() {
                    $(this).find('*:nth-child(' + column + ')').remove();
                });
            }

            return false;
        });
    },
    defaultModal: function() {
        var _triggers = document.querySelectorAll('.modal-trigger[data-modal-template="default"]');
        if (_triggers === null) return;

        var _this = this;

        var templateDefault =
            '<p class="title">{{title}}</p>' +
            '<div class="body">' +
            '{{body}}' +
            '</div>';

        var _this = this;

        $(_triggers).on('click', function(e) {
            var $this = $(this);

            vex.defaultOptions.className = 'modal-default';
            var template = Handlebars.compile(templateDefault);
            var data = {
                title: $this.data('modal-title'),
                body: $this.data('modal-body')
            };

            vex.dialog.defaultOptions.buttons = [];
            vex.dialog.confirm({
                unsafeMessage: template(data),
                afterOpen: function() {
                    _this.openVex(this.contentEl);
                },
                beforeClose: function() {
                    _this.closeVex(this.contentEl);
                },
                callback: function(value) {
                    if (value) {
                        //console.log('Successfully destroyed the planet.')
                    } else {
                        //console.log('Chicken.')
                    }
                }
            });

            return false;
        });
    },

    registerModal: function() {
        var _triggers = document.querySelectorAll('.modal-trigger[data-modal-template="register"]');
        if (_triggers === null) return;

        var _this = this;

        var templateRegister = document.querySelector('.register-modal');
        templateRegister.remove();
        $(templateRegister).removeClass('hide');

        $(_triggers).on('click', function(e) {
            var $this = $(this);

            vex.defaultOptions.className = 'modal-register';

            vex.dialog.defaultOptions.buttons = [];
            vex.dialog.confirm({
                unsafeMessage: templateRegister,
                afterOpen: function() {
                    _this.openVex(this.contentEl);
                },
                beforeClose: function() {
                    _this.closeVex(this.contentEl);
                },
                callback: function(value) {
                    if (value) {
                        //console.log('Successfully destroyed the planet.')
                    } else {
                        //console.log('Chicken.')
                    }
                }
            });

            return false;
        });
    },

    compareModal: function() {
        var _triggers = document.querySelectorAll('[data-modal-template="compare"]');
        if (_triggers === null) return;

        //switch text for already added products
        var cookie = this.readCookie('compare')

        if (cookie) {
            cookie = cookie.split(',');
            var $item = null;
            for (var i = 0; i <= cookie.length - 1; i++) {
                $item = $(document.getElementById(cookie[i]));
                var removeText = $item.data('compare-remove');
                $item.text(removeText);
            }
        }

        //html template for compare modal
        var templateCompare =
            '<p class="title">{{title}}</p>' +
            '<div class="body">' +
            '{{body}}' +
            '</div>' +
            '<ul class="compare-list">' +
            '{{#each items}}' +
            '<li>' +
            '<div class="card-horizontal card-compare">' +
            '<div class="card-image">' +
            '<span class="background-image" style="background-image: url(\'{{this.image}}\'")"></span>' +
            '</div>' +
            '<div class="card-text">' +
            '<p class="bold">{{this.title}}</p>' +
            '</div>' +
            '<div class="card-link">' +
            '<a href="#" data-id="{{this.id}}">{{../removeText}}</a>' +
            '</div>' +
            '</div>' +
            '</li>' +
            '{{/each}}' +
            '</ul>';

        var _this = this;

        //click on triggers...
        $(_triggers).on('click', function(e) {
            var $this = $(this);
            var cookie = _this.readCookie('compare');
            var bodyText = null;

            if (cookie) {
                cookie = cookie.split(',');
            }

            //check if maximum compare items is reached
            var addText = $this.data('compare-add');
            var removeText = $this.data('compare-remove');

            if ($this.text() == removeText) { //remove
                console.log('remove cookie')
                _this.removeCookie('compare', this.id, 21);
                $this.text(addText);
                return false;
            } else if (!cookie || cookie.length < 3) { //add
                console.log('create cookie')
                _this.addCookie('compare', this.id, 21);
                cookie = _this.readCookie('compare').split(',');
                $this.text(removeText);
            } else { //maximum number of compare reached
                bodyText = CompareMaxItems;
            }

            var items = [];
            var $item = null;
            for (var i = 0; i <= cookie.length - 1; i++) {
                $item = $(document.getElementById(cookie[i]));
                items.push({
                    title: $item.data('modal-title'),
                    image: $item.data('modal-image'),
                    id: cookie[i]
                });
            }

            if (bodyText == null) {
                if (items.length == 1) bodyText = CompareOneItem;
                else if (items.length == 2) bodyText = CompareTwoItems;
                else if (items.length == 3) bodyText = CompareThreeItems;
            }

            vex.defaultOptions.className = 'modal-compare';
            var template = Handlebars.compile(templateCompare);

            var data = {
                title: CompareTitle,
                body: bodyText,
                items: items,
                removeText: CompareRemove
            };

            var buttonText;
            var linkText;
            var linkClass = 'vex-link';

            //setup buttons for modal
            if (items.length == 1) {
                buttonText = CompareOneItemButton;
                linkClass = 'hide';
            } else if (items.length == 2) {
                buttonText = CompareTwoItemsButton;
                linkText = CompareTwoItemsLink;
            } else if (items.length == 3) {
                buttonText = CompareThreeItemsButton;
                linkText = CompareThreeItemsLink;
            }

            vex.dialog.open({
                unsafeMessage: template(data),
                buttons: [
                    $.extend({}, vex.dialog.buttons.NO, {
                        className: linkClass,
                        text: linkText,
                        click: function(e) {
                            this.close();
                            return false;
                        }
                    }),
                    $.extend({}, vex.dialog.buttons.NO, {
                        className: 'vex-button',
                        text: buttonText,
                        click: function() {
                            if (items.length == 1) {
                                this.close();
                            } else {
                                //TO-DO: link to compare page
                                window.location.href = '/Compare';
                            }
                            return false;
                        }
                    })
                ],
                afterOpen: function() {
                    _this.openVex(this.contentEl);
                },
                beforeClose: function() {
                    _this.closeVex(this.contentEl);
                },
                callback: function(value) {
                    //console.log('Choice', value);
                }
            });

            var removeLinks = document.querySelectorAll('.card-compare a');
            $(removeLinks).on('click', function(e) {
                var $this = $(this);
                var id = $this.data('id')
                    //$this.off('click').closest('li').remove();
                console.log('remove cookie')
                _this.removeCookie('compare', id, 21);
                var $item = $(document.getElementById(id));
                var addText = $item.data('compare-add');
                $item.text(addText);
                vex.closeAll();
                return false;
            });

            return false;
        });
    },

    addCookie: function(name, value, days, override) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";

        if (!override) {
            var _cookie = this.readCookie(name);
            if (!_cookie) value = value;
            else value = _cookie + ',' + value;
        }

        document.cookie = name + "=" + value + expires + "; path=/";

        console.log('cookie', this.readCookie(name));
    },

    removeCookie: function(name, value) {
        var _cookie = this.readCookie(name);

        if (_cookie) {
            _cookie = _cookie.split(',');
            _cookie = _cookie.filter(function(e) {
                return e !== value;
            });
            _cookie = _cookie.toString();
        }

        if (!_cookie) this.addCookie(name, '', -1, true);
        else this.addCookie(name, _cookie, 21, true);
    },

    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};
//#endregion

(function() {
    //
    if (typeof useModal !== 'undefined' && useModal) {
        vex = require('vex');
        vex.registerPlugin(require('vex-dialog'));
        vex.dialog.defaultOptions.showCloseButton = true;

        Handlebars = require('../lib/handlebars-v4.0.5.js');

        if (typeof useModalDefault !== 'undefined' && useModalDefault) {
            VexHandler.defaultModal();
        }

        if (typeof useModalCompare !== 'undefined' && useModalCompare) {
            VexHandler.compareModal();
        }

        if (typeof useOnComparePage !== 'undefined' && useOnComparePage) {
            VexHandler.comparePage();
        }

        if (typeof useModalRegister !== 'undefined' && useModalRegister) {
            VexHandler.registerModal();
        }
    }
})();
