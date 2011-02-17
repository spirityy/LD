/**
 * @file ld.js 
 * @author spirityy109@gmail.com
 */

(function(win, undefined) {

	var _doc = win['document'] || document,

	reCss = /\.css(?:\?|$)/i;

	/*
     *  创建LD,用于异步加载js和css
     */
	var LD = this.LD = {
		loading: false,
		_loadedJs: {},
		_loadedCss: {},
		_mods: {},
		init: function() {
			//load mootools core
			this._load('https://ajax.googleapis.com/ajax/libs/mootools/1.3.0/mootools-yui-compressed.js');
		},
		/*
         * 加载模块到队列 
         */
		add: function(urls) {
			if (typeof urls !== 'string') return;
			var queue = urls.split(',');
			for (var i in queue) {
				var modName = this._getModName(queue[i]);
				this._mods[modName] = queue[i];
			}
			return;
		},
		/*
         * 激活模块并调用回调
         */
		use: function(modNames, callback, context) {
			if (typeof modNames === 'string') {
				var queue = modNames.split(',');
				for (var i in queue) {
					if (this._mods[queue[i]]) this._load(this._mods[queue[i]], callback,context);
				}
			} else if (typeof modNames === 'function') {
                   this._load(modNames,callback);
			} else {
                return;
			}
		},
		_getModName: function(str) {
			if (typeof str !== 'string') return null;
			return str.substring(str.lastIndexOf('/') + 1, str.lastIndexOf('.'));
		},
		/*
         * 创建一个css或者异步js节点 
         */
		_getScript: function(url, charset) {
			var isCss = reCss.test(url),
			node = _doc.createElement(isCss ? 'link': 'script');

			if (isCss) {
				node.href = url;
				node.type = 'text/css';
				node.rel = 'stylesheet';
			} else {
				node.src = url;
				node.type = 'text/javascript';
				node.setAttribute('async', true);
			}
			if (charset) node.charset = charset;

			return node;
		},
		/*
         * 加载文件 
         */
		_load: function(url, cb, context,charset) {
			var modName = this._getModName(url),
			self = this;

			if (this._loadedJs[modName] || this._loadedCss[modName]) return;

			//判断是否正在加载
			if (this.loading) {
				setTimeout(function() {
					self._load(url, cb, context);
				},
				1);
				return;
			}

            if(typeof url === 'function'){
                url.call(cb);
                return;
            }

			this.loading = true;
			var node = this._getScript(url,charset);

			//如果是css直接插入节点
			if (reCss.test(url)) {
				_doc.documentElement.firstChild.insertBefore(node, null);
				if (cb) {
					cb.call(context);
				}
				this._loadedCss[modName] = url;
				this.loading = false;
				return;
			}

            //监听js加载
			node.onload = node.onreadystatechange = function() {
				if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
					self._loadedJs[modName] = url;
					if (cb) {
						cb.call(context);
					}
					node.onload = node.onreadystatechange = null;
					self.loading = false;
				}
			};

			_doc.documentElement.firstChild.insertBefore(node, null);
		}
	};

	LD.init();

})(this);
