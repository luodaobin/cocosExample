//特效管理器 目前只实现了 技能的特效管理
var EffectMgr = function () {
    this.effectPool = [];
};

//播放特效 key 名字 挂载的节点 播放方式 0 常规 1 循环
EffectMgr.prototype.playEffect = function (_key, _effectName, _effectNode, _effectType) {
    for(var index = 0; index < this.effectPool.length; index++){
        var effectCtrl = this.effectPool[index];
        if( effectCtrl.canUse(_effectName) ){
            effectCtrl.play(_key, _effectNode);
            return;
        }
    }
    
    this.loadEffectAndPlay(_key, _effectName, _effectNode, _effectType);
};

//加载并播放 功能同上
EffectMgr.prototype.loadEffectAndPlay = function (_key, _effectName, _effectNode, _effectType) {
    var path = "effect/" + _effectName;
    var self = this;
    cc.loader.loadRes(path, function (err, prefab) {
        if(prefab == null){
            cc.error(path + " is null");
            return;
        }
        var effect = cc.instantiate(prefab);
        var effectCtrl = effect.getComponent('EffectCtrl');
        effectCtrl.effectName = _effectName;
        self.effectPool.push(effectCtrl);
        effectCtrl.init(_effectType);
        effectCtrl.play(_key, _effectNode);
    });
};

//停止特效 一般只有循环特效需要调用这个接口停止
EffectMgr.prototype.stopEffect = function(_key){
    for(var index = 0; index < this.effectPool.length; index++){
        var effectCtrl = this.effectPool[index];
        if(effectCtrl.key == _key){
            effectCtrl.stop();
        }
    }
};

var mgr = new EffectMgr();
module.exports = mgr;