// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
import {CardModel} from 'CardModel';
cc.Class({
    extends: cc.Component,
    name:'Card',
    
    properties: {
        titleLabel:cc.RichText,
        
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
    ctor(){
       this.cardModel = null; 
       cc.log('cardctor');
    },
    init(model){
        this.cardModel = model;
        cc.log(this.cardModel.cardId+this.cardModel.title);

    },
    reuse(){

    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        // cc.log(this.cardModel.cardId+this.cardModel.title);
        // cc.log(this.cardModel.cardId);
        cc.log(this.cardModel);
        if(this.cardModel.cardId == 0){
            this.node.color = cc.Color.RED;
        }else if(this.cardModel.cardId == 1){
            this.node.color = cc.Color.GREEN;
        }else {
            this.node.color = cc.Color.BLUE;
        }
    },
    normalAppearAnimation(startPosition,endPosition,duringTime,delayTime){
        cc.log('cardappear');
        this.node.position = startPosition;
        var action = cc.sequence(
            cc.delayTime(delayTime),
            cc.moveTo(duringTime,endPosition).easing(cc.easeBackOut())
        );
        this.node.runAction(action);
    },
    update (dt) {
        // cc.log(this.cardModel);

    },
});
