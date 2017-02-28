var vex = null;
var Handlebars = null;

//#region VexHandler
var VexHandler = {
    openVex: function(contentEl, setHeight) {
        var marginTop = Math.round(contentEl.offsetHeight / 2);
        contentEl.style.marginTop = -(marginTop + 40) + 'px';
        contentEl.style.marginLeft = -(Math.round(contentEl.offsetWidth / 2)) + 'px';
        $(contentEl).animate({ 'marginTop': -marginTop }, 500);

        if (setHeight) {
            contentEl.style.height = contentEl.offsetHeight + 'px';
            contentEl.style.width = contentEl.offsetWidth + 'px';
            contentEl.className += contentEl.className ? ' open' : 'open';
        }

        var _this = this;
        $(window).on('resize.vex', function() {
            $(window).off('resize.vex');
            vex.closeAll();
        });
    },
    closeVex: function(contentEl) {
        $(window).off('resize.vex');
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

    titleModal: function() {
        var _triggers = document.querySelectorAll('.modal-trigger[data-modal-template="title"]');
        if (_triggers === null) return;

        var _this = this;

        var templateTitle = '<h2 class="title">{{title}}</h2>';

        //console.log(_triggers)

        $(_triggers).on('click', function(e) {
            //var $this = $(e.target);

            vex.defaultOptions.className = 'modal-title';
            var template = Handlebars.compile(templateTitle);
            var data = {
                title: this.getAttribute('data-modal-title')
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

    imageModal: function() {
        var _triggers = document.querySelectorAll('.modal-trigger[data-modal-template="image"]');
        if (_triggers === null) return;

        var _this = this;

        //console.log(_triggers)

        $(_triggers).on('click', function(e) {
            var $this = $(e.target);
            var templateImage = $this.closest('.card').prop('outerHTML');

            vex.defaultOptions.className = 'modal-image';

            vex.dialog.defaultOptions.buttons = [];
            vex.dialog.confirm({
                unsafeMessage: templateImage,
                //unsafeMessage: template(data),
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

    accessoriesModal: function() {
        var _triggers = document.querySelectorAll('.modal-trigger[data-modal-template="accessories"]');
        if (_triggers === null) return;

        var _this = this;

        //console.log(_triggers)

        $(_triggers).on('click', function(e) {
            var $this = $(e.target);
            var templateAccessories = $this.siblings('.card-modal').clone();
            templateAccessories.removeClass('hide');
            templateAccessories = templateAccessories.prop('outerHTML');

            vex.defaultOptions.className = 'modal-accessories';

            vex.dialog.defaultOptions.buttons = [];
            vex.dialog.confirm({
                unsafeMessage: templateAccessories,
                //unsafeMessage: template(data),
                afterOpen: function() {
                    _this.openVex(this.contentEl);
                    $(this.contentEl).find('.accessory-selector-modal').on('change', function() {
                        var val = $(this).val();
                        if (val != '')
                            location.href = val;
                    });
                },
                beforeClose: function() {
                    $(this.contentEl).find('.accessory-selector-modal').off('change');
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

    languageModal: function() {
        var _triggers = document.querySelector('.modal-trigger[data-modal-template="language"]');
        if (_triggers === null) return;

        var _this = this;

        var templateLanguage = document.querySelector('.language-modal');
        templateLanguage.remove();
        $(templateLanguage).removeClass('hide');

        var language = navigator.languages && navigator.languages[0] ||
            navigator.language ||
            navigator.userLanguage;

        var twoLetterCode = '';
        if (language) {
            var twoLetterCode = language.substring(0, 2);
            //remove this later
            $(templateLanguage).find('#language').text(language.substring(0, 2));
        }

        var _continueText = templateLanguage.querySelector('.language-' + twoLetterCode);
        //show 'Continue in ...' in users native browser language, if not supported, show default text
        if (_continueText === null) {
            _continueText = templateLanguage.querySelector('.language-default');
        }

        $(_continueText).removeClass('hide');

        var _findDealerLink = templateLanguage.querySelector('.findadealar');
        $(_findDealerLink).on('click', function(e) {
            $(window).trigger('resize.vex');
            return false;
        });

        if ($('body').hasClass('template-home')) {
            var cookie = this.readCookie('language');
            if (!cookie) {
                //console.log('show language!!');
                //this.addCookie('language', true, 21);
                $(_triggers).trigger('click');
            } else {
                console.log('Do not show language, cookie already set.');
            }
        }

        $(_triggers).on('click', function(e) {
            var $this = $(this);

            vex.defaultOptions.className = 'modal-language';

            vex.dialog.defaultOptions.buttons = [];
            vex.dialog.confirm({
                unsafeMessage: templateLanguage,
                afterOpen: function() {
                    _this.openVex(this.contentEl, true);
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
                var cId = cookie[i].split('#')[0];
                $item = $(document.getElementById(cId));
                var removeText = $item.data('compare-remove');
                $item.text(removeText);
            }
        }

        //html template for compare modal
        var templateCompare =
            '<p class="title h3">{{title}}</p>' +
            '<div class="body large">' +
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
            '<a class="brand-link" href="#" data-id="{{this.id}}">{{../removeText}}</a>' +
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
                console.log('create cookie');
                _this.addCookie('compare', this.id, 21);
                cookie = _this.readCookie('compare').split(',');
                $this.text(removeText);
            } else { //maximum number of compare reached
                //bodyText = CompareMaxItems;
                bodyText = CompareText;
            }

            var items = [];
            var $item = null;
            for (var i = 0; i <= cookie.length - 1; i++) {
                var cookieVar = cookie[i].split('#');
                var cId = cookieVar[0];
                var cText = cookieVar[1];
                var cImage = cookieVar[2];
                $item = $(document.getElementById(cookie[i]));
                items.push({
                    //title: $item.data('modal-title'),
                    //image: $item.data('modal-image'),
                    //id: cookie[i]
                    id: cId,
                    title: cText,
                    image: cImage
                });
            }

            // if (bodyText == null) {
            //     if (items.length == 1) bodyText = CompareOneItem;
            //     else if (items.length == 2) bodyText = CompareTwoItems;
            //     else if (items.length == 3) bodyText = CompareThreeItems;
            // }

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
            /*
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
            */

            buttonText = CompareButtonText;
            bodyText = CompareText;
            linkText = CompareCloseText;

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
                $this.off('click').closest('li').remove();
                console.log('remove cookie')
                _this.removeCookie('compare', id, 21);
                var $item = $(document.getElementById(id));
                var addText = $item.data('compare-add');
                $item.text(addText);
                //vex.closeAll();
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

        if(name == 'compare') {
            var $item = $(document.getElementById(value));
            //console.log($item.data('modal-image'));
            //console.log($item.data('modal-title'));
            value += '#'+$item.data('modal-title');
            value += '#'+$item.data('modal-image');
        }

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

        if(name == 'compare' && _cookie) {
            _cookie = _cookie.split(',');
            _cookie = _cookie.filter(function(e) {
                return e.split('#')[0] !== value;
            });
            _cookie = _cookie.toString();
        }
        else if (_cookie) {
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
            var defaultVexHandler = $.extend({}, VexHandler);
            defaultVexHandler.defaultModal();
        }

        if (typeof useModalCompare !== 'undefined' && useModalCompare) {
            var compareVexHandler = $.extend({}, VexHandler);
            compareVexHandler.compareModal();
        }

        if (typeof useOnComparePage !== 'undefined' && useOnComparePage) {
            var comparePageVexHandler = $.extend({}, VexHandler);
            comparePageVexHandler.comparePage();
        }

        if (typeof useModalRegister !== 'undefined' && useModalRegister) {
            var registerVexHandler = $.extend({}, VexHandler);
            registerVexHandler.registerModal();
        }

        if (typeof useModalLanguage !== 'undefined' && useModalLanguage) {
            var languageVexHandler = $.extend({}, VexHandler);
            languageVexHandler.languageModal();

            $(window).on('load', function() {
                var _triggers = document.querySelector('.modal-trigger[data-modal-template="language"]');
                if (_triggers === null) return;

                if ($('body').hasClass('template-home')) {
                    var cookie = VexHandler.readCookie('language');
                    if (!cookie) {
                        VexHandler.addCookie('language', true, 21);
                        $(_triggers).trigger('click');
                    }
                }
            });
        }

        if (typeof useModalTitle !== 'undefined' && useModalTitle) {
            var titleVexHandler = $.extend({}, VexHandler);
            titleVexHandler.titleModal();
        }

        if (typeof useModalImage !== 'undefined' && useModalImage) {
            var imageVexHandler = $.extend({}, VexHandler);
            imageVexHandler.imageModal();
        }

        if (typeof useModalAccessories !== 'undefined' && useModalAccessories) {
            var accessoriesVexHandler = $.extend({}, VexHandler);
            accessoriesVexHandler.accessoriesModal();
        }
    }
})();
