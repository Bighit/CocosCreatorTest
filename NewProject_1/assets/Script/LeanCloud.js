
var APP_ID = 'haQthfxcyIKxeKdG8KnLPyw2-gzGzoHsz';
var APP_KEY = 'rE9jqmR7pJjUr4p6J3umSGhR';
var AV = require('leancloud-storage');
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var { Query, User } = AV;
var LCFormula = AV.Object.extend('Formula');
var LCItems = AV.Object.extend('Items');//name type desc level price itemid
var LCUserShop = AV.Object.extend('re_UserShop'); // shop user shopname
var LCShopItems = AV.Object.extend('re_ShopItems');// userShop item
var LCShop = AV.Object.extend('Shop');


var LCManager = cc.Class({
    properties: {
        userInfo: null,
    },
    statics: {
        _instance: LCManager,
        share: function () {
            if (!this._instance) {
                this._instance = new LCManager();
            }
            return this._instance;
        }
    },
    login: (userName, password, callback) => {

        User.logIn(userName, password).then(object => {
            cc.log(object.get('username') + '登陆成功');
            LCManager.share().userInfo = object;
            callback(true, object);
        }, function (error) {
            cc.log(error);
            callback(false, error);

        });
    },
    register: (userName, password, callback) => {
        var user = new User();
        user.setUsername(userName);
        user.setPassword(password);
        user.signUp().then(object => {
            cc.log(object.get('username') + '注册成功');
            callback(true, object);
        }, function (error) {
            cc.log(error);
            callback(false, error);
        }
        );
    },
    queryWithObjectName: (objectName, paramsData, shouldHasUserInfo, callback) => {
        var query = new Query(objectName);

        if (shouldHasUserInfo) {
            query.equalTo('user', LCManager.share().userInfo);
            query.include('user');
        } else {
            // query.equalTo('')
        }
        query.find().then(object => {
            cc.log(objectName + object);
            callback(true, object);
        }, function (error) {
            cc.log(error);
            callback(false, error);
        });
    },
    createShop: (shopName, shop, callback) => {
        var userShop = new LCUserShop();
        // 设置名称
        userShop.set('shopName', shopName);
        userShop.set('shop', shop);
        userShop.set('user', LCManager.share().userInfo);
        userShop.save().then(object => {
            console.log('objectId is ' + object.id);
            callback(true, object);
        }, function (error) {
            console.error(error);
            callback(false, error);
        });
    },
    addItemsForShop: (itemsArray, userShop, callback) => {

        var items = [];
        itemsArray.forEach(element => {
            var shopItem = new LCShopItems();
            shopItem.set('userShop', userShop);
            shopItem.set('item', element);
            items.push(shopItem);
        });
        AV.Object.saveAll(items).then(object => {
            callback(true, object);
        }, function (error) {
            callback(false, error);
        });
    }

});
export default { AV, LCManager };
