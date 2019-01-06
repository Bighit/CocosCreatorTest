

import { AV, LCManager } from 'LeanCloud';

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
    }
    // defaults, set visually when attaching this script to the Canvas

  },

  // use this for initialization
  onLoad () {
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
  update (dt) {
  },

  createShops () {
    LCManager.share().login('hty', '123456', (isSuccess, result) => {
      cc.log('loginfinish');
      LCManager.share().queryWithObjectName('Shop', null, false, (isSuccess, result1) => {
        result1.forEach(element => {
          LCManager.share().createShop('天宇杂货铺', element, (isSuccess, result2) => {
            if (isSuccess) {
              cc.log(result2.id);
            }
          });
        });
      });
    });
  },
  btnClicked (eventa, eventData) {
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
