/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Couchfriends
 * www.couchfriends.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
Game.Menu = {


    initialized: false,

    /**
     * Window where information can be put
     */
    window: {},
    windowSettings: {},
    /**
     * The background music object
     */
    backgroundMusic: {},

    assets: [
        {url: 'assets/images/ui/button-normal.png'},
        {url: 'assets/images/ui/button-active.png'},
        {url: 'assets/audio/effects/button-hover.ogg'},
        {url: 'assets/audio/effects/button-activate.ogg'},
        {url: 'assets/images/ui/button-close.png'},
        {url: 'assets/images/ui/checkbox-checked.png'},
        {url: 'assets/images/ui/checkbox-unchecked.png'},
        {url: 'assets/images/ui/window-background.png'},
        {url: 'assets/audio/music/Prop - Vagity.mp3', id: 'music', key: 'background'}
    ],

    init: function () {

        if (this.initialized == true) {
            return this.show();
        }
        this.initialized = true;
        Game.load(this.assets, this.setup.bind(this));

    },

    setup: function () {

        Game.clearScene('menu');

        var top = Game.settings.height * .1;
        var play = new Game.Button({
            label: 'Play'
        });
        play.position.x = Game.settings.center.x;
        play.position.y = top;
        play.activate = function () {
            Game.Button.prototype.activate.call(this);
            Game.Level.init();
        };
        play.add();

        top += 60;

        var settings = new Game.Button({
            label: 'Settings'
        });
        settings.position.x = Game.settings.center.x;
        settings.position.y = top;
        settings.activate = function () {
            Game.Button.prototype.activate.call(this);
            Game.Menu.window.hide();
            Game.Menu.windowSettings.show();
        };
        settings.add();

        top += 60;

        var credits = new Game.Button({
            label: 'Credits'
        });
        credits.position.x = Game.settings.center.x;
        credits.position.y = top;
        credits.activate = function () {
            Game.Button.prototype.activate.call(this);
            Game.Menu.windowSettings.hide();
            Game.Menu.window.show('Credits\n\nMathieu de Ruiter\nwww.couchfriends.com');
        };
        credits.add();

        this.window = new Game.Window('window');
        this.window.add();

        this.windowSettings = new Game.WindowSettings();
        this.windowSettings.add();

        this.show();
    },

    show: function () {

        Game.backgroundMusic = PIXI.loader.resources['background'].data;
        Game.backgroundMusic.play();
        Game.state = 'run';
        Game.showScene('menu');

    }
};