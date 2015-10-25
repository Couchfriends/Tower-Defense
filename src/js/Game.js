var Game = {

    VERSION: '0.0.1',

    _renderer: {},

    /**
     * @param Array list with different scenes
     */
    scenes: {
        menu: {},
        loading: {},
        game: {}
    },
    state: 'run', // Current stage of the game e.g. 'run'|'pause'

    /**
     * (Default) options for the game. Some settings might be overridden by the
     * settings in localStorage.
     */
    settings: {
        /**
         * Resolution where the game is original build for. Used to calculate
         * the new resolution on different devices.
         */
        width: 1920,
        height: 1080,
        sound: true,
        music: true,
        particles: false,
        /**
         * Calculated center position of the game. Can be used to automatically
         * place objects and reposition them if the resolution changes.
         */
        center: {
            x: 0,
            y: 0
        },
        save: function(setting, value) {
            if (typeof Game.settings[setting] != 'undefined' && typeof value == 'boolean') {
                Game.settings[setting] = value;
                if (window.localStorage != null) {
                    window.localStorage.setItem('GameSettings.' + setting, value);
                }
                if (setting == 'sound' || setting == 'music') {
                    for (var key in PIXI.loader.resources) {
                        var resource = PIXI.loader.resources[key];
                        if (resource.id != null && resource.id == setting) {
                            resource.data.mute(!value);
                        }
                    }
                    // Continue or start playing the background music if the setting changed
                    if (setting == 'music' && Game.backgroundMusic != null &&
                        Game.backgroundMusic._sounds != null && value == true &&
                        Game.backgroundMusic._sounds[0]._paused == true) {
                        Game.backgroundMusic.play();
                    }
                }
            }
        },
        load: function() {
            if (window.localStorage == null) {
                return false;
            }
            for (var key in Game.settings) {
                if (typeof Game.settings[key] == 'boolean') {
                    var savedSetting = window.localStorage.getItem('GameSettings.' + key);
                    if (savedSetting == null) {
                        continue;
                    }
                    if (savedSetting == 'false') {
                        savedSetting = false;
                    }
                    else if (savedSetting == 'true') {
                        savedSetting = true;
                    }
                    Game.settings.save(key, savedSetting);
                }
            }
        }
    },
    /**
     * Background music
     */
    backgroundMusic: {},
    /**
     * List with key => object of game assets including textures and sounds
     */
    assets: {},

    /**
     * List with all objects
     */
    object: [],

    init: function () {

        if (typeof PIXI == 'undefined') {
            console.warn('PIXI not found.');
            return false;
        }
        this.settings.load();

        PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
        this._renderer = PIXI.autoDetectRenderer(
            this.settings.width,
            this.settings.height,
            this.settings.render
        );
        document.body.appendChild(this._renderer.view);
        window.addEventListener('resize', Game.resize.bind(this));

        this.resize();

        for (var key in this.scenes) {
            this.scenes[key] = new PIXI.Container();
            this.scenes[key].visible = false;
        }

        this.Menu.init();
        this.update();

    },

    /**
     * Callback when screen resolution or orientation changed. Keeps the
     * original aspect ratio and resized and position the canvas.
     */
    resize: function () {

        this._renderer.resize(
            this.settings.width,
            this.settings.height
        );
        // Resize to maximum resolution. @todo check settings in localStorage
        var widthToHeight = this.settings.width / this.settings.height;

        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;

        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            // window width is too wide relative to desired game width
            newWidth = newHeight * widthToHeight;
            this._renderer.view.style.height = newHeight + 'px';
            this._renderer.view.style.width = newWidth + 'px';
        } else { // window height is too high relative to desired game height
            newHeight = newWidth / widthToHeight;
            this._renderer.view.style.width = newWidth + 'px';
            this._renderer.view.style.height = newHeight + 'px';
        }

        this.settings.center = {
            x: this.settings.width / 2,
            y: this.settings.height / 2
        };

        this._renderer.view.style.marginTop = -(newHeight / 2) + 'px';
        this._renderer.view.style.marginLeft = -(newWidth / 2) + 'px';

    },

    /**
     * The absolute main render. Requests another animation frame and execture
     * the current this.state() function.
     * @param time
     */
    update: function (time) {

        requestAnimationFrame(this.update.bind(this));
        this[this.state]();

    },

    /**
     * Loads an list of assets.
     * @param assets list with asset of an list with objects containing the
     * following params:
     * asset.url string link to the file
     * asset.id string type of the asset. E.g. sound|music|texture. Used for
     * settings.
     * @param callback
     */
    load: function (assets, callback) {

        this.state = 'loading';
        if (assets.length == 0) {
            if (typeof callback == 'function') {
                callback();
            }
            return;
        }

        PIXI.loader.on('progress', function (loader, loadedResources) {
            if (loadedResources.id == 'sound' && Game.settings.sound == false) {
                loadedResources.data.mute();
            }
            if (loadedResources.id == 'music' && Game.settings.music == false) {
                loadedResources.data.mute();
            }
        });

        for (var i = 0; i < assets.length; i++) {
            var asset = assets[i];
            PIXI.loader.add(asset);
        }
        PIXI.loader.load(function () {
            if (typeof callback == 'function') {
                callback();
            }
        });

    },

    loading: function () {
        console.log('Loading... ' + PIXI.loader.progress + '%');
    },

    run: function (time) {

        this._renderer.render(this.scene);

    },

    clearScene: function (scene) {

        if (typeof this.scenes[scene] === 'undefined') {
            return;
        }
        var scene = this.scenes[scene];
        for (var i = scene.children.length - 1; i >= 0; i--) {
            scene.removeChild(scene.children[i]);
        }

    },

    /**
     * Set and show a scene
     */
    showScene: function (scene) {

        scene = scene || 'game';
        for (var key in this.scenes) {
            this.scenes[key].visible = false;
        }
        this.scene = this.scenes[scene];
        this.scene.visible = true;

    }

};