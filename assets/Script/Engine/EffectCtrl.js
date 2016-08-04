cc.Class({
    extends: cc.Component,
//特效播放时间 如果小于0 则未循环播放
    properties: {
        playTime : 2.0,
    },

    init: function (effectName) {
        this.effectName = effectName;   //特效的名字
        this.curPlayTime = 0;   //当前的播放时间
        this._animation=this.node.getComponent(cc.Animation);
        this._particle=this.node.getComponent(cc.ParticleSystem);
    },
    
    update: function (dt) {
        if(this.playTime <= 0)
            return;
        this.curPlayTime += dt;
        if(this.curPlayTime >= this.playTime){
            this.stop();
        }
    },
    //播放
    play : function(effectNode,effectType){
        this.node.parent = effectNode;
        this.node.active = true;
        this.curPlayTime=0;
        if(effectType==1){
            this.playTime=-1;
        }
        if(this._animation){
            this._animation.stop();
            this._animation.play();
        } 
        if(this._particle){
            this._particle.resetSystem();
        } 
        cc.log( "Playing "+this.effectName);
    },

    //停止
    stop : function(){
         this.node.active = false;
        cc.thisGame.effectMgr.stopEffect(this.node);
    }
});
