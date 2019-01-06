(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LeanCloud.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '874caqNC09ESIi9vOGz6Gvk', 'LeanCloud', __filename);
// Script/LeanCloud.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var APP_ID = 'haQthfxcyIKxeKdG8KnLPyw2-gzGzoHsz';
var APP_KEY = 'rE9jqmR7pJjUr4p6J3umSGhR';
var AV = require('leancloud-storage');
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var Query = AV.Query,
    User = AV.User;

var LCFormula = AV.Object.extend('Formula');
var LCItems = AV.Object.extend('Items'); //name type desc level price itemid
var LCUserShop = AV.Object.extend('re_UserShop'); // shop user shopname
var LCShopItems = AV.Object.extend('re_ShopItems'); // userShop item
var LCShop = AV.Object.extend('Shop');

var LCManager = cc.Class({
    properties: {
        userInfo: null
    },
    statics: {
        _instance: LCManager,
        share: function share() {
            if (!this._instance) {
                this._instance = new LCManager();
            }
            return this._instance;
        }
    },
    login: function login(userName, password, callback) {

        User.logIn(userName, password).then(function (object) {
            cc.log(object.get('username') + '登陆成功');
            LCManager.share().userInfo = object;
            callback(true, object);
        }, function (error) {
            cc.log(error);
            callback(false, error);
        });
    },
    register: function register(userName, password, callback) {
        var user = new User();
        user.setUsername(userName);
        user.setPassword(password);
        user.signUp().then(function (object) {
            cc.log(object.get('username') + '注册成功');
            callback(true, object);
        }, function (error) {
            cc.log(error);
            callback(false, error);
        });
    },
    queryWithObjectName: function queryWithObjectName(objectName, paramsData, shouldHasUserInfo, callback) {
        var query = new Query(objectName);

        if (shouldHasUserInfo) {
            query.equalTo('user', LCManager.share().userInfo);
            query.include('user');
        } else {
            // query.equalTo('')
        }
        query.find().then(function (object) {
            cc.log(objectName + object);
            callback(true, object);
        }, function (error) {
            cc.log(error);
            callback(false, error);
        });
    },
    createShop: function createShop(shopName, shop, callback) {
        var userShop = new LCUserShop();
        // 设置名称
        userShop.set('shopName', shopName);
        userShop.set('shop', shop);
        userShop.set('user', LCManager.share().userInfo);
        userShop.save().then(function (object) {
            console.log('objectId is ' + object.id);
            callback(true, object);
        }, function (error) {
            console.error(error);
            callback(false, error);
        });
    },
    addItemsForShop: function addItemsForShop(itemsArray, userShop, callback) {

        var items = [];
        itemsArray.forEach(function (element) {
            var shopItem = new LCShopItems();
            shopItem.set('userShop', userShop);
            shopItem.set('item', element);
            items.push(shopItem);
        });
        AV.Object.saveAll(items).then(function (object) {
            callback(true, object);
        }, function (error) {
            callback(false, error);
        });
    }
});
exports.default = { AV: AV, LCManager: LCManager };
module.exports = exports['default'];

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
        //# sourceMappingURL=LeanCloud.js.map
        