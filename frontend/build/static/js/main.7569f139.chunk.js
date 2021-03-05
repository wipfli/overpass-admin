(this["webpackJsonpoverpass-admin"]=this["webpackJsonpoverpass-admin"]||[]).push([[0],{122:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n(10),c=n.n(i),a=n(15),r=n(55),l=n.n(r),s=(n(94),n(160)),d=n(43),u=n(76),j=n.n(u),h=n(77),b=n.n(h),p=n(170),y=n(161),f=n(173),O=n(5),m=function(e){var t=e.viewportWidth,n=e.viewportHeight,i=e.centerLongitude,c=e.centerLatitude,r=e.shareMap,u=Object(o.useState)(8),h=Object(a.a)(u,2),m=h[0],v=h[1],x=Object(o.useState)(null),g=Object(a.a)(x,2),w=g[0],S=g[1],C=Object(o.useRef)(null);return Object(o.useEffect)((function(){var e=new l.a.Map({container:C.current,style:"https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json",center:[i,c],zoom:m,attributionControl:!1}),t=new l.a.ScaleControl({maxWidth:80,unit:"metric"});e.addControl(t),e.dragRotate.disable(),e.touchZoomRotate.disableRotation(),e.on("move",(function(){v(e.getZoom())})),e.on("load",(function(){e.resize()})),S(e),r(e)}),[]),Object(o.useEffect)((function(){w&&w.resize()}),[t,n]),Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{ref:C,style:{position:"absolute",width:t-1,height:n-1,overflow:"hidden"}}),Object(O.jsx)("div",{style:{position:"absolute",right:0,top:0,padding:10},children:Object(O.jsxs)(p.a,{display:"flex",flexDirection:"column",children:[Object(O.jsx)(f.a,{title:"Zoom In",placement:"left",children:Object(O.jsx)(s.a,{onClick:function(){w&&(w.setZoom(m+1),v(m+1))},children:Object(O.jsx)(j.a,{})})}),Object(O.jsx)(f.a,{title:"Zoom Out",placement:"left",children:Object(O.jsx)(s.a,{onClick:function(){w&&(w.setZoom(m-1),v(m-1))},children:Object(O.jsx)(b.a,{})})})]})}),Object(O.jsx)("div",{style:{position:"absolute",right:0,bottom:0},children:Object(O.jsx)(p.a,{display:"flex",justifyContent:"flex-end",mx:1,color:"text.secondary",children:Object(O.jsx)(d.a,{style:{fontSize:12},children:Object(O.jsx)(y.a,{color:"inherit",href:"https://www.geo.admin.ch/",children:"\xa9swisstopo "})})})})]})},v=n(56),x=n.n(v),g=(n(120),n(163)),w=n(174),S=n(165),C=n(169),k=n(166),E=n(162),L=n(164),H=n(125),z=n(167),W=n(57),M=n.n(W),Z=n(172),B=function(e){var t=e.map,n=e.viewportHeight,i=e.viewportWidth,c=Object(o.useState)("loading..."),r=Object(a.a)(c,2),l=r[0],d=r[1],u=Object(o.useState)(["loading..."]),j=Object(a.a)(u,2),h=j[0],b=j[1],y=Object(o.useState)(null),f=Object(a.a)(y,2),m=f[0],v=f[1],W=Object(o.useState)(null),B=Object(a.a)(W,2),D=B[0],F=B[1];Object(o.useEffect)((function(){x.a.get("https://api3.geo.admin.ch/rest/services/api/MapServer").then((function(e){var t=e.data.layers.map((function(e){return e.layerBodId})).sort();b(t),d(t[0])})).catch((function(e){return console.log(e)}))}),[]);var I=function(){if(!t)return"";var e=t.getBounds().toArray(),n=Object(a.a)(e,2),o=Object(a.a)(n[0],2),i=o[0],c=o[1],r=Object(a.a)(n[1],2),s=r[0],d=r[1];return"https://api3.geo.admin.ch/rest/services/api/MapServer/identify?geometryType=esriGeometryEnvelope&geometry=".concat(i,",").concat(c,",").concat(s,",").concat(d,"&imageDisplay=500,600,96&mapExtent=").concat(i,",").concat(c,",").concat(s,",").concat(d,"&tolerance=1&layers=all:").concat(l,"&sr=4326&geometryFormat=geojson")};return Object(O.jsxs)("div",{style:{position:"absolute",left:0,top:0},children:[Object(O.jsxs)(p.a,{m:1,p:1,children:[Object(O.jsx)(E.a,{children:Object(O.jsx)(p.a,{m:1,p:1,children:Object(O.jsxs)(g.a,{children:[Object(O.jsx)(w.a,{children:"Layer"}),Object(O.jsx)(C.a,{value:l,onChange:function(e){d(e.target.value)},children:h.map((function(e,t){return Object(O.jsx)(S.a,{value:e,children:e},t.toString())}))})]})})}),Object(O.jsxs)(p.a,{my:1,display:"flex",flexDirection:"row",children:[Object(O.jsx)(p.a,{children:Object(O.jsx)(k.a,{variant:"contained",color:"primary",onClick:function(){v("loading..."),F(null),x.a.get(I()).then((function(e){e.data.results.length>0?v("Loaded ".concat(e.data.results.length," features.")):v("Found no features."),t.getSource("my-overlay")?t.getSource("my-overlay").setData({type:"FeatureCollection",features:e.data.results}):(t.addSource("my-overlay",{type:"geojson",data:{type:"FeatureCollection",features:e.data.results}}),t.addLayer({filter:["==","$type","Polygon"],id:"my-overlay-fill",source:"my-overlay",type:"fill",paint:{"fill-color":"#3498db","fill-opacity":.5}}),t.addLayer({id:"my-overlay-line",source:"my-overlay",type:"line",paint:{"line-color":"#2980b9","line-width":2,"line-opacity":.5}}),t.addLayer({filter:["==","$type","Point"],id:"my-overlay-point",source:"my-overlay",type:"circle",paint:{"circle-radius":8,"circle-color":"#2980b9","circle-opacity":.5}}),t.on("click","my-overlay-fill",(function(e){F(e.features[0].properties)})),t.on("click","my-overlay-line",(function(e){F(e.features[0].properties)})),t.on("click","my-overlay-point",(function(e){F(e.features[0].properties)})))})).catch((function(e){v("Error loading features.")}))},children:"Show"})}),Object(O.jsx)(p.a,{mx:1,children:Object(O.jsx)(k.a,{variant:"contained",color:"primary",onClick:function(){window.open(I())},children:"GeoJSON"})})]}),D&&Object(O.jsx)(E.a,{children:Object(O.jsxs)(p.a,{m:1,p:1,children:[Object(O.jsx)(s.a,{onClick:function(){return F(null)},children:Object(O.jsx)(M.a,{})}),Object(O.jsx)(p.a,{style:{width:Math.min(.75*i,340),maxHeight:.5*n,overflow:"auto"},children:Object(O.jsx)(L.a,{children:Object.keys(D).map((function(e,t){return Object(O.jsx)(H.a,{children:Object(O.jsx)(z.a,{primary:D[e],secondary:e})},t)}))})})]})})]}),Object(O.jsx)(Z.a,{open:Boolean(m),autoHideDuration:5e3,onClose:function(){return v(null)},message:m,anchorOrigin:{vertical:"top",horizontal:"center"},action:Object(O.jsx)(s.a,{color:"inherit",onClick:function(){return v(null)},children:Object(O.jsx)(M.a,{})})})]})},D=function(){var e=Object(o.useState)(window.innerHeight),t=Object(a.a)(e,2),n=t[0],i=t[1],c=Object(o.useState)(window.innerWidth),r=Object(a.a)(c,2),l=r[0],s=r[1],d=Object(o.useState)(null),u=Object(a.a)(d,2),j=u[0],h=u[1];return Object(o.useEffect)((function(){var e=function(){i(window.innerHeight),s(document.getElementById("root").clientWidth)};return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),Object(O.jsxs)("div",{children:[Object(O.jsx)(m,{viewportWidth:l,viewportHeight:n,centerLongitude:8.55301,centerLatitude:47.35257,shareMap:h}),Object(O.jsx)(B,{map:j,viewportHeight:n,viewportWidth:l})]})};c.a.render(Object(O.jsx)(D,{}),document.getElementById("root"))}},[[122,1,2]]]);
//# sourceMappingURL=main.7569f139.chunk.js.map