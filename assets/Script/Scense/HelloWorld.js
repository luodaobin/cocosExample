cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
         cc.thisGame.uiMgr.restoreUIRoot();
        this.label.string = this.text;

    },

    // called every frame
    update: function (dt) {

    },

     onClick: function () {
          cc.thisGame.uiMgr.open('uiMessageBox', function (ui) {

             ui.getComponent('UIMessageBox').open("title", "content", function(){
                    cc.log('message box opened!');
                     cc.thisGame.sceneMgr.loadScene("launch",false);
             }, "OK");
        }); 
     },
});
