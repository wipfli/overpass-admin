(this["webpackJsonpoverpass-admin"]=this["webpackJsonpoverpass-admin"]||[]).push([[0],{116:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n(10),c=n.n(o),a=n(16),r=n(50),s=n.n(r),l=(n(89),n(152)),d=n(119),j=n(70),u=n.n(j),b=n(71),h=n.n(b),O=n(159),f=n(153),p=n(161),x=n(6),m=function(e){var t=e.viewportWidth,n=e.viewportHeight,o=e.centerLongitude,c=e.centerLatitude,r=e.shareMap,j=Object(i.useState)(8),b=Object(a.a)(j,2),m=b[0],y=b[1],v=Object(i.useState)(null),g=Object(a.a)(v,2),w=g[0],S=g[1],C=Object(i.useRef)(null);return Object(i.useEffect)((function(){var e=new s.a.Map({container:C.current,style:"https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json",center:[o,c],zoom:m,attributionControl:!1}),t=new s.a.ScaleControl({maxWidth:80,unit:"metric"});e.addControl(t),e.dragRotate.disable(),e.touchZoomRotate.disableRotation(),e.on("move",(function(){y(e.getZoom())})),e.on("load",(function(){e.resize()})),S(e),r(e)}),[]),Object(i.useEffect)((function(){w&&w.resize()}),[t,n]),Object(x.jsxs)("div",{children:[Object(x.jsx)("div",{ref:C,style:{position:"absolute",width:t-1,height:n-1,overflow:"hidden"}}),Object(x.jsx)("div",{style:{position:"absolute",right:0,top:0,padding:10},children:Object(x.jsxs)(O.a,{display:"flex",flexDirection:"column",children:[Object(x.jsx)(p.a,{title:"Zoom In",placement:"left",children:Object(x.jsx)(l.a,{onClick:function(){w&&(w.setZoom(m+1),y(m+1))},children:Object(x.jsx)(u.a,{})})}),Object(x.jsx)(p.a,{title:"Zoom Out",placement:"left",children:Object(x.jsx)(l.a,{onClick:function(){w&&(w.setZoom(m-1),y(m-1))},children:Object(x.jsx)(h.a,{})})})]})}),Object(x.jsx)("div",{style:{position:"absolute",right:0,bottom:0},children:Object(x.jsx)(O.a,{display:"flex",justifyContent:"flex-end",mx:1,color:"text.secondary",children:Object(x.jsx)(d.a,{style:{fontSize:12},children:Object(x.jsx)(f.a,{color:"inherit",href:"https://www.geo.admin.ch/",children:"\xa9swisstopo "})})})})]})},y=n(51),v=n.n(y),g=n(72),w=n.n(g),S=n(155),C=n(162),E=n(163),L=n(157),k=n(156),z=n(154),Z=function(e){var t=e.map,n=Object(i.useState)("loading..."),o=Object(a.a)(n,2),c=o[0],r=o[1],s=Object(i.useState)(["loading..."]),l=Object(a.a)(s,2),d=l[0],j=l[1];Object(i.useEffect)((function(){v.a.get("/layers").then((function(e){j(e.data),r(e.data[0])})).catch((function(e){return console.log(e)}))}),[]);var u=function(){if(!t)return"";var e=t.getBounds().toArray(),n=Object(a.a)(e,2),i=Object(a.a)(n[0],2),o=i[0],r=i[1],s=Object(a.a)(n[1],2),l=s[0],d=s[1];return w()("/query",{queryParams:{layer:c,longitude0:o,latitude0:r,longitude1:l,latitude1:d}})};return Object(x.jsx)("div",{style:{position:"absolute",left:0,top:0},children:Object(x.jsxs)(O.a,{m:1,p:1,children:[Object(x.jsx)(z.a,{children:Object(x.jsx)(O.a,{m:1,p:1,children:Object(x.jsxs)(S.a,{children:[Object(x.jsx)(C.a,{children:"Layer"}),Object(x.jsx)(L.a,{value:c,onChange:function(e){r(e.target.value)},children:d.map((function(e,t){return Object(x.jsx)(E.a,{value:e,children:e},t.toString())}))})]})})}),Object(x.jsxs)(O.a,{my:1,display:"flex",flexDirection:"row",children:[Object(x.jsx)(O.a,{children:Object(x.jsx)(k.a,{variant:"contained",color:"primary",onClick:function(){v.a.get(u()).then((function(e){t.getSource("my-overlay")?t.getSource("my-overlay").setData(e.data):(t.addSource("my-overlay",{type:"geojson",data:e.data}),t.addLayer({id:"my-overlay",source:"my-overlay",type:"fill",paint:{"fill-color":"#a61662","fill-opacity":.5}}))})).catch((function(e){console.log(e)}))},children:"Show"})}),Object(x.jsx)(O.a,{mx:1,children:Object(x.jsx)(k.a,{variant:"contained",color:"primary",onClick:function(){window.open(u())},children:"Download"})})]})]})})},W=function(){var e=Object(i.useState)(window.innerHeight),t=Object(a.a)(e,2),n=t[0],o=t[1],c=Object(i.useState)(window.innerWidth),r=Object(a.a)(c,2),s=r[0],l=r[1],d=Object(i.useState)(null),j=Object(a.a)(d,2),u=j[0],b=j[1];return Object(i.useEffect)((function(){var e=function(){o(window.innerHeight),l(document.getElementById("root").clientWidth)};return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),Object(x.jsxs)("div",{children:[Object(x.jsx)(m,{viewportWidth:s,viewportHeight:n,centerLongitude:8.55301,centerLatitude:47.35257,shareMap:b}),Object(x.jsx)(Z,{map:u})]})};c.a.render(Object(x.jsx)(W,{}),document.getElementById("root"))}},[[116,1,2]]]);
//# sourceMappingURL=main.48e6bbb2.chunk.js.map