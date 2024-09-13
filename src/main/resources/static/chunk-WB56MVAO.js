import{d as e,i as t}from"./chunk-5LMRLIWH.js";var o=".six-error-page__title{display:flex;justify-content:center;font-size:var(--six-font-size-xx-large);font-weight:bold;margin-bottom:var(--six-spacing-large)}.six-error-page__description>*{text-align:center}.six-error-page__icon-container{display:flex;justify-content:center}.six-error-page__icon::part(icon){background-color:var(--six-color-web-rock-300)}",s=o,c={403:{en:"Access Denied",de:"Kein Zugriff"},404:{en:"Not Found",de:"Seite nicht gefunden"},500:{en:"Ooops!",de:"Ups!"}},a={403:{en:["You don\u2019t have permission to access this page. ","Please contact an administrator or click the SIX logo on top left."],de:["Sie haben keine Zugriffsberechtigung auf diese Seite.","Bitte wenden Sie sich an einen Administrator oder klicken Sie auf das SIX-Logo oben links."]},404:{en:["We have not found the page you requested.","Please click the SIX logo on top left."],de:["Wir haben die angeforderte Seite nicht gefunden.","Bitte klicken Sie auf das SIX-Logo oben links."]},500:{en:["Sorry, we messed up! We try to fix this.","Please click the SIX logo on top left."],de:["Sorry, das war unser Fehler! Wir versuchen das zu beheben.","Bitte klicken Sie auf das SIX-Logo oben links."]}},u=(()=>{let i=class{constructor(r){t(this,r),this.errorCode=void 0,this.language="en",this.customTitle=void 0,this.customDescription=void 0,this.customIcon=void 0}getIconName(){if(this.customIcon!=null)return this.customIcon;if(this.errorCode!=null){if(this.errorCode===403)return"lock";if(this.errorCode===404)return"find-in-page";if(this.errorCode===500)return"sentiment-dissatisfied"}}getErrorTitle(){if(this.customTitle!=null)return this.customTitle;if(this.errorCode!=null)return c[this.errorCode][this.language]}getErrorDescription(){var r;return this.errorCode==null&&this.customDescription==null?void 0:((r=this.getDescriptions())!==null&&r!==void 0?r:[]).map(n=>e("div",null,n))}getDescriptions(){if(this.customDescription!==void 0)return this.customDescription;if(this.errorCode!=null)return a[this.errorCode][this.language]}render(){return e("div",{key:"78c3882cc5c70834df70c92ce3ac0d70730484b1",part:"container"},e("div",{key:"e2f4e4ab784458d4b5d899c270e30ca9850e21e0",class:"six-error-page__icon-container",part:"icon-container"},e("six-picto",{key:"b8c8192746d6aaec5b852102ae18c170fb87c183",size:"4xl",class:"six-error-page__icon",part:"icon"},this.getIconName())),e("div",{key:"2610494ebf7457c0a62484c9694638a79f332236",class:"six-error-page__title",part:"title"},this.getErrorTitle()),e("div",{key:"b125301cc8f3808ce2c38afa11407b7e681995b2",class:"six-error-page__description",part:"description"},this.getErrorDescription()))}};return i.style=s,i})();export{u as six_error_page};
