import{d as t,g as r,i as g}from"./chunk-5LMRLIWH.js";var c=".language-switcher__container{display:flex}.language-switcher__separator{padding:0 0.25rem}.language-switcher__label{cursor:pointer}.language-switcher__label:hover{color:var(--six-color-web-rock-600)}.language-switcher__label:focus-visible{outline:var(--six-focus-ring);outline-offset:var(--six-focus-ring-offset)}.language-switcher__label--selected{color:var(--six-color-black);text-decoration:underline}",l=c,h=["EN","DE","ES"],u=(()=>{let i=class{constructor(e){g(this,e),this.sixChange=r(this,"six-language-switcher-change",7),this.handleLanguageSwitching=(s,a)=>()=>{a!==void 0?this.sixChange.emit(a):this.sixChange.emit(s),this.selected=s},this.selected=void 0,this.languages=h}handleChangesLanguages(e){if(!Array.isArray(e))throw new Error("languages is expected to be an array");this.updateSelectedLanguage()}componentWillLoad(){this.selected===void 0&&this.updateSelectedLanguage()}updateSelectedLanguage(){let e=this.languages[0];typeof e=="string"?(this.selected=e,this.sixChange.emit(this.selected)):(this.selected=e.key,this.sixChange.emit(e.value))}render(){return t("div",{key:"5ba97f481c478180a10697b498756392192f69f0",part:"container",class:"language-switcher__container"},this.languages.map((e,s)=>{let a=typeof e=="string"?e:e.key;return t("div",{onClick:this.handleLanguageSwitching(a,typeof e=="string"?e:e.value),onKeyDown:n=>{(n.key==="Enter"||n.key===" ")&&this.handleLanguageSwitching(a,typeof e=="string"?e:e.value)()}},t("span",{part:"label",tabindex:"0",class:{"language-switcher__label":!0,"language-switcher__label--selected":this.selected===a}},a),s<this.languages.length-1&&t("span",{part:"separator",class:"language-switcher__separator"},"|"))}))}static get watchers(){return{languages:["handleChangesLanguages"]}}};return i.style=l,i})();export{u as six_language_switcher};
