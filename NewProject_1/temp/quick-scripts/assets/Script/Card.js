(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Card.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '85e021X3nZD16p2by1O97io', 'Card', __filename);
// Script/Card.js

'use strict';

var _CardModel = require('CardModel');

cc.Class({
    extends: cc.Component,
    name: 'Card',

    properties: {
        titleLabel: cc.RichText

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    ctor: function ctor() {
        this.cardModel = null;
        cc.log('cardctor');
    },
    init: function init(model) {
        this.cardModel = model;
        cc.log(this.cardModel.cardId + this.cardModel.title);
    },
    reuse: function reuse() {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad: function onLoad() {
        // cc.log(this.cardModel.cardId+this.cardModel.title);
        // cc.log(this.cardModel.cardId);
        cc.log(this.cardModel);
    },
    update: function update(dt) {
        // cc.log(this.cardModel);

    }
}); // Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Card.js.map
        