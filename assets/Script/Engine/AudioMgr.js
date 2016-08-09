var basePath = '/resources/music/'
var AudioMgr = function () {
    this._curMusic = null;    
};
AudioMgr.prototype.init = function () {
    
    this.recordMusicVolume = cc.audioEngine.getMusicVolume();
    this.recordEffectVolume = cc.audioEngine.getEffectsVolume();
    // var setData = cc.Game.dbMgr.getJson('setData');  
    // if (setData) {
    //     this.setMusicOpen(setData.isMuiscOpen);
    //     this.setEffectOpen(setData.isEffectOpen);
    // } else {
    //     this.setMusicOpen(true);
    //     this.setEffectOpen(true);
    // }
    
    return this;    
};

//音效。多轨
AudioMgr.prototype.playEffectUrl = function (url,loop) {
    var ret = cc.audioEngine.playEffect(url,loop);//return audioId
    if (!ret) {
        cc.error('can not find the effect:', url);
    }
    return ret;    
};

AudioMgr.prototype.playEffect = function (name,loop) {  
    var url = cc.url.raw(basePath + name);    
    var ret = cc.audioEngine.playEffect(url,loop);//return audioId
    if (!ret) {
        cc.error('can not find the effect:', url);
    }
    return ret;    
};
//todo stop stopEffect(audioId)
AudioMgr.prototype.stopAllEffects = function () {
    return cc.audioEngine.stopAllEffects();//return audioId
};

//背景音乐。单轨
AudioMgr.prototype.playMusicUrl = function (url, loop) {
    if (this._curMusic || cc.audioEngine.isMusicPlaying()) {
        cc.log('there has been a music to play when it try to play', url,";\tcurMusic is " + this._curMusic)
    }
    //todo 检查音乐是否正在播放。
    this._curMusic = url;
    return cc.audioEngine.playMusic(url,loop);
};

//背景音乐。单轨
AudioMgr.prototype.playMusic = function (name, loop) {
    var url = cc.url.raw(basePath + name);    
    if (this._curMusic || cc.audioEngine.isMusicPlaying()) {
        cc.log('there has been a music to play when it try to play', url)
    }
    //todo 检查音乐是否正在播放。
    this._curMusic = url;
    return cc.audioEngine.playMusic(url,loop);
};

AudioMgr.prototype.stopMusic = function (isReleaseData) {
    this._curMusic = null;
    return cc.audioEngine.stopMusic(isReleaseData);
};
//设置音乐的音量
AudioMgr.prototype.setMusicVolume = function (volume) {
    return cc.audioEngine.setMusicVolume(volume);
};
//设置音效的音量
AudioMgr.prototype.setEffectsVolume = function (volume) {
    return cc.audioEngine.setEffectsVolume(volume);
};
//开、关音乐
AudioMgr.prototype.setMusicOpen = function (isOpen) {
    if (isOpen) {
        this.setMusicVolume(this.recordMusicVolume || 1.0);
    } else {
        this.recordMusicVolume = cc.audioEngine.getMusicVolume();
        this.setMusicVolume(0);
    }
};

//开、关音效
AudioMgr.prototype.setEffectOpen = function (isOpen) {
    if (isOpen) {
        this.setEffectsVolume(this.recordEffectVolume || 1.0);
    } else {
        this.recordEffectVolume = cc.audioEngine.getEffectsVolume();
        this.setEffectsVolume(0);
    }
};


var mgr = new AudioMgr();
module.exports = mgr;