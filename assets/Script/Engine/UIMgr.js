
var UIMgr = function() {
    this.creatingCB = {};
    this.ui = {};
};

UIMgr.prototype.InitUI = function(uiRoot) {   
    cc.warn('init uiRoot') 
    if (!this.uiRoot)
    {
        this.uiRoot = uiRoot;
    }
}
UIMgr.prototype.restoreUIRoot = function () {
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

    var newUIRoot = cc.find('Canvas/uiRoot');
    cc.log('after Set uiRoot', newUIRoot.__instanceId);
}
// 创建，默认已经有根
UIMgr.prototype.create = function(uiName, cb) {
        
    var ret = this.ui[uiName];
    if (ret) {
        cb(null, ret);
        return;
    }
    
    var ui1 = this.uiRoot.getChildByName('level1/' + uiName);
    var ui2 = this.uiRoot.getChildByName('level2/' + uiName);
    var ui3 = this.uiRoot.getChildByName('level3/' + uiName);
    if (!!ui1) {
        cb(null, ui1);
        return;
    }
    if (!!ui2) {
        cb(null, ui2);
        return;
    }    
    if (!!ui3) {
        cb(null, ui3);
        return;
    }
    
    // 已经在加载，加入回调队列
    if (this.creatingCB.hasOwnProperty(uiName)) {
        this.creatingCB[uiName].push(cb);
        return;
    }
    
    // 初始化回调队列
    this.creatingCB[uiName] = [cb];
    var self = this;
    
    // var uiRoot = cc.find('Canvas/uiRoot');       
    // cc.log('[ui] start create: ', uiName, new Date(), uiRoot ? uiRoot.__instanceId: 0);
    cc.loader.loadRes("prefab/ui/" + uiName, function (err, prefab) {
        cc.log('[ui] end create: ', uiName, new Date());
        var cbs = self.creatingCB[uiName];
        delete self.creatingCB[uiName];
        
        if (err) {
            cc.error('loadRes prefab/ui/' + uiName, err);
            cbs.forEach(function(cb) {
                cb(err, null);
            })
        }
        else{
            var ui = cc.instantiate(prefab);
            var level = 1;
            try {
                level = ui.getComponent('BaseUI').level;
            } catch(e) {}
                        
            var levelRoot = self.uiRoot.getChildByName('level' + level);
            ui.active = false;
            ui.parent = levelRoot ? levelRoot : levelRoot;
            
            self.ui[uiName] = ui;
            cbs.forEach(function(cb) {
                cb(null, ui); 
            })       
        }
    });
};

// 打开
UIMgr.prototype.open = function(uiName, cb) {    
    
    cc.log('open ui: ', uiName);
    this.create(uiName, function(err, ui) {
        if (!!ui && !ui.active)
            var baseUI = ui.getComponent("BaseUI");
            if (!!baseUI) {
                baseUI.open();
            }
            else {
                ui.active = true;
            }
            
        if (!!cb)
            cb(ui);
    });
};

// 关闭
UIMgr.prototype.close = function(uiName) {    
    
    // cc.log('close ui: ', uiName);
    this.create(uiName, function(err, ui) {
        if (!!ui && ui.active) {
            var baseUI = ui.getComponent("BaseUI");
            if (!!baseUI) {
                baseUI.close();
            }
            else {
                ui.active = false;
            }
        }
    });
};

UIMgr.prototype.closeUI = function(ui) {
    
    ui = ui.node;
    var baseUI = ui.getComponent("BaseUI");
    if (!!baseUI) {
        baseUI.close();
    }
    else {
        ui.active = false;
    }
};


UIMgr.prototype.closeAll = function() {
    
    for (var level = 1; level <= 3; level++) {
        var uiLevel = this.uiRoot.getChildByName('level' + level);
        if (null == uiLevel) {
            cc.error("not find uiLevel" + level);
            continue;
        }
        for (var i=0, l = uiLevel.children.length; i<l; i++){
            var ui = uiLevel.children[i];
            ui.active = false;
        }
    }
};

UIMgr.prototype.update = function() {
};


var uiMgr = new UIMgr();
module.exports = uiMgr;