//特效管理器 目前只实现了 技能的特效管理
var EffectMgr = function () {
    this.effectPool = new cc.NodePool('EffectCtrl');
};

//播放特效 key 名字 挂载的节点 播放方式 0 常规 1 循环
EffectMgr.prototype.playEffect = function (effectName, effectNode,isInfinity,cb) {
    var effect= this.effectPool.get();
    if(null!=effect){
        var effectCtrl = effect.getComponent('EffectCtrl');
        effectCtrl.play(effectNode,isInfinity);
        if(!!cb){
            cb(effect);
        } 
        return;
    }else{
        this.loadEffectAndPlay(effectName,effectNode,isInfinity,cb);
    }
};

//加载并播放 功能同上
EffectMgr.prototype.loadEffectAndPlay = function (effectName,effectNode,isInfinity,cb) {
    var path = "effect/" + effectName;
    var self = this;
    cc.loader.loadRes(path, function (err, prefab) {
        if(prefab == null){
            cc.error(path + " is null");
            return;
        }
        var effect = cc.instantiate(prefab);
        var effectCtrl = effect.getComponent('EffectCtrl');
        effectCtrl.init(effectName);
        effectCtrl.play(effectNode,isInfinity);
        if(!!cb){
            cb(effect);
        }
    });
};

//停止特效 一般只有循环特效需要调用这个接口停止
EffectMgr.prototype.stopEffect = function(effect){
    effect.active = false;
    this.effectPool.put(effect);
};

var mgr = new EffectMgr();
module.exports = mgr;