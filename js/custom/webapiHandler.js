//#region WebApiHandler
var WebApiHandler = {
    id: '',
    apiUrl: window.location.origin + '/sitecore/api/ssc/konftel/WebApi/1337/',
    page: 2,
    pageSize: 3,
    $item: null,
    items: [],
    $loadmore: null,
    $row: null,
    init: function(Id) {
        this.id = Id;

        //get DOM template elements
        var _grid = document.getElementById(Id + '-grid');
        var _item = document.getElementById(Id + '-item-template');

        if (_grid === null || _item === null) {
            console.log('Associated DOM elements not found!');
            return;
        }

        this.$item = $(_item);
        this.$row = $(_grid.querySelector('.row'));

        //remove ID
        this.$item.removeAttr('id');

        //remove from DOM
        this.$item.remove();

        //remove Class
        this.$item.removeClass('hide');

        //push all current .column into items Array
        var _columns = _grid.querySelectorAll('.column');
        $.each(_columns, function(i, item) {
            this.items.push(item);
        }.bind(this));


        //load more button
        var _loadmore = document.getElementById(Id + '-load-more');
        if (_loadmore !== null) {
            this.$loadmore = $(_loadmore);
            this.$loadmore.on('click', function(e) {
                //if already loading, stop
                if (this.$loadmore.hasClass('loading')) return false;

                this.$loadmore.height(this.$loadmore.height());
                this.$loadmore.width(this.$loadmore.width());
                this.$loadmore.addClass('loading');
                this.$row.addClass('loading');

                //***********IMPORTANT!*********** remove timeout later, only for visual
                setTimeout(function() {
                    this.getStories(this.createStoryItems);
                }.bind(this), 600);
                return false;
            }.bind(this));
        }

        //no result text
        //var _noresult = document.querySelector('.no-result');
        //if (_noresult !== null) {
        //    this.$noResult = $(_noresult);
        //}
    },
    createStoryItems: function(_this, data) {
        // if (data.length < _this.pageSize) {
        //     //end reached, hide load more
        //     if (!_this.$loadmore.hasClass('hide')) _this.$loadmore.addClass('hide');
        // } else {
        //     if (_this.$loadmore.hasClass('hide')) _this.$loadmore.removeClass('hide');
        // }

        //loop thru result and create new <li> DOM elements
        $.each(data, function(i, item) {
            var _clone = _this.$item.clone()[0];

            if (_this.id == 'event') {
                //Month 
                _clone.querySelector('.month').innerHTML = item.Month;
                //Day
                _clone.querySelector('.date').innerHTML = item.Day;
            } else {
                //Top Text
                _clone.querySelector('.top-text').innerHTML = item.TopText;

                //Top Date
                _clone.querySelector('.top-date').innerHTML = item.Date;

                //Top Image
                _clone.querySelector('.top-image').src = item.TopImage;
            }

            if(_this.id == 'pressrelease') {
                _clone.querySelector('.top-text').className += " brand-color-secondary";
            }

            //Title
            _clone.querySelector('.title').innerHTML = item.Title;

            //Summary
            _clone.querySelector('.summary').innerHTML = item.Summary;

            //Link
            //_clone.querySelector('.text-link').setAttribute('href', window.location.origin + item.Link.replace('http://', ''));
            _clone.querySelector('.brand-link').setAttribute('href', item.Link);

            //Background Image
            var _backgroundImage = _clone.querySelector('.background-image');
            _backgroundImage.style.backgroundImage = item.Image.replace('"', '');

            _this.items.push(_clone);
            _this.$row.append($(_clone));

            if (i == data.length - 1) {
                if (item.ShowMore == false) _this.$loadmore.addClass('hide');
            }
        });

        if (_this.$loadmore) {
            _this.$loadmore.height('');
            _this.$loadmore.width('');
            _this.$loadmore.removeClass('loading');
        }

        MatchHeightHandler.update('.same-height .card-text .title');

        if (_this.id == 'event') {
            deKai.formatMonthNames(true);
        }

        setTimeout(function() {

            this.$row.removeClass('loading');
        }.bind(_this), 10);
    },
    getStories: function(handleData, year) {
        if (!year) year = -1;

        var _this = this;
        var _apiMethod = (this.id == 'event') ? 'GetEvents' : 'GetStories';


        $.getJSON({
            type: 'GET',
            dataType: 'json',
            url: this.apiUrl + _apiMethod,
            data: {
                page: this.page,
                pageSize: this.pageSize,
                articleType: this.id
            },
            success: function(data) {
                //console.log(data);
                handleData(_this, data);
            },
            error: function(e) {
                console.log(e.message);
            }
        });

        this.page += 1;
    }

};
//#endregion

(function() {
    if (typeof useNewsApi !== 'undefined' && useNewsApi) {
        //WebApiHandler.init('news');
        var newsApi = $.extend({}, WebApiHandler);
        newsApi.init('news');
    }
    if (typeof usePressreleaseApi !== 'undefined' && usePressreleaseApi) {
        //WebApiHandler.init('pressrelease');
        var pressreleaseApi = $.extend({}, WebApiHandler);
        pressreleaseApi.init('pressrelease');
    }
    if (typeof useEventApi !== 'undefined' && useEventApi) {
        //WebApiHandler.init('pressrelease');
        var eventApi = $.extend({}, WebApiHandler);
        eventApi.init('event');
    }
})();
