cc.Class({
    extends: cc.Component,

    properties: {
        nd_btnOK: {
            default: null,
            type: cc.Node,
        },
        nd_btnCancel: {
            default: null,
            type: cc.Node,
        },
        lb_OK: {
            default: null,
            type: cc.Label,
        },
        lb_cancel: {
            default: null,
            type: cc.Label,
        },
        lbTitle: {
            default: null,
            type: cc.Label,
        },
        lbContent: {
            default: null,
            type: cc.Label,
        },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },
    //obj{title, content, cb_OK,cb_cancel,cb_equit,lb}
    open: function (title, content, cb_OK, lb, cb_equit) {
        this.cb_OK = cb_OK;
        this.cb_equit = cb_equit;
        this.lbTitle.string = title;
        this.lbContent.string = content;
        this.nd_btnCancel.active = false;
        if (!!lb)
            this.lb_OK.string = lb;
    },

    openWithCancel: function (title, content, cb_OK, cb_cancel, lb_OK, lb_cancel) {
        this.cb_OK = cb_OK;
        this.cb_cancel = cb_cancel;
        this.cb_equit = cb_cancel;
        this.lbTitle.string = title;
        this.lbContent.string = content;
        this.nd_btnCancel.active = true;

        if (!!lb_OK)
            this.lb_OK.string = lb_OK;
        if (!!lb_cancel)
            this.lb_OK.string = lb_cancel;
    },

    onClickOK: function () {
        // 关闭界面
        this.onClose();
        if (typeof this.cb_OK == "function") {
            this.cb_OK();
        }
    },

    onClickCancel: function () {
        // 关闭界面
        this.onClose();
        if (typeof this.cb_cancel == "function") {
            this.cb_cancel();
        }
    },


    onClose: function () {
        // 关闭界面
        if (typeof this.cb_equit == "function") {
            this.cb_equit();
        }
        cc.Game.uiMgr.closeUI(this);
    },

});
