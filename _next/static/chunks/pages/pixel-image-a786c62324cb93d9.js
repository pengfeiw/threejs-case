(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[714],{9266:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/pixel-image",function(){return n(3177)}])},2386:function(t,e,n){"use strict";var i=n(5893),r=n(7294);e.Z=function(t){var e=t.init,n=(0,r.useRef)(null);return(0,r.useEffect)((function(){var t=n.current;t&&e(t)}),[n]),(0,i.jsx)("canvas",{ref:n})}},2500:function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.d(e,{Z:function(){return d}});var r=function(){function t(e,n){var i=void 0===e?1:e,r=void 0===n?0:n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.a=i,this.b=r}var e,n,r;return e=t,(n=[{key:"getValue",value:function(t){return this.a*t+this.b}}])&&i(e.prototype,n),r&&i(e,r),t}();function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var a=function(){function t(e,n,i){var r=void 0===e?1:e,o=void 0===n?0:n,a=void 0===i?0:i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.a=r,this.b=o,this.c=a}var e,n,i;return e=t,(n=[{key:"getValue",value:function(t){return this.a*t*t+this.b*t+this.c}}])&&o(e.prototype,n),i&&o(e,i),t}(),s=function(t,e,n){var i=void 0===e?0:e,o=void 0===n?1:n,a=new r,s=a.getValue(0),u=a.getValue(1),c=a.getValue(t);return c=c/(u-s)*(o-i)+i},u=function(t,e,n){var i=void 0===e?0:e,r=void 0===n?1:n,o=new a,s=o.getValue(0),u=o.getValue(1),c=o.getValue(t);return c=c/(u-s)*(r-i)+i},c=function(t,e,n,i){var r=void 0===e?0:e,o=void 0===n?1:n;switch(void 0===i?"LINEAR":i){case"LINEAR":return s(t,r,o);case"QUADRATIC":return u(t,r,o);default:return 0}};function v(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var f=function(t){var e={};for(var n in t)e[n]=t[n];return e},d=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.animatFunction="QUADRATIC",this._endState={},this._startState={},this._duration=1e3,this._start=!1,this._end=!1,this._startTime=-1,this._object=e,n&&(this.animatFunction=n)}var e,n,i;return e=t,(n=[{key:"_endTime",get:function(){return this._startTime+this._duration}},{key:"state",get:function(){return this._object}},{key:"isStart",get:function(){return this._start}},{key:"isEnd",get:function(){return this._end}},{key:"onUpdate",value:function(t){return this._onUpdateListener=t,this}},{key:"onEnd",value:function(t,e){var n=void 0===e||e,i=this;return this._onEndListener=function(e){n&&(i._onEndListener=void 0),t(e)},this}},{key:"to",value:function(t,e){return this._endState=f(t),this._startState=f(this._object),e&&(this._duration=e),this._startTime=-1,this}},{key:"start",value:function(){this._start=!0,this._end=!1}},{key:"stop",value:function(){this._startTime=-1,this._start=!1,this._end=!0}},{key:"update",value:function(t){var e=void 0===t?Date.now():t;if(!this._start)return!1;if(-1===this._startTime)return this._startTime=e,!1;if(e>=this._endTime){for(var n in this._endState)this._object[n]=this._endState[n];return this._onUpdateListener&&this._onUpdateListener(this._object),this.stop(),this._onEndListener&&this._onEndListener(this._object),!1}var i=e-this._startTime;for(var r in this._object){var o=this._startState[r],a=this._endState[r],s=c(i/this._duration,o,a,this.animatFunction);this._object[r]=s}return this._onUpdateListener&&this._onUpdateListener(this._object),!0}}])&&v(e.prototype,n),i&&v(e,i),t}()},7456:function(t,e,n){"use strict";n.d(e,{S:function(){return i}});var i=function(t,e){var n=window.innerWidth/window.innerHeight;t.aspect=n,t.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)}},3177:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return L}});var i,r,o,a,s,u,c=n(5893),v=n(2212),f=n(7456),d=n(9892),h=n(2500),l=0,x=0,m=0,w=1e3,p=new h.Z({value:w},"LINEAR"),y=!0,_=function(t){requestAnimationFrame(_),p.update(t),u.material.uniforms.uThick.value=w,u.material.uniforms.uTime.value=t,i.render(r,o)},g=function(t){s=t,function(){x=s.image.width,m=s.image.height,l=x*m;var t=s.image,e=document.createElement("canvas"),n=e.getContext("2d");e.width=x,e.height=m,n.drawImage(t,0,0,x,m);var i=n.getImageData(0,0,x,m);Float32Array.from(i.data)}(),function(){var t=new v.L5s,e=new v.TlE(new Float32Array(12),3);e.setXYZ(0,-.5,.5,0),e.setXYZ(1,.5,.5,0),e.setXYZ(2,-.5,-.5,0),e.setXYZ(3,.5,-.5,0),t.setAttribute("position",e);var n=new v.TlE(new Float32Array(8),2);n.setXY(0,0,1),n.setXY(1,1,1),n.setXY(2,0,0),n.setXY(3,1,0),t.setAttribute("uv",n),t.setIndex(new v.TlE(new Uint16Array([0,2,1,2,3,1]),1));for(var i=new Float32Array(2*l),o=new Float32Array(l),a=0;a<l;a++)i[2*a+0]=a%x,i[2*a+1]=Math.floor(a/x),o[a]=a;t.setAttribute("offset",new v.lb7(i,2,!1));var c={uTextureSize:{value:new v.FM8(x,m)},uTexture:{value:s},uTime:{value:1},uThick:{value:w}},f=new v.FIo({uniforms:c,vertexShader:"#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat snoise(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nattribute vec3 position;\nattribute vec2 offset;\nattribute vec2 uv;\n\nuniform vec2 uTextureSize;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float uTime;\nuniform float uThick;\n\nvarying vec2 vuv;\n\nvoid main() {\n    float width = uTextureSize.x;\n    float height = uTextureSize.y;\n    vec2 cellSize = vec2(1. / width, 1. / height);\n\n    vuv = (uv.xy + vec2(offset.x, height - offset.y)) * cellSize;\n\n    vec2 dist1 = offset - vec2(width * 0.25, height * 0.25);\n    vec2 dist2 = offset - vec2(width * 0.25, height * 0.75);\n    vec2 dist3 = offset - vec2(width * 0.75, height * 0.25);\n    vec2 dist4 = offset - vec2(width * 0.75, height * 0.75);\n    vec2 dist = dist1 + dist2 + dist3 + dist4;\n\n    float x = offset.x - width * 0.5;\n    float y = height * 0.5 - offset.y;\n    float z = snoise(offset + abs(sin(uTime * 0.0001)) * 0.5) * uThick * dot(dist, dist) * 0.00005;\n    gl_Position = vec4(x, y, z, 1.);\n    gl_Position = vec4(gl_Position.xy + position.xy * 0.5, gl_Position.z, 1.0);\n    gl_Position = projectionMatrix * modelViewMatrix * gl_Position;\n}\n",fragmentShader:"precision highp float;\n#define GLSLIFY 1\nuniform sampler2D uTexture;\n\nvarying vec2 vuv;\n\nvoid main() {\n    gl_FragColor = texture2D(uTexture, vuv);\n}\n",depthTest:!1,transparent:!0,side:v.ehD});u=new v.Kj0(t,f),r.add(u)}(),p.to({value:1},1e3).onUpdate((function(t){return w=t.value})).onEnd((function(){y=!1,p.to({value:50},2e3).start()})).start(),requestAnimationFrame(_)},b=function(){var t=function(){y||p.to({value:1},1e3).start()},e=function(){y||p.to({value:50},1e3).start()};window.addEventListener("resize",(function(){return(0,f.S)(o,i)})),window.addEventListener("mousemove",(function(t){var e,n,i={x:.1*(t.offsetX-.5*window.innerWidth),y:.1*(t.offsetY-.5*window.innerHeight)};e=i.x,n=i.y,o.position.x+=.1*(e-o.position.x),o.position.y+=.1*(-n-o.position.y),o.lookAt(0,0,0)})),window.addEventListener("mousedown",t),window.addEventListener("mouseup",e),window.addEventListener("touchstart",t),window.addEventListener("touchend",e)},T=function(t){t.style.cursor="pointer",function(t){i=new v.CP7({antialias:!0,canvas:t}),(o=new v.cPb(45,window.innerWidth/window.innerHeight,.1,1e3)).position.set(0,0,200),r=new v.xsS,a=new v.dpR,(0,f.S)(o,i)}(t),b(),a.load((0,d.w)("/images/pixelImage/4.jpg"),g)},E=n(2386),L=function(){return(0,c.jsx)(E.Z,{init:T})}},9892:function(t,e,n){"use strict";n.d(e,{w:function(){return i}});var i=function(t){return"/threejs-case"+t}}},function(t){t.O(0,[737,774,888,179],(function(){return e=9266,t(t.s=e);var e}));var e=t.O();_N_E=e}]);