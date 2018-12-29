

import {AV} from 'LeanCloud';
var { Query, User } = AV;

cc.Class({
    extends: cc.Component,
    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        ebUserName:{
          default:null,
          type:cc.EditBox
        },
        ebPassword:{
          default:null,
          type:cc.EditBox
        }
        // defaults, set visually when attaching this script to the Canvas

    },

    // use this for initialization
    onLoad: function () {
      cc.log('loaded');
      // var TestObject = AV.Object.extend('TestObject');
      // var testObject = new TestObject();
      // testObject.save({
      //    words: 'Hello World!'
      // }).then(function(object) {
      // alert('LeanCloud Rocks!');
      // });
      var user = new User();
      user.setUsername('hty');
      user.setPassword('123456');
      user.signUp().then(function(logedUser){
        cc.log(logedUser.get('username'));
      },function(error){
        cc.log(error);
      }
      );
      User.logIn('hty','123456').then(function(object){
        cc.log(object.get('username'));
      },function(error){
        cc.log(error);
      });
    },

    // called every frame
    update: function (dt) {
    },
    btnClicked: function (eventa,eventData){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
       if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
         var response = xhr.responseText;
         console.log(response);
       }
    };
    xhr.open("GET", "", true);
    xhr.send();
    }
});
