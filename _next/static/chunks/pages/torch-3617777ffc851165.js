(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[604],{754:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/torch",function(){return n(7334)}])},2500:function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.d(e,{Z:function(){return h}});var r=function(){function t(e,n){var i=void 0===e?1:e,r=void 0===n?0:n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.a=i,this.b=r}var e,n,r;return e=t,(n=[{key:"getValue",value:function(t){return this.a*t+this.b}}])&&i(e.prototype,n),r&&i(e,r),t}();function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var a=function(){function t(e,n,i){var r=void 0===e?1:e,o=void 0===n?0:n,a=void 0===i?0:i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.a=r,this.b=o,this.c=a}var e,n,i;return e=t,(n=[{key:"getValue",value:function(t){return this.a*t*t+this.b*t+this.c}}])&&o(e.prototype,n),i&&o(e,i),t}(),s=function(t,e,n){var i=void 0===e?0:e,o=void 0===n?1:n,a=new r,s=a.getValue(0),u=a.getValue(1),c=a.getValue(t);return c=c/(u-s)*(o-i)+i},u=function(t,e,n){var i=void 0===e?0:e,r=void 0===n?1:n,o=new a,s=o.getValue(0),u=o.getValue(1),c=o.getValue(t);return c=c/(u-s)*(r-i)+i},c=function(t,e,n,i){var r=void 0===e?0:e,o=void 0===n?1:n;switch(void 0===i?"LINEAR":i){case"LINEAR":return s(t,r,o);case"QUADRATIC":return u(t,r,o);default:return 0}};function f(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var l=function(t){var e={};for(var n in t)e[n]=t[n];return e},h=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.animatFunction="QUADRATIC",this._endState={},this._startState={},this._duration=1e3,this._start=!1,this._end=!1,this._startTime=-1,this._object=e,n&&(this.animatFunction=n)}var e,n,i;return e=t,(n=[{key:"_endTime",get:function(){return this._startTime+this._duration}},{key:"state",get:function(){return this._object}},{key:"isStart",get:function(){return this._start}},{key:"isEnd",get:function(){return this._end}},{key:"onUpdate",value:function(t){return this._onUpdateListener=t,this}},{key:"to",value:function(t,e){return this._endState=l(t),this._startState=l(this._object),e&&(this._duration=e),this._startTime=-1,this}},{key:"start",value:function(){this._start=!0,this._end=!1}},{key:"stop",value:function(){this._startTime=-1,this._start=!1,this._end=!0}},{key:"update",value:function(t){var e=void 0===t?Date.now():t;if(!this._start)return!1;if(-1===this._startTime)return this._startTime=e,!1;if(e>=this._endTime){for(var n in this._endState)this._object[n]=this._endState[n];return this._onUpdateListener&&this._onUpdateListener(this._object),this.stop(),!1}var i=e-this._startTime;for(var r in this._object){var o=this._startState[r],a=this._endState[r],s=c(i/this._duration,o,a,this.animatFunction);this._object[r]=s}return this._onUpdateListener&&this._onUpdateListener(this._object),!0}}])&&f(e.prototype,n),i&&f(e,i),t}()},5249:function(t,e,n){"use strict";var i=n(2212);function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t,e){return!e||"object"!==u(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var u=function(t){return t&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function c(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=o(t);if(e){var r=o(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return a(this,n)}}var f=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(u,t);var e,n,o,a=c(u);function u(t,e,n,r){var o,s=void 0!==n&&n,c=void 0!==r&&r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(o=a.call(this)).geometry=new i.u9r,o.material=new i.jyz({vertexShader:t,fragmentShader:e,blending:i.WMw,depthWrite:c,transparent:s}),o}return e=u,(n=[{key:"setAttributes",value:function(t,e){this.geometry.setAttribute(t,e)}},{key:"setUniforms",value:function(t,e){this.material.uniforms[t]=e}}])&&r(e.prototype,n),o&&r(e,o),u}(i.woe);e.Z=f},7456:function(t,e,n){"use strict";n.d(e,{S:function(){return i}});var i=function(t,e){var n=window.innerWidth/window.innerHeight;t.aspect=n,t.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)}},7334:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return M}});var i=n(5893),r=n(7294),o=n(2212),a=n(5249),s=n(7456),u=n(600),c=n(2500);function f(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var l,h,v,d,p,y=function(){function t(e,n,i){var r=void 0===e?new o.Pa4:e,a=void 0===n?1:n,s=void 0===i?1:i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._position={x:0,y:0,z:0},this._opacity={value:a},this._position={x:r.x,y:r.y,z:r.z},this._size={value:s},this._animatState={position:new c.Z(this.position,"LINEAR"),opacity:new c.Z(this._opacity,"LINEAR"),size:new c.Z(this._size,"LINEAR")}}var e,n,i;return e=t,(n=[{key:"position",get:function(){return this._position}},{key:"opacity",get:function(){return this._opacity}},{key:"size",get:function(){return this._size}},{key:"isStart",get:function(){return this._animatState.position.isStart||this._animatState.opacity.isStart||this._animatState.size.isStart}},{key:"isEnd",get:function(){return this._animatState.position.isEnd&&this._animatState.opacity.isEnd&&this._animatState.size.isEnd}},{key:"to",value:function(t,e){var n=void 0===e?1e3:e;return this._animatState.position.to({x:t.x,y:t.y,z:t.z},n),this}},{key:"opacityTo",value:function(t,e){var n=void 0===e?1e3:e;return this._animatState.opacity.to({value:t},n),this}},{key:"sizeTo",value:function(t,e){var n=void 0===e?1e3:e;return this._animatState.size.to({value:t},n),this}},{key:"startAnimation",value:function(){this._animatState.position.start(),this._animatState.opacity.start(),this._animatState.size.start()}},{key:"updateAnimation",value:function(t){var e=this._animatState.position.update(t),n=this._animatState.size.update(t),i=this._animatState.opacity.update(t);return e||n||i}}])&&f(e.prototype,n),i&&f(e,i),t}(),_=n(9365),m=n(9892),w=5e3,b=new o.ZAu,g=new o.dpR,S=[],k=new Float32Array(15e3),z=new Float32Array(w),P=new Float32Array(w),E=function(t){requestAnimationFrame(E),x(t),l.render(v,h)},T=function(){var t=document.createElement("canvas"),e=t.getContext("2d");t.width=200,t.height=200;var n=e.createRadialGradient(100,100,20,100,100,100);return n.addColorStop(.2,"rgba(255, 255, 255, 1)"),n.addColorStop(.8,"rgba(255, 255, 255, 0.7)"),n.addColorStop(1,"rgba(255, 255, 255, 0)"),e.fillStyle=n,e.ellipse(100,100,100,100,0,0,2*Math.PI),e.fill(),new o.ROQ(t)},j=function(){var t=u.Iy(0,360)/180*Math.PI,e=u.Iy(-45,90)/180*Math.PI,n=u.Iy(0,50),i=u.M7(t,e,n);return new y(i,Math.random(),u.Iy(5,50))},x=function(t){for(var e=0;e<S.length;e++){var n=S[e];if(n.isStart)n.updateAnimation(t),k[3*e+0]=n.position.x,k[3*e+1]=n.position.y,k[3*e+2]=n.position.z,z[e]=n.opacity.value,P[e]=n.size.value;else if(n.isEnd)S[e]=j();else{var i=u.Iy(0,360)/180*Math.PI,r=u.Iy(45,90)/180*Math.PI,a=u.Iy(0,200),s=u.M7(i,r,a),c=u.Iy(2e3,5e3);n.to(new o.Pa4(n.position.x+s.x,n.position.y+s.y,n.position.z+s.z),c).sizeTo(.5*n.size.value,c).opacityTo(0,c).startAnimation()}}d.geometry.attributes.position.needsUpdate=!0,d.geometry.attributes.size.needsUpdate=!0,d.geometry.attributes.opacity.needsUpdate=!0},I=function(){b.add(function(){for(var t=0;t<w;t++)k[3*t+0]=S[t].position.x,k[3*t+1]=S[t].position.y,k[3*t+2]=S[t].position.z,z[t]=S[t].opacity.value,P[t]=S[t].size.value;return(d=new a.Z("#define GLSLIFY 1\nattribute float size;\nattribute float opacity;\n\nvarying float vOpacity;\n\nvoid main() {\n    vOpacity = opacity;\n    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n    gl_PointSize = size * (300.0 / -mvPosition.z);\n    gl_Position = projectionMatrix * mvPosition;\n}\n","#define GLSLIFY 1\nuniform sampler2D pointTexture;\nuniform vec3 color;\n\nvarying float vOpacity;\n\nvoid main() {\n    gl_FragColor = vec4(color, vOpacity);\n    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);\n}\n",!0,!1)).setAttributes("position",new o.TlE(k,3)),d.setAttributes("opacity",new o.TlE(z,1)),d.setAttributes("size",new o.TlE(P,1)),d.setUniforms("pointTexture",{value:T()}),d.setUniforms("color",{value:new o.Ilk("#f87510")}),d}());var t=function(){var t=new o.m_w(10,10,120),e=new o.vBJ({map:g.load((0,m.w)("/images/torch/wood.jpg"))});return new o.Kj0(t,e)}();t.position.set(0,-50,0),b.add(t),v.add(b)},A=function(t){l=new o.CP7({antialias:!0,canvas:t}),(h=new o.cPb(45,1,.1,5e3)).position.set(0,0,600),new _.z(h,t).update(),v=new o.xsS,function(){var t=new o.pQR(1500,1),e=new o.xoR({color:16777215,flatShading:!0,side:o._Li});v.add(new o.Kj0(t,e))}(),p=new o.cek(16737792,1,1800,1),v.add(p),function(){for(var t=0;t<w;t++){var e=j();S.push(e)}}(),I(),(0,s.S)(h,l),window.addEventListener("resize",(function(){return(0,s.S)(h,l)})),requestAnimationFrame(E)},M=function(){var t=(0,r.useRef)(null);return(0,r.useEffect)((function(){var e=t.current;e&&A(e)}),[t]),(0,i.jsx)("canvas",{ref:t})}},9892:function(t,e,n){"use strict";n.d(e,{w:function(){return i}});var i=function(t){return"/threejs-case"+t}},600:function(t,e,n){"use strict";n.d(e,{uZ:function(){return r},Iy:function(){return o},n3:function(){return a},M7:function(){return s}});var i=n(2212),r=function(t,e,n){return t=Math.max(e,t),t=Math.min(t,n)},o=function(t,e){var n=Math.floor(t),i=Math.floor(e);return Math.floor(Math.random()*(i-n))+n},a=function(t){return t/180*Math.PI},s=function(t,e,n){var r=Math.sin(e)*n,o=Math.cos(e)*n,a=Math.cos(t)*o,s=Math.sin(t)*o;return new i.Pa4(a,r,s)}}},function(t){t.O(0,[737,365,774,888,179],(function(){return e=754,t(t.s=e);var e}));var e=t.O();_N_E=e}]);