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
                var _hiddenDealers = _this._activeList.querySelectorAll('.playlist .hide');
                $(_hiddenDealers).each(function() {
                    $(this).removeClass('hide');
                   
                });
                $(_this._showMore).addClass('hide');
                return false;
            });
        }
    }
};
//#endregion

(function() {
    FindDealerHandler.init();
})();
