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
Game.Level = {


    initialized: false,

    gird: [],

    availableLevels: [
        {
            name: 'The seeds',
            file: 'assets/levels/level001.json'
        }
    ],

    assets: [
        {url: 'assets/images/tiles/grass.png'},
        {url: 'assets/levels/level001.json'}
    ],

    init: function() {

        if (this.initialized == true) {
            return this.show();
        }
        this.initialized = true;
        Game.load(this.assets, this.setup.bind(this));

    },

    setup: function() {

        Game.clearScene('game');
        this.show();

    },

    /**
     * Initializes a new level.
     * @returns {boolean} index of this.availableLevels. Leave empty to select a
     * random level.
     */
    loadLevel: function(levelIndex) {

        levelIndex = levelIndex || Math.floor(Math.random() * this.availableLevels.length);
        this.grid = [];
        var level = this.availableLevels[levelIndex];
        if (typeof PIXI.loader.resources[level.file] == 'undefined') {
            return false;
        }
        var data = PIXI.loader.resources[level.file].data;

        // Game is made for a certain resolution (e.g. 1280x720) but the real
        // resolution might be smaller or bigger (e.g. 1920x1080). Calculating
        // the right width and height of a tile (we do this based on the width)
        var factor = Game.settings.width / (data.tilewidth * data.width);
        var tileWidth = data.tilewidth * factor;
        var tileHeight = data.tileheight * factor;
        var halfWidth = tileWidth / 2;
        var halfHeight = tileHeight / 2;

        // Generate tiles
        for (var x = 0; x < data.width; x++) {
            this.grid[x] = [];
            for (var y = 0; y < data.height; y++) {
                var tile = new Game.Tile();
                tile.width = tileWidth;
                tile.height = tileHeight;
                this.grid[x][y] = tile;
                tile.position = {
                    x: (x * tileWidth) + halfWidth,
                    y: (y * tileHeight) + halfHeight
                };
                tile.add();
            }
        }

        return true;

    },

    show: function () {

        if (!this.loadLevel()) {
            Game.Menu.init();
            return false;
        }
        Game.state = 'run';
        Game.showScene('game');

    },

    play: function (level) {

        Game.clearScene('game');

    }
};