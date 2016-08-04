module.exports = {
  load () {
    // 当 package 被正确加载的时候执行
  },

  unload () {
    // 当 package 被正确卸载的时候执行
  },

  messages: {
    'say-hello' () {
      Editor.log('Hello World!');
    },
	
	'foo-bar' ( event ) { 
		Editor.log('hello foobar'); 
	},
	
    'scene:saved' ( event ) {
		Editor.log('scene saved2!'); 
	},
  },
};