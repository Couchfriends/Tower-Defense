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
 * Global Element for all in game objects. Every object should extend from this
 * class.
 * @constructor
 */
Game.Element = function (that) {

    that.name = that.name || 'element';

    that.scene = that.scene || 'game';

    that.anchor.set(.5);

    that._renderCanvasOrg = that._renderCanvas;

    that._renderCanvas = function() {
        this._renderCanvasOrg.apply(this, arguments);
        this.update.call(this);
    };

    that._renderWebGLOrg = that._renderWebGL;

    that._renderWebGL = function() {
        this._renderWebGLOrg.apply(this, arguments);
        this.update.call(this);
    };

    that.update = that.update || function () { };

    that.add = that.add || function () {
        Game.scenes[this.scene].addChild(this);
    };

    that.hide = that.hide || function() {
        this.visible = false;
    }

};