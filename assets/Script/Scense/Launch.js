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
        this.node.on(cc.Node.EventType.TOUCH_END,this.onPanelClicked.bind(this));
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
       cc.thisGame.effectMgr.playEffect("LavaFlow",event.target,true,function( effect){
           //在这里，可以控制特效对象了，对于永久特效的关闭有用。
           self.scheduleOnce(function(){
              cc.thisGame.effectMgr.stopEffect(effect); 
           },2);
       });
    },
    onPanelClicked : function(event){
         cc.log('onPanelClicked:x='+event.getLocation().x + " y="+event.getLocation().y);
         var self=this;
          cc.thisGame.effectMgr.playEffect("E-Player-Off", this.node,false,function( effect){
           //在这里，可以控制特效对象了，对于永久特效的关闭有用。
           var nodePos=self.node.convertToNodeSpaceAR(event.getLocation()); 
            cc.log('nodePos:x='+nodePos.x + " y="+nodePos.y);
           effect.x=nodePos.x;
           effect.y=nodePos.y;
       });
    }
});
