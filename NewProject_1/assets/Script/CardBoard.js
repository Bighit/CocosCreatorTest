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
    ctor() {
        this.itemsArray = Global.itemsArray;
        this.cardArray = [];
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad() {
        this.itemsArray = [
            {
                type: 0,
                url: 'aa',
                desc: 'descdesc',
                title: 'title',
                probability: 0.2,
            },
            {
                type: 0,
                url: 'bb',
                desc: 'descdesc',
                title: 'title',
                probability: 0.3,
            },
            {
                type: 0,
                url: 'cc',
                desc: 'descdesc',
                title: 'title',
                probability: 0.5,
            }];
        this.cardWidth = cc.winSize.width / this.cardCount;
        //生成概率数组
        this.probabilityArray = [];
        this.itemsArray.forEach(element => {
            let prob = element.probability;
            this.probabilityArray.push(prob);
        }, this);

        //初始化缓存池
        this.cardPool = new cc.NodePool('Card');
        for(let i =0 ;i<20; i++){
            this.cardPool.put(cc.instantiate(this.cardPrefab));
        }
        //
        this.createCardsWithCount(0,this.cardCount, false);
        this.adjustCardsPosition();
    },

    /**
     * 为对应下标生成一个卡片的数据，会根据规则规避种类，如果全随机则忽略
     * @param {*} index 生成数据的下标
     * @param {*} allRandom 是否全随机
     */

    getCardModelAtIndex(index, allRandom) {

        //随机
        var tempProb = Math.random();
        var index = 0;
        var sumProb = 0;
        for (let tIndex in this.probabilityArray) {
            sumProb += this.probabilityArray[tIndex];
            if (tempProb < sumProb) {
                index = tIndex;
                break;
            }
        }
        //得到元数据
        var item = this.itemsArray[index];
        var cardModel = new CardModel();

        if (!allRandom && this.cardArray.length > 1) {
            let tcardId1 = this.cardModelAt(this.cardArray.length - 2).cardId;
            let tcardId2 = this.cardModelAt(this.cardArray.length - 1).cardId;
            //去重 重新随机
            if (tcardId1 == tcardId2 && index == tcardId2) {
                cc.log('去重');
                tempProb = tempProb * (1 - this.probabilityArray[index]);
                var tempProbabilityArray = this.probabilityArray.concat();
                var tempItemsArray = this.itemsArray.concat();
                tempProbabilityArray.splice(index, 1);
                tempItemsArray.splice(index, 1);
                sumProb = 0;
                for (let tIndex in tempProbabilityArray) {
                    sumProb += tempProbabilityArray[tIndex];
                    if (tempProb < sumProb) {
                        index = tIndex;
                        item = tempItemsArray[index];
                        break;
                    }
                }

            }
        }

        cardModel.cardId = this.itemsArray.indexOf(item);
        cardModel.type = item.type;
        cardModel.imageUrl = item.url;
        cardModel.title = item.title;
        cardModel.desc = item.desc;

        return cardModel;
    },
    /**
    * 创建一张卡片
    * @param {*} cardModel 卡片数据
    * @returns card
    */
    createOneCardWithCardModel(cardModel) {
        //生成卡片
        var card = null;
        if (this.cardPool.size() > 0) {
            cc.log('重用');
            card = this.cardPool.get();
        } else {
            card = cc.instantiate(this.cardPrefab);
        }
        card.getComponent('Card').init(cardModel);
        card.parent = this.node;
        card.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.log('点击' + this.cardArray.indexOf(card));
            this.checkAndClearCard(false, this.cardArray.indexOf(card));
            this.refillCard();
        }, this);
        return card;
    },
    /**
     * 创建对应数目的卡片
     * @param {*} count 数量
     * @param {*} allRandom 是否随机
     */
    createCardsWithCount(i,count, allRandom) {
        for (let index = i; index < count; index++) {
            let cardModel = this.getCardModelAtIndex(index, allRandom);
            let card = this.createOneCardWithCardModel(cardModel);
            this.cardArray.push(card);
             card.position = cc.v2(cc.winSize.width + this.cardWidth, 0);
        }
    },

    checkAndClearCard(isAllCheck, index) {

        var removeCardArray = [];
        var currentIndex = index;
        if (!isAllCheck) {
            var cardId = null;
            do {
                cardId = this.cardModelAt(currentIndex).cardId;
                currentIndex--;
            } while (currentIndex >= 0 && this.cardModelAt(currentIndex).cardId == cardId);
            currentIndex += 1;
            do {
                //todo
                cardId = this.cardModelAt(currentIndex).cardId;
                let card = this.cardArray[currentIndex];
                // this.cardArray.splice(index,1);
                // card.removeFromParent();
                removeCardArray.push(card);
                // this.cardPool.put(card);
                currentIndex++;
            } while (currentIndex < this.cardArray.length && this.cardModelAt(currentIndex).cardId == cardId);
        } else {
            var cardId = null;

            for (let i in this.cardArray) {
                var index2 = i;
                do {
                    cardId = this.cardModelAt(index2).cardId;
                    let card = this.cardArray[index2];
                    removeCardArray.push(card);
                    index2++;
                } while (index2 < this.cardArray.length && this.cardModelAt(index2).cardId == cardId && removeCardArray.length == NUMBER_OF_REMOVALS);
                if (removeCardArray.length >= NUMBER_OF_REMOVALS) {
                    break;
                } else {
                    removeCardArray.splice(0, removeCardArray.length);
                }
            }  
        }
        for (let i in removeCardArray) {
            let card = removeCardArray[i];            
            this.cardArray.splice(this.cardArray.indexOf(card),1);
            card.removeFromParent(true);
            this.cardPool.put(card);
        }
        // cc.log(removeCardIdArray);
    },
    adjustCardsPosition() {
        for(let index = 0; index<this.cardArray.length;index++){
            let card = this.cardArray[index];
            card.getComponent('Card').normalAppearAnimation(card.position, cc.v2(this.cardWidth * (index + 1), 0), 0.5, 0.02 * index);
        }
    },
    refillCard() {
        this.createCardsWithCount(this.cardArray.length,this.cardCount,true);
        cc.log(this.cardArray.length);
        this.adjustCardsPosition();
    },
    cardModelAt(index) {
        let card = this.cardArray[index];
        return card.getComponent('Card').cardModel;
    }
    // update (dt) {},
});
