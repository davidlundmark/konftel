//#region FindDealerHandler
var FindDealerHandler = {
    _activeList: null,
    _showMore: null,
    init: function() {
        var _dropdown = document.getElementById('select_country');
        if (_dropdown === null) return;

        this._activeList = document.querySelector('.find-dealer .dealers.show');
        var _this = this;

        $(_dropdown).on('change', function() {
            $(_this._activeList).removeClass('show').addClass('hide');
            _this._activeList = document.getElementById(this.value);
            $(_this._activeList).removeClass('hide').addClass('show');
            _this.setupShowAll();
        });

        this.setupShowAll();
    },
    setupShowAll: function() {
        if (this._showMore) {
            $(this._showMore).off('click');
        }

        this._showMore = this._activeList.querySelector('.load-more');
        var _this = this;

        if (this._showMore !== null) {
            $(this._showMore).on('click', function(e) {
                //var hideText = $this.data('hide-text');
                //if (hideText) {
                var $this = $(this);
                    if ($this.hasClass('closed')) {
                        $this.find('.info').text($this.data('hide-text'));
                        $this.removeClass('closed').addClass('open');
                        var _hiddenDealers = _this._activeList.querySelectorAll('.playlist .hide');
                        $(_hiddenDealers).each(function() {
                            $(this).removeClass('hide').addClass('show');
                        });
                    } else {
                        $this.find('.info').text($this.data('show-text'));
                        $this.removeClass('open').addClass('closed');
                        var _hiddenDealers = _this._activeList.querySelectorAll('.playlist .show');
                        $(_hiddenDealers).each(function() {
                            $(this).removeClass('show').addClass('hide');
                        });
                    }
                //}

                return false;
            });
        }
    }
};
//#endregion

(function() {
    FindDealerHandler.init();
})();
