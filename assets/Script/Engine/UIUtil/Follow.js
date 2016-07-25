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
    },

    follow: function(node) {
        this.followTarget = node;        
        this.setPos();
    },
        
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (!this.followTarget) {
            cc.log(this.followTarget);
            return;
        }
        this.setPos();
    },
    
    setPos: function() {
        var worldSpacePos = this.followTarget.parent.convertToWorldSpaceAR(this.followTarget);
        var nodeSpacePos = this.node.parent.convertToNodeSpaceAR(worldSpacePos);
        this.node.position = nodeSpacePos;
    }
});
