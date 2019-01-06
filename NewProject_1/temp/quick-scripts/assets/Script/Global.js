(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Global.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4a435aMd/ZIPrBlzt0V/Lsf', 'Global', __filename);
// Script/Global.js

"use strict";

//单例模式抽象，分离创建对象的函数和判断对象是否已经创建
// var getSingle = function (fn) {
//     var result;
//     return function () {
//         return result || ( result = fn.apply(this, arguments) );
//     }
// };
// var itemsArray = 
// export default {getSingle}
var battleType = cc.Enum({
    create: -1,
    fight: -1
});
window.Global = {
    itemsArray: [],
    battleType: cc.Enum(battleType),
    difficultyLevel: 0
};

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
        //# sourceMappingURL=Global.js.map
        