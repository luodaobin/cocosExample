cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            default: null,
            url: cc.AudioClip
        },
        pressedScale: 0.95,
        transDuration: 0.1,
        _audioDefaultName: 'UI_Generic.wav',
    },

    // use this for initialization
    onLoad: function () {
        var self = this;

        self.initScale = this.node.scale;
        //self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown(event) {
            self.node.stopAllActions();
            self.playAudioEffect();//音效。
            self.node.runAction(self.scaleDownAction);
        }
        function onTouchUp(event) {
            self.node.stopAllActions();
            self.node.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    },
    playAudioEffect: function () { 
        if(this.audio){
            //cc.thisGame.audioMgr.playEffectUrl(this.audio);
        }else{
            //cc.thisGame.audioMgr.playEffect(this._audioDefaultName);
        }
        
    }
});
