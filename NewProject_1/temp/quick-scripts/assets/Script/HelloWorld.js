(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HelloWorld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld', __filename);
// Script/HelloWorld.js

'use strict';

var _LeanCloud = require('LeanCloud');

cc.Class({
  extends: cc.Component,
  properties: {
    label: {
      default: null,
      type: cc.Label
    },
    ebUserName: {
      default: null,
      type: cc.EditBox
    },
    ebPassword: {
      default: null,
      type: cc.EditBox
      // defaults, set visually when attaching this script to the Canvas

    } },

  // use this for initialization
  onLoad: function onLoad() {
    cc.log('loaded');
    // LCManager.share().login('hty', '123456', (isSuccess, result) => {
    //   LCManager.share().queryWithObjectName('re_UserShop', null, true, (isSuccess1, result1) => {
    //     result1.forEach(element => {
    //       LCManager.share().queryWithObjectName('Items', null, false, (isSuccess2, result2) => {
    //         if (isSuccess1 && isSuccess2) {
    //           LCManager.share().addItemsForShop(result2, element, (isSuccess3, result3) => {
    //             cc.log('添加items成功'+result3);
    //           });
    //         }
    //       });
    //     });

    //   });

    // });
  },


  // called every frame
  update: function update(dt) {},
  createShops: function createShops() {
    _LeanCloud.LCManager.share().login('hty', '123456', function (isSuccess, result) {
      cc.log('loginfinish');
      _LeanCloud.LCManager.share().queryWithObjectName('Shop', null, false, function (isSuccess, result1) {
        result1.forEach(function (element) {
          _LeanCloud.LCManager.share().createShop('天宇杂货铺', element, function (isSuccess, result2) {
            if (isSuccess) {
              cc.log(result2.id);
            }
          });
        });
      });
    });
  },
  btnClicked: function btnClicked(eventa, eventData) {
    cc.director.loadScene('GameTest');
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
    //     var response = xhr.responseText;
    //     console.log(response);
    //   }
    // };
    // xhr.open("GET", "", true);
    // xhr.send();
  }
});

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
        //# sourceMappingURL=HelloWorld.js.map
        