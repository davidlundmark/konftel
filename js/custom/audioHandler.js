//#region AudioHandler
var AudioHandler = {
    init: function() {
        var _audio = document.querySelectorAll('.audio');
        if (_audio === null) return;
        $(_audio).each(function() {
            var $this = $(this);
            var $icon = $this.find('.icon');
            var audio;
            var playClass = 'icon-volume-high';
            var muteClass = 'icon-volume-mute2';
            $this.click(function() {
                if(!audio) audio = new Audio($this.data('audio'));
                if(audio.paused) {
                    audio.play();
                    $this.addClass('playing');
                    $icon.removeClass(playClass).addClass(muteClass);
                } 
                else {
                    audio.pause();
                    $this.removeClass('playing');
                    $icon.removeClass(muteClass).addClass(playClass);
                }
                return false;
            });
            
        });
    }
};
//#endregion

(function() {
    if (typeof useAudio !== 'undefined' && useAudio) {
        AudioHandler.init();
    }
})();
