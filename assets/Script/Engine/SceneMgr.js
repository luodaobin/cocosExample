

var SceneMgr = function () {
    this.uiRoot = null;
    this.isLoading = false;
};
SceneMgr.prototype.EVENT = {
    BEFORE_SCENE_PRELOADING : 'BEFORE_SCENE_PRELOADING',
    AFTER_SCENE_PRELOADING : 'BEFORE_SCENE_PRELOADING',
    BEFORE_SCENE_LOADING : 'BEFORE_SCENE_LOADING',
    AFTER_SCENE_LOADING : 'AFTER_SCENE_LOADING',
    //launch不需要再发射事件，进入加载。
};

SceneMgr.prototype.setBackUIRoot = function () {
    if (this.uiRoot == null) {
        cc.error('setBackUIRoot ui null');
        return;
    }

    var newCanvas = cc.find('Canvas');
    if (null == newCanvas) {
        cc.error('setBackUIRoot not find canvas');
        return;
    }

    this.uiRoot.parent = newCanvas;
    this.uiRoot = null; // 保证只执行一次赋值
    var newUIRoot = cc.find('Canvas/uiRoot');
    cc.log('after Set uiRoot', newUIRoot.__instanceId);
}

SceneMgr.prototype.loadScene = function (sceneName, cb, notNeedLoading = false) {
    
    // 正在加载了，请排队，或先拒绝  TODO
    if (this.isLoading) {
        cc.error('already loading scene');
        return;
    }

    this.isLoading = true;

    cc.log('[Scene] preScene ', cc.director.getScene().name, ' -> nextScene ', sceneName);
    var self = this;
    var splash = cc.find('Splash');
    var action = cc.sequence(
    );


    cc.log('start preloadScene', new Date().getTime());
    //var canvas = cc.find('Canvas');
    if (!notNeedLoading) {
        //canvas.active = false;
        cc.thisGame.openBgLoading();   
    }
    cc.thisGame.node.emit(self.EVENT.BEFORE_SCENE_PRELOADING);
    cc.director.preloadScene(sceneName, function (error) {
        cc.log('end preloadScene, runAction', new Date().getTime());
         cc.thisGame.node.emit(self.EVENT.AFTER_SCENE_PRELOADING);
        if (error) {
            //canvas.active = true;
            cc.thisGame.closeBgLoading();
            self.isLoading = false;
            return;
        } else {
            cc.log('endAction, start loadScene', new Date().getTime());
            // 停止当前音乐

            // 暂存uiRoot
            var uiRoot = cc.thisGame.uiMgr.uiRoot;
            uiRoot.parent = cc.thisGame.node;
            uiRoot.setSiblingIndex(0);//保证在上层，被背景层覆盖。
            
            cc.log('cache uiRoot', uiRoot ? uiRoot.__instanceId : 0);

            cc.thisGame.node.emit(self.EVENT.BEFORE_SCENE_LOADING);
            self.isLoading = cc.director.loadScene(sceneName, function () {
                cc.thisGame.node.emit(self.EVENT.AFTER_SCENE_LOADING);
                self.isLoading = false;
                cc.log('end loadScene', sceneName, new Date().getTime());
                cc.thisGame.closeBgLoading();
                if (cb) {
                    cb();
                }            
            });
        }
    });
};

var sceneMgr = new SceneMgr();
module.exports = sceneMgr;