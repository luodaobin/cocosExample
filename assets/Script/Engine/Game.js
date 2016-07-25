
/**
 * 全局唯一的游戏管理器,每个场景都可以持有
 */
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
        firstScene: {
            default: 'launch',
            type: String,
        },
         nd_uiRoot: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        if (cc.thisGame) {
            this.node.destroy();
            return;
        }
        // 初始化
        cc.game.addPersistRootNode(this.node);
        cc.thisGame = this;

        cc.log('Game init');
        //this.net = require('net')();
        this.sceneMgr = require('SceneMgr');
        //this.dataMgr = require('DataMgr');
        //this.dbMgr = require('DBMgr');
        this.uiMgr = require('UIMgr');
        this.uiMgr.InitUI(this.nd_uiRoot);
        //this.msgBoxMgr = require('MsgBoxMgr');
        //this.toolMgr = require('ToolMgr');
        //this.keyWordMgr = require('KeyWordMgr');
        //this.battleMgr = require('BattleMgr').init();
        //this.rankMgr = require('RankMgr').init();
        //this.hookMgr = require('HookMgr').init();
        //this.debugMgr = require('DebugMgr').init();
        //this.effectMgr = require('EffectMgr');
        //this.audioMgr = require('AudioMgr').init();

        //this.player = require('Player');
        // 未初始化，先到loading场景, 如果原来就在这个场景，不会有任何变化
        this.sceneMgr.loadScene(this.firstScene,false);
    },

    start: function () {
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    isInteger: function (obj) {
        return Math.floor(obj) === obj
    },

    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    toInteger: function (floatNum) {
        var ret = { times: 1, num: 0 }
        if (this.isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        var strfi = floatNum + ''
        var dotPos = strfi.indexOf('.')
        var len = strfi.substr(dotPos + 1).length
        var times = Math.pow(10, len)
        var intNum = parseInt(floatNum * times + 0.5, 10)
        ret.times = times
        ret.num = intNum
        return ret
    },

    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    operation: function (a, b, op) {
        var o1 = this.toInteger(a)
        var o2 = this.toInteger(b)
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                result = (n1 / n2) * (t2 / t1)
                return result
        }
    },

    // 加减乘除的四个接口
    add: function (a, b) {
        // a = this.toFixed(a, 3);
        // b = this.toFixed(b, 3);
        return a + b;
        //return this.toFixed(this.operation(a, b, 'add'), 3);
    },
    sub: function (a, b) {
        // a = this.toFixed(a, 3);
        // b = this.toFixed(b, 3);
        return a - b;
        //return this.toFixed(this.operation(a, b, 'subtract'), 3);
    },
    mul: function (a, b) {
        // a = this.toFixed(a, 3);
        // b = this.toFixed(b, 3);
        return a * b;
        //return this.toFixed(this.operation(a, b, 'multiply'), 3);
    },
    div: function (a, b) {
        // a = this.toFixed(a, 3);
        // b = this.toFixed(b, 3);
        return a / b;
        //return this.toFixed(this.operation(a, b, 'divide'), 3);
    },

    toFixed: function (num, s) {
        s = 5;
        var times = Math.pow(10, s)
        var des = num * times + 0.5
        des = parseInt(des, 10) / times
        return des
    },

    distance: function (posAX, posAY, posBX, posBY) {
        var xSub = this.sub(posAX, posBX);
        var xMul = this.mul(xSub, xSub);

        var ySub = this.sub(posAY, posBY);
        var yMul = this.mul(ySub, ySub);

        return Math.sqrt(this.add(xMul, yMul));
    },
    openBgLoading: function(){
        //todo加载动画。
        //this.nd_bgLoading.active = true;
    },

    closeBgLoading: function(){
        //todo加载动画。
        //this.nd_bgLoading.active = false;
    },
});
