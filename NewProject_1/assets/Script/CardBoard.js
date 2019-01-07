// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
const NUMBER_OF_REMOVALS = 3;

import { CardModel } from 'CardModel';

cc.Class({
    extends: cc.Component,

    properties: {
        
        cardCount: 0,
        cardPrefab: cc.Prefab

    },
    ctor(){
        this.itemsArray = Global.itemsArray;
        this.cardArray=[];
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad() {
        this.itemsArray = [
            {
            type:0,
            url:'aa',
            desc:'descdesc',
            title:'title',
            probability: 0.2,
        },
        {
            type:0,
            url:'bb',
            desc:'descdesc',
            title:'title',
            probability:0.3,
        },
        {
            type:0,
            url:'cc',
            desc:'descdesc',
            title:'title',
            probability:0.5,
        }];
        //生成概率数组
        this.probabilityArray = [0];
        this.itemsArray.forEach(element => {
            var probability = this.probabilityArray[this.probabilityArray.length - 1];
            let prob = element.probability;
            this.probabilityArray.push(prob + probability);
        },this);
        cc.log(this.probabilityArray);
        //初始化缓存池
        this.cardPool = new cc.NodePool('Card');
        for (let i = 0; i < this.cardCount; ++i) {
            this.createOneCard();
        }

    },
    handleItemsArray(item) {

        var cardModel = new CardModel();
        cardModel.cardId = this.itemsArray.indexOf(item);
        cardModel.type = item.type;
        cardModel.imageUrl = item.url;
        cardModel.title = item.title;
        cardModel.desc = item.desc;
        return cardModel;
    },
    createOneCard() {
        //随机得到cardModel
        var tempProb = Math.random();
        var index = 0;
        for (let tIndex in this.probabilityArray) {
            if (tempProb < this.probabilityArray[tIndex]) {
                index = tIndex - 1;
                break;
            }
        }
        let item = this.itemsArray[index];
        var cardModel = this.handleItemsArray(item);
        //生成卡片
        var card = null;
        if (this.cardPool.size() > 0) {
            card = this.cardPool.get();
        } else {
            card = cc.instantiate(this.cardPrefab);
        }
        card.getComponent('Card').init(cardModel);
        card.parent = this.node;
        this.cardArray.push(card);

        card.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.log(this.cardArray.indexOf(card));
        }, this);
    },
    checkAndClearCard() {

    }
    // update (dt) {},
});
