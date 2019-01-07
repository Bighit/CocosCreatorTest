"use strict";
cc._RF.push(module, 'f1ff3MGUSVGe4wJU94iQ/hr', 'CardModel');
// Script/CardModel.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var CardModel = cc.Class({
    name: 'CardModel',
    ctor: function ctor() {
        this.type = 0;
        this.cardId = 0;
        this.imageUrl = "";
        this.title = "";
        this.desc = "";
    }
}

// LIFE-CYCLE CALLBACKS:

// onLoad () {},

// start () {

// },

// update (dt) {},
);
exports.default = { CardModel: CardModel };
module.exports = exports["default"];

cc._RF.pop();