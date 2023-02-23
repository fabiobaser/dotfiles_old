"use strict";var Ee=Object.create;var h=Object.defineProperty;var Le=Object.getOwnPropertyDescriptor;var Me=Object.getOwnPropertyNames;var Ue=Object.getPrototypeOf,xe=Object.prototype.hasOwnProperty;var u=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports),We=(e,r)=>{for(var t in r)h(e,t,{get:r[t],enumerable:!0})},X=(e,r,t,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of Me(r))!xe.call(e,a)&&a!==t&&h(e,a,{get:()=>r[a],enumerable:!(n=Le(r,a))||n.enumerable});return e};var ke=(e,r,t)=>(t=e!=null?Ee(Ue(e)):{},X(r||!e||!e.__esModule?h(t,"default",{value:e,enumerable:!0}):t,e)),De=e=>X(h({},"__esModule",{value:!0}),e);var k=u(f=>{"use strict";Object.defineProperty(f,"__esModule",{value:!0});f.FORMAT_PLAIN=f.FORMAT_HTML=f.FORMATS=void 0;var V="html";f.FORMAT_HTML=V;var J="plain";f.FORMAT_PLAIN=J;var qe=[V,J];f.FORMATS=qe});var te=u(i=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0});i.UNIT_WORDS=i.UNIT_WORD=i.UNIT_SENTENCES=i.UNIT_SENTENCE=i.UNIT_PARAGRAPHS=i.UNIT_PARAGRAPH=i.UNITS=void 0;var K="words";i.UNIT_WORDS=K;var Q="word";i.UNIT_WORD=Q;var Y="sentences";i.UNIT_SENTENCES=Y;var Z="sentence";i.UNIT_SENTENCE=Z;var ee="paragraphs";i.UNIT_PARAGRAPHS=ee;var re="paragraph";i.UNIT_PARAGRAPH=re;var Fe=[K,Q,Y,Z,ee,re];i.UNITS=Fe});var D=u(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.WORDS=void 0;var Ce=["ad","adipisicing","aliqua","aliquip","amet","anim","aute","cillum","commodo","consectetur","consequat","culpa","cupidatat","deserunt","do","dolor","dolore","duis","ea","eiusmod","elit","enim","esse","est","et","eu","ex","excepteur","exercitation","fugiat","id","in","incididunt","ipsum","irure","labore","laboris","laborum","Lorem","magna","minim","mollit","nisi","non","nostrud","nulla","occaecat","officia","pariatur","proident","qui","quis","reprehenderit","sint","sit","sunt","tempor","ullamco","ut","velit","veniam","voluptate"];P.WORDS=Ce});var ne=u(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.LINE_ENDINGS=void 0;var Ge={POSIX:`
`,WIN32:`\r
`};N.LINE_ENDINGS=Ge});var ae=u(R=>{"use strict";Object.defineProperty(R,"__esModule",{value:!0});R.default=void 0;var $e=function(r){var t=r.trim();return t.charAt(0).toUpperCase()+t.slice(1)},He=$e;R.default=He});var ie=u((S,q)=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});S.default=void 0;var je=function(){return typeof q<"u"&&!!q.exports},Be=je;S.default=Be});var ue=u(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});O.default=void 0;var ze=function(){var r=!1;try{r=navigator.product==="ReactNative"}catch{r=!1}return r},Xe=ze;O.default=Xe});var oe=u(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.SUPPORTED_PLATFORMS=void 0;var Ve={DARWIN:"darwin",LINUX:"linux",WIN32:"win32"};I.SUPPORTED_PLATFORMS=Ve});var se=u(w=>{"use strict";Object.defineProperty(w,"__esModule",{value:!0});w.default=void 0;var Je=oe(),Ke=function(){var r=!1;try{r=process.platform===Je.SUPPORTED_PLATFORMS.WIN32}catch{r=!1}return r},Qe=Ke;w.default=Qe});var F=u(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.default=void 0;var Ye=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return Array.apply(null,Array(r)).map(function(t,n){return n})},Ze=Ye;A.default=Ze});var de=u(y=>{"use strict";Object.defineProperty(y,"__esModule",{value:!0});y.default=void 0;var er=rr(F());function rr(e){return e&&e.__esModule?e:{default:e}}var tr=function(r,t){var n=(0,er.default)(r);return n.map(function(){return t()})},nr=tr;y.default=nr});var C=u(m=>{"use strict";Object.defineProperty(m,"__esModule",{value:!0});Object.defineProperty(m,"capitalize",{enumerable:!0,get:function(){return ar.default}});Object.defineProperty(m,"isNode",{enumerable:!0,get:function(){return ir.default}});Object.defineProperty(m,"isReactNative",{enumerable:!0,get:function(){return ur.default}});Object.defineProperty(m,"isWindows",{enumerable:!0,get:function(){return or.default}});Object.defineProperty(m,"makeArrayOfLength",{enumerable:!0,get:function(){return sr.default}});Object.defineProperty(m,"makeArrayOfStrings",{enumerable:!0,get:function(){return dr.default}});var ar=p(ae()),ir=p(ie()),ur=p(ue()),or=p(se()),sr=p(F()),dr=p(de());function p(e){return e&&e.__esModule?e:{default:e}}});var me=u(b=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});b.default=void 0;var fr=D(),G=C();function mr(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function fe(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function cr(e,r,t){return r&&fe(e.prototype,r),t&&fe(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function T(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var lr=function(){function e(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=r.sentencesPerParagraph,n=t===void 0?{max:7,min:3}:t,a=r.wordsPerSentence,o=a===void 0?{max:15,min:5}:a,d=r.random,g=r.seed,s=r.words,v=s===void 0?fr.WORDS:s;if(mr(this,e),T(this,"sentencesPerParagraph",void 0),T(this,"wordsPerSentence",void 0),T(this,"random",void 0),T(this,"words",void 0),n.min>n.max)throw new Error("Minimum number of sentences per paragraph (".concat(n.min,") cannot exceed maximum (").concat(n.max,")."));if(o.min>o.max)throw new Error("Minimum number of words per sentence (".concat(o.min,") cannot exceed maximum (").concat(o.max,")."));this.sentencesPerParagraph=n,this.words=v,this.wordsPerSentence=o,this.random=d||Math.random}return cr(e,[{key:"generateRandomInteger",value:function(t,n){return Math.floor(this.random()*(n-t+1)+t)}},{key:"generateRandomWords",value:function(t){var n=this,a=this.wordsPerSentence,o=a.min,d=a.max,g=t||this.generateRandomInteger(o,d);return(0,G.makeArrayOfLength)(g).reduce(function(s,v){return"".concat(n.pluckRandomWord()," ").concat(s)},"").trim()}},{key:"generateRandomSentence",value:function(t){return"".concat((0,G.capitalize)(this.generateRandomWords(t)),".")}},{key:"generateRandomParagraph",value:function(t){var n=this,a=this.sentencesPerParagraph,o=a.min,d=a.max,g=t||this.generateRandomInteger(o,d);return(0,G.makeArrayOfLength)(g).reduce(function(s,v){return"".concat(n.generateRandomSentence()," ").concat(s)},"").trim()}},{key:"pluckRandomWord",value:function(){var t=0,n=this.words.length-1,a=this.generateRandomInteger(t,n);return this.words[a]}}]),e}(),gr=lr;b.default=gr});var ge=u(M=>{"use strict";Object.defineProperty(M,"__esModule",{value:!0});M.default=void 0;var E=k(),ce=ne(),pr=vr(me()),L=C();function vr(e){return e&&e.__esModule?e:{default:e}}function _r(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function le(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function hr(e,r,t){return r&&le(e.prototype,r),t&&le(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function Pr(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var Nr=function(){function e(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:E.FORMAT_PLAIN,n=arguments.length>2?arguments[2]:void 0;if(_r(this,e),this.format=t,this.suffix=n,Pr(this,"generator",void 0),E.FORMATS.indexOf(t.toLowerCase())===-1)throw new Error("".concat(t," is an invalid format. Please use ").concat(E.FORMATS.join(" or "),"."));this.generator=new pr.default(r)}return hr(e,[{key:"getLineEnding",value:function(){return this.suffix?this.suffix:!(0,L.isReactNative)()&&(0,L.isNode)()&&(0,L.isWindows)()?ce.LINE_ENDINGS.WIN32:ce.LINE_ENDINGS.POSIX}},{key:"formatString",value:function(t){return this.format===E.FORMAT_HTML?"<p>".concat(t,"</p>"):t}},{key:"formatStrings",value:function(t){var n=this;return t.map(function(a){return n.formatString(a)})}},{key:"generateWords",value:function(t){return this.formatString(this.generator.generateRandomWords(t))}},{key:"generateSentences",value:function(t){return this.formatString(this.generator.generateRandomParagraph(t))}},{key:"generateParagraphs",value:function(t){var n=this.generator.generateRandomParagraph.bind(this.generator);return this.formatStrings((0,L.makeArrayOfStrings)(t,n)).join(this.getLineEnding())}}]),e}(),Rr=Nr;M.default=Rr});var ve=u(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});Object.defineProperty(_,"LoremIpsum",{enumerable:!0,get:function(){return pe.default}});_.loremIpsum=void 0;var Sr=k(),c=te(),Or=D(),pe=Ir(ge());function Ir(e){return e&&e.__esModule?e:{default:e}}var wr=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=r.count,n=t===void 0?1:t,a=r.format,o=a===void 0?Sr.FORMAT_PLAIN:a,d=r.paragraphLowerBound,g=d===void 0?3:d,s=r.paragraphUpperBound,v=s===void 0?7:s,Oe=r.random,$=r.sentenceLowerBound,Ie=$===void 0?5:$,H=r.sentenceUpperBound,we=H===void 0?15:H,j=r.units,Ae=j===void 0?c.UNIT_SENTENCES:j,B=r.words,ye=B===void 0?Or.WORDS:B,z=r.suffix,Te=z===void 0?"":z,be={random:Oe,sentencesPerParagraph:{max:v,min:g},words:ye,wordsPerSentence:{max:we,min:Ie}},W=new pe.default(be,o,Te);switch(Ae){case c.UNIT_PARAGRAPHS:case c.UNIT_PARAGRAPH:return W.generateParagraphs(n);case c.UNIT_SENTENCES:case c.UNIT_SENTENCE:return W.generateSentences(n);case c.UNIT_WORDS:case c.UNIT_WORD:return W.generateWords(n);default:return""}};_.loremIpsum=wr});var Tr={};We(Tr,{default:()=>Se});module.exports=De(Tr);var x=require("@raycast/api");var l=require("@raycast/api"),he=ke(ve()),_e=1e3,U={sentencesPerParagraph:{max:8,min:4},wordsPerSentence:{max:16,min:4}},Ar=new he.LoremIpsum(U),Pe=e=>Array.from(Array(e)).map(()=>Ar.generateSentences(Math.floor(Math.random()*(U.sentencesPerParagraph.max-U.sentencesPerParagraph.min+1))+U.sentencesPerParagraph.min)).join(`\r
\r
`);var yr=()=>{(0,l.showHUD)("Copied to clipboard")},Ne=async e=>{e||(e="1");try{let r=parseInt(e,10);return isNaN(r)||r>_e?{error:{message:`Please enter a valid integer number, no more than ${_e}`},safeLoremIpsumNumber:null}:{error:null,safeLoremIpsumNumber:r}}catch{return{error:{message:"Something went wrong"},safeLoremIpsumNumber:null}}},Re=async(e,r)=>{switch(e){case"clipboard":await l.Clipboard.copy(r),await yr();break;case"paste":await l.Clipboard.paste(r);break}await(0,l.closeMainWindow)()};async function Se(e){let{action:r="clipboard"}=(0,x.getPreferenceValues)(),t=e?.arguments.numberOfLoremIpsumsToGenerate,{error:n,safeLoremIpsumNumber:a}=await Ne(t);if(n)await(0,x.showHUD)(`\u274C ${n.message}`);else{let o=Pe(a);await Re(r,o)}}0&&(module.exports={});
