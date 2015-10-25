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

/**
 * Global Tower Element for all towers. This is an example how to implement a
 * sprite to the scene/game.
 * @constructor
 */
Game.Window = function (content) {

    PIXI.Sprite.call(this);

    this.content = content || false;

    this.interactive = true;

    this.name = 'window';

    this.position.x = Game.settings.center.x;
    this.position.y = (Game.settings.height * .1) + 250;

    this.scene = 'menu';

    this.texture = PIXI.loader.resources['assets/images/ui/window-background.png'].texture;

    if (this.width > Game.settings.width) {
        this.width = Game.settings.width;
    }
    if (this.height > Game.settings.height) {
        this.height = Game.settings.height;
    }

    if (this.content) {
        var style = {
            font: '24px kenvector_futureregular, Arial',
            fill: '#ffffff',
            dropShadow: true,
            dropShadowDistance: 2,
            dropShadowColor: 'rgba(0,0,0,.2)',
            wordWrap: true,
            wordWrapWidth: this.width,
            align: 'center',
            lineHeight: 38
        };

        this.content = new PIXI.Text(content, style);
        this.content.position.y = -(this.height / 2) + 10;
        this.content.anchor.set(.5, 0);
        this.addChild(this.content);
    }

    var button = new Game.Button({
        texture: PIXI.loader.resources['assets/images/ui/button-close.png'].texture,
        textureActive: false
    });
    button.position.x = 500 / 2;
    button.position.y = -250;

    button.activate = function() {
        Game.Button.prototype.activate.call(this);
        this.parent.visible = false;
    };

    this.addChild(button);
    Game.Element(this);

    this.visible = false;

};

Game.Window.prototype = Object.create(PIXI.Sprite.prototype);
Game.Window.prototype.constructor = Game.Window;

Game.Window.prototype.show = function (content) {

    this.position.x = Game.settings.center.x;
    if (content) {
        this.content.text = content;
    }
    this.visible = true;

};