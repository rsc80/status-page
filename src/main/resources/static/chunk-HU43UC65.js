function a(n,t,i,e,o,s){if(!n||t==null||i==null||e==null)return;let g=u(t),c=i.getBoundingClientRect(),l=c.top,h=g.top,d=w(i,e,o);d&&l<h&&(t.style.top=`${h-g.height-c.height}px`),s(d)}function f(n){setTimeout(()=>{if(n==null)return;let t=n.getBoundingClientRect();t.y<0&&window.innerHeight-t.height>0&&Math.abs(t.y)<=t.height?(u(n),n.style.top="0px"):window.innerHeight<t.y+t.height&&window.innerHeight>t.height&&Math.abs(t.y-window.innerHeight)<=t.height&&(u(n),n.style.top=`${window.innerHeight-t.height}px`),window.innerWidth<t.x+t.width&&window.innerWidth>t.width&&Math.abs(t.x-window.innerWidth)<=t.width&&(u(n),n.style.left=`${window.innerWidth-t.width}px`)},0)}function w(n,t,i){let e=n.getBoundingClientRect(),o=t.getBoundingClientRect(),s=Math.max(o.height,i);return e.y>window.innerHeight/2&&window.innerHeight<e.bottom+s}function u(n){let t=n.getBoundingClientRect();return n.style.position="fixed",n.style.top=t.top+"px",n.style.left=t.left+"px",n.style.width=t.width+"px",n.style.minHeight="fit-content",t}function y(n,t,i,e,o,s){if(!n||!t||i==null||e==null||o==null)return;let c=i.getBoundingClientRect().height,l=e.getBoundingClientRect(),h=l.top,d=l.height;w(e,o,s)?i.style.top=`${h-c}px`:i.style.top=`${h+d}px`}export{a,f as b,w as c,y as d};
