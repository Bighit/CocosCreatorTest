
var APP_ID = 'haQthfxcyIKxeKdG8KnLPyw2-gzGzoHsz';
var APP_KEY = 'rE9jqmR7pJjUr4p6J3umSGhR';
var AV = require('leancloud-storage');
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var { Query, User } = AV;
var LCFormula = AV.Object.extend('Formula');
var LCItems = AV.Object.extend('Items');
var LCUserShop = AV.Object.extend('re_UserShop'); // shop user shopname
var LCShopItems = AV.Object.extend('re_ShopItems');//
var LCShop = AV.Object.extend('Shop');


var GLobal = cc.Class({
    properties: {
        userInfo: null,
        
    },
    login: function (userName, password, callback) {

        User.logIn(userName, password).then(function (object) {
            cc.log(object.get('username'));
            this.userInfo = object;
            callback(true);
        }, function (error) {
            cc.log(error);
            callback(false);

        });
    },
    register: function (userName, password, callback) {
        var user = new User();
        user.setUsername(userName);
        user.setPassword(password);
        user.signUp().then(function (logedUser) {
            cc.log(logedUser.get('username'));
            callback(true);
        }, function (error) {
            cc.log(error);
            callback(false);
        }
        );
    },
    queryWithObjectName: function (objectName, paramsData,shouldHasUserInfo,callback) {
        var query = new Query(objectName);

        if (shouldHasUserInfo) {            
            query.equalTo('user',this.user);
            query.include('user');
        } else {
            
        }
        query.find().then(function (results) {
            cc.log(objectName+results);
            callback(true);
        }, function (error) {
            cc.log(error);
            callback(false);
        });
    },
    createShop: function (data) {
        var userShop = new LCUserShop();
        // 设置名称
        userShop.set('name', '工作');
        // 设置优先级
        todoFolder.set('priority', 1);
        todoFolder.save().then(function (todo) {
            console.log('objectId is ' + todo.id);
        }, function (error) {
            console.error(error);
        });
    }

});
export default { AV, GLobal };
