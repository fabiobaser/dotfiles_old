"use strict";var x=Object.create;var s=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var M=(o,t)=>()=>(t||o((t={exports:{}}).exports,t),t.exports),E=(o,t)=>{for(var e in t)s(o,e,{get:t[e],enumerable:!0})},a=(o,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of h(t))!F.call(o,r)&&r!==e&&s(o,r,{get:()=>t[r],enumerable:!(n=D(t,r))||n.enumerable});return o};var L=(o,t,e)=>(e=o!=null?x(A(o)):{},a(t||!o||!o.__esModule?s(e,"default",{value:o,enumerable:!0}):e,o)),S=o=>a(s({},"__esModule",{value:!0}),o);var m=M((N,c)=>{"use strict";var $=require("os"),f=$.homedir();c.exports=o=>{if(typeof o!="string")throw new TypeError(`Expected a string, got ${typeof o}`);return f?o.replace(/^~(?=$|\/|\\)/,f):o}});var H={};E(H,{default:()=>y});module.exports=S(H);var d=require("@raycast/api");var p=require("@raycast/api"),i=require("fs"),u=require("path"),w=L(m()),j=(0,p.getPreferenceValues)(),l=(0,w.default)(j.downloadsFolder??"~/Downloads");function q(){return(0,i.readdirSync)(l).filter(t=>!t.startsWith(".")).map(t=>{let e=(0,u.join)(l,t),n=(0,i.statSync)(e).mtime;return{file:t,path:e,lastModifiedAt:n}}).sort((t,e)=>e.lastModifiedAt.getTime()-t.lastModifiedAt.getTime())}function g(){let o=q();if(!(o.length<1))return o[0]}async function y(){let o=g();if(!o){await(0,d.showHUD)("No downloads found");return}await(0,d.showInFinder)(o.path)}0&&(module.exports={});
