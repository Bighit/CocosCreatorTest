"use strict";
cc._RF.push(module, '4a435aMd/ZIPrBlzt0V/Lsf', 'Global');
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