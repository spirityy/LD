(function(j){var g=j.document||document,i=/\.css(?:\?|$)/i;(this.LD={loading:false,_loadedJs:{},_loadedCss:{},_mods:{},init:function(){this._load("https://ajax.googleapis.com/ajax/libs/mootools/1.3.0/mootools-yui-compressed.js")},add:function(a){if(typeof a==="string"){a=a.split(",");for(var b in a)this._mods[this._getModName(a[b])]=a[b]}},use:function(a,b,d){if(typeof a==="string"){a=a.split(",");for(var c in a)this._mods[a[c]]&&this._load(this._mods[a[c]],b,d)}else typeof a==="function"&&this._load(a,
b)},_getModName:function(a){if(typeof a!=="string")return null;return a.substring(a.lastIndexOf("/")+1,a.lastIndexOf("."))},_getScript:function(a,b){var d=i.test(a),c=g.createElement(d?"link":"script");if(d){c.href=a;c.type="text/css";c.rel="stylesheet"}else{c.src=a;c.type="text/javascript";c.setAttribute("async",true)}if(b)c.charset=b;return c},_load:function(a,b,d,c){var f=this._getModName(a),h=this;if(!(this._loadedJs[f]||this._loadedCss[f]))if(this.loading)setTimeout(function(){h._load(a,b,d)},
1);else if(typeof a==="function")a.call(b);else{this.loading=true;var e=this._getScript(a,c);if(i.test(a)){g.documentElement.firstChild.insertBefore(e,null);b&&b.call(d);this._loadedCss[f]=a;this.loading=false}else{e.onload=e.onreadystatechange=function(){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){h._loadedJs[f]=a;b&&b.call(d);e.onload=e.onreadystatechange=null;h.loading=false}};g.documentElement.firstChild.insertBefore(e,null)}}}}).init()})(this);
