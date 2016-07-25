cc.Class({
    extends: cc.Component,

    properties: {
        /** 同一个节点下，value越大，越在前面；与父子节点没关系
         * uiRoot节点下的范围说明：
         * 
         * 0-99 底层场景层
         * 100-199 游戏内容弹界面层
         * 200-299 悬浮提示层
         * 300-399 游戏内容模态框层
         * 400-499 系统级别模态框
         */
        index: {
            get: function () {
                return this.node.zIndex;
            },
            set: function (value) {
                this.node.zIndex = value;
            }
        },
        level: 1, // 界面层级
        openDuration: 0.5, // 开关动画时间
        closeDuration: 0, // 开关动画时间
        _x: undefined,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.initScale = this.node.scale;
        this.openScale = this.initScale * 0.9;
        this.openAction = cc.scaleTo(0.5, this.initScale).easing(cc.easeElasticOut());
        this.closeAction = cc.scaleTo(this.closeDuration, this.openScale).easing(cc.easeElasticIn());

        this.node.on('closeUI', function (event) {
            event.stopPropagation();
            cc.Game.uiMgr.closeUI(self);
        });

        self._x = self.node.x;
    },

    onEnable: function () {
        this.node.stopAllActions();
        if (0 == this.openDuration) {
            this.node.scale = this.initScale;
        }
        else {
            this.node.scale = this.openScale;
            this.node.runAction(this.openAction);
        }
    },

    open: function () {
        var self = this;
        this.node.stopAllActions();
        cc.log('doOpen', self.node.name);
        self.node.active = true;

        //临时方案。
        if (self._x != 'undefined') {
            self.node.x = self._x;
        }
    },

    close: function () {
        var self = this;
        cc.log('startClose', self.node.name);

        this.node.stopAllActions();
        //临时方案。        
        self.node.x = 3000;

        if (0 == this.closeDuration) {
            self.node.active = false;
            return;
        }

        var doClose = cc.callFunc(function () {
            cc.log('doClose', self.node.name);
            self.node.active = false;
        }, this);

        var seq = cc.sequence(this.closeAction, doClose);
        this.node.runAction(seq);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
