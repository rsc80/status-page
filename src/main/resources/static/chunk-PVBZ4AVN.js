function l(e){let r=e!=null?e.assignedNodes({flatten:!0}):[],t="";return[...r].map(n=>{n.nodeType===Node.TEXT_NODE&&(t+=n.textContent)}),t}function o(e,r){return r!=null&&r!==""?e.querySelector(`[slot="${r}"]`)!==null:Array.from(e.childNodes).some(t=>{var n;return t.nodeType===t.TEXT_NODE&&((n=t.textContent)===null||n===void 0?void 0:n.trim())!==""||t.nodeType===t.ELEMENT_NODE&&!t.hasAttribute("slot")})}function s(e,r){return e==null?null:e.querySelector(`[slot="${r}"]`)}export{l as a,o as b,s as c};
