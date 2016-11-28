//#region ScreensizeHandler
ScreensizeHandler = {
    screenSize: '',
    stateIndicator: null,
    isBigScreen: false,
    isSmallScreen: false,
    isLgOrSmaller: false,
    isMdOrSmaller: false,
    isSmOrSmaller: false,
    init: function() {
        this.stateIndicator = document.createElement('div');
        this.stateIndicator.className = 'state-indicator';
        document.body.appendChild(this.stateIndicator);
        this.screenSize = this.getDeviceState();

        $(window).resize(function() {
            var currentScreenSize = this.getDeviceState();
            if (currentScreenSize != this.screenSize) {
                this.screenSize = currentScreenSize;
            }
        }.bind(this));
    },
    getDeviceState: function() {
        var index = parseInt(window.getComputedStyle(this.stateIndicator).getPropertyValue('z-index'), 10);

        var states = {
            1: '',
            2: 'lg',
            3: 'md',
            4: 'sm'
        };

        var state = states[index];

        this.isBigScreen = false;
        this.isSmallScreen = false;
        this.isLgOrSmaller = false;
        this.isMdOrSmaller = false;
        this.isSmOrSmaler = false;

        switch (state) {
            case '':
                this.isBigScreen = true;
                break;
            case 'lg':
                this.isLgOrSmaller = true;
                this.isSmallScreen = true;
                break;
            case 'md':
                this.isLgOrSmaller = true;
                this.isMdOrSmaller = true;
                this.isSmallScreen = true;
                break;
            case 'sm':
                this.isLgOrSmaller = true;
                this.isMdOrSmaller = true;
                this.isSmOrSmaller = true;
                this.isSmallScreen = true;
                break;
        }

        return state;
    }
};
//#endregion

(function() {
    ScreensizeHandler.init();
})();
