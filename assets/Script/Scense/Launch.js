cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        cc.thisGame.uiMgr.restoreUIRoot();
    },
    onStart: function() {
        // 加载数据
        cc.log('[Scene] Launch start');
    },

    onBtNextSceneClicked:function(){
        cc.thisGame.sceneMgr.loadScene("helloworld",false);
    },

    onBtOpenUIClicked:function (){
        cc.log('onBtOpenUIClicked!');
        cc.thisGame.uiMgr.open('uiMessageBox', function (ui) {

             ui.getComponent('UIMessageBox').open("title", "content", function(){
                    cc.log('message box opened!');
                    cc.thisGame.sceneMgr.loadScene("helloworld",false);
             }, "OK");
        });   
    },
    onBtPlayEffectClicked:function(event){
       var self=this;        
       cc.thisGame.effectMgr.playEffect("E-Player-Off",event.target,true,function( effect){
           //在这里，可以控制特效对象了，对于永久特效的关闭有用。
           self.scheduleOnce(function(){
              cc.thisGame.effectMgr.stopEffect(effect); 
           },2);
       });
    },
});
