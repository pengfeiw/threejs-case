(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[214],{965:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/gallery",function(){return e(4277)}])},2500:function(t,n,e){"use strict";function i(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}e.d(n,{Z:function(){return h}});var o=function(){function t(n,e){var i=void 0===n?1:n,o=void 0===e?0:e;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.a=i,this.b=o}var n,e,o;return n=t,(e=[{key:"getValue",value:function(t){return this.a*t+this.b}}])&&i(n.prototype,e),o&&i(n,o),t}();function r(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var a=function(){function t(n,e,i){var o=void 0===n?1:n,r=void 0===e?0:e,a=void 0===i?0:i;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.a=o,this.b=r,this.c=a}var n,e,i;return n=t,(e=[{key:"getValue",value:function(t){return this.a*t*t+this.b*t+this.c}}])&&r(n.prototype,e),i&&r(n,i),t}(),u=function(t,n,e){var i=void 0===n?0:n,r=void 0===e?1:e,a=new o,u=a.getValue(0),s=a.getValue(1),c=a.getValue(t);return c=c/(s-u)*(r-i)+i},s=function(t,n,e){var i=void 0===n?0:n,o=void 0===e?1:e,r=new a,u=r.getValue(0),s=r.getValue(1),c=r.getValue(t);return c=c/(s-u)*(o-i)+i},c=function(t,n,e,i){var o=void 0===n?0:n,r=void 0===e?1:e;switch(void 0===i?"LINEAR":i){case"LINEAR":return u(t,o,r);case"QUADRATIC":return s(t,o,r);default:return 0}};function f(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var l=function(t){var n={};for(var e in t)n[e]=t[e];return n},h=function(){function t(n,e){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.animatFunction="QUADRATIC",this._endState={},this._startState={},this._duration=1e3,this._start=!1,this._end=!1,this._startTime=-1,this._object=n,e&&(this.animatFunction=e)}var n,e,i;return n=t,(e=[{key:"_endTime",get:function(){return this._startTime+this._duration}},{key:"state",get:function(){return this._object}},{key:"isStart",get:function(){return this._start}},{key:"isEnd",get:function(){return this._end}},{key:"onUpdate",value:function(t){return this._onUpdateListener=t,this}},{key:"to",value:function(t,n){return this._endState=l(t),this._startState=l(this._object),n&&(this._duration=n),this._startTime=-1,this}},{key:"start",value:function(){this._start=!0,this._end=!1}},{key:"stop",value:function(){this._startTime=-1,this._start=!1,this._end=!0}},{key:"update",value:function(t){var n=void 0===t?Date.now():t;if(!this._start)return!1;if(-1===this._startTime)return this._startTime=n,!1;if(n>=this._endTime){for(var e in this._endState)this._object[e]=this._endState[e];return this._onUpdateListener&&this._onUpdateListener(this._object),this.stop(),!1}var i=n-this._startTime;for(var o in this._object){var r=this._startState[o],a=this._endState[o],u=c(i/this._duration,r,a,this.animatFunction);this._object[o]=u}return this._onUpdateListener&&this._onUpdateListener(this._object),!0}}])&&f(n.prototype,e),i&&f(n,i),t}()},4277:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return _}});var i=e(5893),o=e(3236),r=e(7294),a=e(2212),u=e(2500);function s(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,n){return!n||"object"!==h(n)&&"function"!==typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function l(t,n){return(l=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}var h=function(t){return t&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function v(t){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,i=c(t);if(n){var o=c(this).constructor;e=Reflect.construct(i,arguments,o)}else e=i.apply(this,arguments);return f(this,e)}}var d=function(t){!function(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&l(t,n)}(r,t);var n,e,i,o=v(r);function r(t,n,e,i){var a;return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,r),(a=o.call(this,t,n,e,i))._inAnimation=!1,a.animatState={position:new u.Z({x:0,y:0,z:0}),lookAt:new u.Z({x:0,y:0,z:0})},a}return n=r,(e=[{key:"inAnimation",get:function(){return this._inAnimation}},{key:"to",value:function(t){var n=this;return this.animatState.position.to({x:t.x,y:t.y,z:t.z}).onUpdate((function(t){n.position.x=t.x,n.position.y=t.y,n.position.z=t.z})),this}},{key:"lookTo",value:function(t){var n=this,e=new a.Pa4(0,0,-1);e.applyQuaternion(this.quaternion);var i=this.position.clone().add(e);return this.animatState.lookAt=new u.Z({x:i.x,y:i.y,z:i.z}),this.animatState.lookAt.to({x:t.x,y:t.y,z:t.z}).onUpdate((function(t){n.lookAt(new a.Pa4(t.x,t.y,t.z))})),this}},{key:"startAnimation",value:function(){var t,n;null===(t=this.animatState.position)||void 0===t||t.start(),null===(n=this.animatState.lookAt)||void 0===n||n.start()}},{key:"updateAnimation",value:function(t){var n,e,i=null===(n=this.animatState.position)||void 0===n?void 0:n.update(t),o=null===(e=this.animatState.lookAt)||void 0===e?void 0:e.update(t);return i||o}}])&&s(n.prototype,e),i&&s(n,i),r}(a.cPb),p=e(9892);function w(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function y(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},i=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(e).filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})))),i.forEach((function(n){w(t,n,e[n])}))}return t}var b=function(t){var n=new a.CP7({antialias:!0,canvas:t}),e=new a.xsS;e.background=new a.Ilk("#092133");var i=new a.iMs,o=new d(45,1,.1,1e4);o.rotation.order="XZY",o.position.set(0,0,0);var r=function(){var t=window.innerWidth/window.innerHeight;o.aspect=t,o.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)},u=function(t){n.render(e,o),o.updateAnimation(t),requestAnimationFrame(u)};!function(){for(var t=new a.lLk,n=new a.dpR(t),i=[],o=0;o<10;o++)i.push(new a.vBJ({map:n.load((0,p.w)("/images/gallery/".concat(o+1,".jpg")))}));for(var r=new a.BKK(10,10),u=0;u<5;u++)for(var s=0;s<30;s++){var c=15*u-35+5,f=2*Math.PI/30*s,l=80*Math.sin(f),h=80*Math.cos(f),v=i[Math.floor(Math.random()*i.length)],d=new a.Kj0(r,v);d.position.set(l,c,h),d.lookAt(0,c,0),e.add(d)}}(),r(),function(){var n=!1,u=!1,s=null,c=new a.Pa4,f={x:0,y:0},l={x:0,y:0},h={x:0,y:0},v=function(n){return{x:n.touches[0].pageX-t.offsetLeft,y:n.touches[0].pageY-t.offsetTop}},d=function(t,e){var i=t/window.innerWidth*2-1,o=-e/window.innerHeight*2+1;n=!0,f={x:i,y:o}},p=function(){if(n=!1,!u){i.setFromCamera(f,o);var t=i.intersectObjects(e.children);if(t.length>0&&s!==t[0].object.id){var r=t[0].object.position;c=(new a.Pa4).copy(t[0].object.position);var l=new a.Pa4(.8*r.x,r.y,.8*r.z);o.to(l).lookTo(r).startAnimation(),s=t[0].object.id}null!==s&&0===t.length&&(o.to(new a.Pa4(0,0,0)).lookTo(new a.Pa4(c.x,0,c.z)).startAnimation(),s=null)}u=!1},w=function(t){n&&(u=!0,null===s&&(o.rotation.y+=.001*t))};window.addEventListener("mousedown",(function(t){t.preventDefault(),h={x:t.offsetX,y:t.offsetY},d(t.offsetX,t.offsetY)})),window.addEventListener("mouseup",(function(t){t.preventDefault(),p()})),window.addEventListener("mousemove",(function(t){t.preventDefault(),Math.sqrt(Math.pow(t.offsetX-h.x,2)+Math.pow(t.offsetY-h.y,2))>.1&&w(t.movementX)})),window.addEventListener("touchstart",(function(t){t.cancelable&&t.preventDefault();var n=v(t);h=y({},n),l=y({},n),d(n.x,n.y)})),window.addEventListener("touchmove",(function(t){t.cancelable&&t.preventDefault();var n=v(t);Math.sqrt(Math.pow(n.x-h.x,2)+Math.pow(n.y-h.y,2))>.1&&w(n.x-l.x),l=y({},n)})),window.addEventListener("touchend",(function(t){t.cancelable&&t.preventDefault(),p()})),window.addEventListener("resize",r)}(),requestAnimationFrame(u)},_=function(){var t=(0,r.useRef)(null);return(0,r.useEffect)((function(){var n=t.current;n&&b(n)}),[t]),(0,i.jsx)(o.kC,{justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",children:(0,i.jsx)("canvas",{ref:t})})}},9892:function(t,n,e){"use strict";e.d(n,{w:function(){return i}});var i=function(t){return"/threejs-case"+t}}},function(t){t.O(0,[737,236,774,888,179],(function(){return n=965,t(t.s=n);var n}));var n=t.O();_N_E=n}]);