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
        clickCloseUI : false
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);        
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
    },

    onClick: function(event) {        
        event.stopPropagation();
        if (this.clickCloseUI)
            this.node.dispatchEvent(new cc.Event.EventCustom('closeUI', true));
        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
