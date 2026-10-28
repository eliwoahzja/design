export const SIZES = { mobile:[390,844], tablet:[768,1024], desktop:[1280,800] };
export const ELEMENTS = {
  Structure: [['div','Box'],['section','Section'],['header','Header'],['nav','Navigation'],['main','Main'],['footer','Footer'],['article','Article'],['aside','Aside']],
  Typography: [['h1','Heading 1'],['h2','Heading 2'],['h3','Heading 3'],['p','Paragraph'],['span','Text'],['strong','Bold'],['em','Italic'],['small','Small'],['blockquote','Quote'],['code','Code'],['pre','Preformatted']],
  Interactive: [['button','Button'],['a','Link'],['input','Input'],['textarea','Text area'],['form','Form'],['label','Label'],['select','Select'],['option','Option']],
  Content: [['img','Image'],['hr','Divider'],['ul','List'],['ol','Ordered list'],['li','List item'],['details','Details'],['summary','Summary'],['figure','Figure'],['figcaption','Caption']],
  Advanced: [['table','Table'],['thead','Table head'],['tbody','Table body'],['tr','Table row'],['th','Header cell'],['td','Cell'],['video','Video'],['audio','Audio'],['progress','Progress']]
};
export const CONTAINERS = new Set(['body','div','section','header','nav','main','footer','article','aside','form','ul','ol','details','figure','select','table','thead','tbody','tr']);
export const VOID = new Set(['img','input','hr']);
export const LEAF = new Set(['h1','h2','h3','p','span','strong','em','small','blockquote','code','pre','button','a','label','li','option','summary','figcaption','th','td']);
export const FONT_OPTIONS = ['Inter','DM Sans','Manrope','Space Grotesk','Playfair Display','Georgia','Arial','Verdana','Times New Roman','Courier New','monospace'];
export const ANIMATIONS = ['none','fade-up','fade-in','slide-left','slide-right','scale-in','float','pulse','spin','bounce'];
export const KEYS = {
  'fade-up':'from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:translateY(0)}',
  'fade-in':'from{opacity:0}to{opacity:1}',
  'slide-left':'from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}',
  'slide-right':'from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}',
  'scale-in':'from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}',
  float:'0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}',
  pulse:'0%,100%{transform:scale(1)}50%{transform:scale(1.04)}',
  spin:'from{transform:rotate(0)}to{transform:rotate(360deg)}',
  bounce:'0%,100%{transform:translateY(0)}35%{transform:translateY(-20px)}65%{transform:translateY(-8px)}'
};
let counter = 0;
export const uid = () => `n${Date.now().toString(36)}${(++counter).toString(36)}`;
export const toKebab = value => value.replace(/[A-Z]/g, x=>'-'+x.toLowerCase());
export const toCamel = value => value.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
export const esc = value => String(value??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
export const defaultText = {h1:'A better way to build.',h2:'Section heading',h3:'Subheading',p:'Double-click to edit this paragraph.',span:'Text content',strong:'Bold text',em:'Emphasized text',small:'Fine print',blockquote:'A thoughtful quotation.',button:'Click me',a:'Learn more',label:'Label',li:'List item',option:'Option',summary:'More details',figcaption:'Image caption',th:'Header',td:'Cell',code:'const design = true;',pre:'Write code here'};
export function node(tag,props={}) {
  const styles = {...(CONTAINERS.has(tag)&&!['table','tbody','thead','tr','ul','ol','select'].includes(tag)?{minHeight:'60px',padding:'14px',width:'100%'}:{}),...(tag==='button'?{padding:'11px 18px',backgroundColor:'#262a26',color:'#fff',border:'0',borderRadius:'6px',cursor:'pointer',fontSize:'14px'}:{}),...(tag==='img'?{width:'100%',height:'190px',objectFit:'cover'}:{}),...(tag==='input'||tag==='textarea'?{padding:'11px',border:'1px solid #c8cec8',borderRadius:'6px',width:'100%'}:{}),...(tag==='h1'?{fontSize:'40px',margin:'0',lineHeight:'1.1'}:{}),...(tag==='h2'?{fontSize:'27px',margin:'0'}:{}),...(tag==='p'?{margin:'0',lineHeight:'1.65'}:{}),...(props.styles||{})};
  const attrs = {...(tag==='a'?{href:'#'}:{}),...(tag==='input'?{placeholder:'Type here',type:'text'}:{}),...(tag==='img'?{alt:'Image',src:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80'}:{}),...(tag==='button'?{type:'button'}:{}),...(tag==='video'||tag==='audio'?{controls:'controls'}:{}),...(tag==='progress'?{value:'50',max:'100'}:{}),...(props.attrs||{})};
  return {key:uid(),tag,attrs,text:props.text??defaultText[tag]??'',styles,responsive:props.responsive||{},children:props.children||[],motion:props.motion||{preset:'none',trigger:'load',duration:700,delay:0},action:props.action||{type:'none',value:''}};
}
export function createBlank(){return {version:3,name:'Untitled page',roots:[],nodes:{},bodyStyles:{margin:'0',padding:'0',backgroundColor:'#ffffff',color:'#292b28',fontFamily:'Inter, sans-serif',minHeight:'100vh'},bodyResponsive:{},extraCSS:'',customJS:''};}
export function createStarter(){
  const doc=createBlank();doc.name='Atelier — Portfolio';doc.bodyStyles={...doc.bodyStyles,backgroundColor:'#faf9f5',color:'#30372f',fontFamily:'DM Sans, sans-serif'};
  const put=(tag,p={})=>{const v=node(tag,p);doc.nodes[v.key]=v;return v};
  const mark=put('span',{text:'atelier.',styles:{fontSize:'24px',fontWeight:'700',letterSpacing:'-1.4px',color:'#323b32'}});
  const nav1=put('a',{text:'Work',attrs:{href:'#work'},styles:{color:'#343a32',textDecoration:'none',fontSize:'13px'}});
  const nav2=put('a',{text:'About',attrs:{href:'#about'},styles:{color:'#343a32',textDecoration:'none',fontSize:'13px'}});
  const nav=put('nav',{styles:{display:'flex',gap:'22px',alignItems:'center',minHeight:'auto',padding:'0',width:'auto'},children:[nav1.key,nav2.key]});
  const pill=put('a',{text:'Get in touch ↗',attrs:{href:'mailto:hello@example.com'},styles:{color:'#fff',backgroundColor:'#374b3a',padding:'11px 15px',borderRadius:'99px',textDecoration:'none',fontWeight:'600',fontSize:'12px'}});
  const head=put('header',{styles:{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px',padding:'22px 38px',minHeight:'88px',backgroundColor:'#faf9f5'},responsive:{mobile:{padding:'20px 22px'}},children:[mark.key,nav.key,pill.key]});
  const kicker=put('span',{text:'INDEPENDENT DESIGN STUDIO · EST. 2026',styles:{fontSize:'10px',letterSpacing:'2px',color:'#ad715d',fontWeight:'700'}});
  const title=put('h1',{text:'Ideas deserve\nroom to breathe.',styles:{whiteSpace:'pre-line',fontFamily:'Playfair Display, serif',fontSize:'72px',fontWeight:'500',lineHeight:'1.06',letterSpacing:'-2px',margin:'0'},responsive:{tablet:{fontSize:'53px'},mobile:{fontSize:'44px'}}});
  const sub=put('p',{text:'Thoughtful identities and digital experiences for people building a more considered world.',styles:{fontSize:'15px',lineHeight:'1.8',color:'#788174',maxWidth:'460px'}});
  const cta=put('a',{text:'Explore our work ↗',attrs:{href:'#work'},styles:{display:'inline-block',padding:'14px 20px',borderRadius:'99px',backgroundColor:'#cd7355',color:'#fff',fontSize:'13px',fontWeight:'700',textDecoration:'none',marginTop:'5px'}});
  const info=put('div',{styles:{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',gap:'20px',padding:'0',minHeight:'auto'},children:[kicker.key,title.key,sub.key,cta.key]});
  const art1=put('span',{text:'STUDY 001 / 2026',styles:{letterSpacing:'1.8px',fontSize:'10px',fontWeight:'700'}});
  const art2=put('h2',{text:'Form follows\nfeeling.',styles:{fontSize:'48px',fontWeight:'500',lineHeight:'1.1',whiteSpace:'pre-line',fontFamily:'Playfair Display, serif'},responsive:{mobile:{fontSize:'40px'}}});
  const art3=put('span',{text:'ART DIRECTION / IDENTITY / WEB',styles:{letterSpacing:'1.1px',fontSize:'9px',fontWeight:'700'}});
  const art=put('div',{styles:{display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'30px',width:'100%',minHeight:'405px',borderRadius:'4px',background:'radial-gradient(circle at 77% 36%, #f8e7c9 0 49px, transparent 50px), radial-gradient(circle at 48% 68%, #f1a78b 0 95px, transparent 96px), linear-gradient(155deg, #e5e3d3, #dfc4b0)',boxShadow:'12px 12px 0 #e5e8de'},responsive:{mobile:{minHeight:'330px',padding:'22px'}},children:[art1.key,art2.key,art3.key]});
  const hero=put('main',{attrs:{id:'about'},styles:{display:'grid',gridTemplateColumns:'1.15fr .85fr',alignItems:'center',gap:'55px',padding:'66px 38px 86px',minHeight:'630px',backgroundColor:'#faf9f5'},responsive:{tablet:{gap:'25px'},mobile:{gridTemplateColumns:'1fr',gap:'40px',padding:'55px 22px 70px'}},children:[info.key,art.key]});
  const l1=put('span',{text:'SELECTED WORK / 2024–2026',styles:{fontSize:'11px',letterSpacing:'1px',fontWeight:'700'}});
  const l2=put('span',{text:'DESIGN. TYPE. MOTION.',styles:{fontSize:'11px',letterSpacing:'1px',fontWeight:'700'}});
  const l3=put('span',{text:'SCROLL TO EXPLORE ↓',styles:{fontSize:'11px',letterSpacing:'1px',color:'#ae7159',fontWeight:'700'}});
  const strip=put('section',{attrs:{id:'work'},styles:{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'18px',padding:'28px 38px',backgroundColor:'#fff',borderTop:'1px solid #e5e8de'},responsive:{mobile:{flexDirection:'column',alignItems:'flex-start',padding:'24px 22px'}},children:[l1.key,l2.key,l3.key]});
  const footTxt=put('p',{text:'Made with intention. © 2026 Atelier Studio.',styles:{color:'#69736b',fontSize:'13px'}});
  const foot=put('footer',{styles:{padding:'36px 38px',backgroundColor:'#f5f5ef'},responsive:{mobile:{padding:'30px 22px'}},children:[footTxt.key]});
  doc.roots=[head.key,hero.key,strip.key,foot.key]; return doc;
}
export function clone(doc){return JSON.parse(JSON.stringify(doc));}
export function parentOf(doc,key){for(const n of Object.values(doc.nodes))if(n.children.includes(key))return n.key;return null;}
export function isDescendant(doc,key,possibleChild){if(key===possibleChild)return true;const n=doc.nodes[key];return !!n?.children.some(child=>isDescendant(doc,child,possibleChild));}
export function addItem(doc,tag,target='body',placement='inside'){
  const next=clone(doc);const fresh=node(tag);next.nodes[fresh.key]=fresh;
  if(['ul','ol'].includes(tag)){const li=node('li');next.nodes[li.key]=li;fresh.children.push(li.key)}
  if(tag==='details'){for(const t of ['summary','p']){const el=node(t);next.nodes[el.key]=el;fresh.children.push(el.key)}}
  if(tag==='select'){const el=node('option');next.nodes[el.key]=el;fresh.children.push(el.key)}
  if(tag==='table'){const tbody=node('tbody'),tr=node('tr'),th=node('th'),td=node('td');next.nodes[tbody.key]=tbody;next.nodes[tr.key]=tr;next.nodes[th.key]=th;next.nodes[td.key]=td;tr.children=[th.key,td.key];tbody.children=[tr.key];fresh.children=[tbody.key]}
  insertExisting(next,fresh.key,target,placement);
  return {doc:next,key:fresh.key};
}
export function insertExisting(doc,key,target='body',placement='inside'){
  if(key===target||isDescendant(doc,key,target))return false;
  const oldParent=parentOf(doc,key),oldList=oldParent?doc.nodes[oldParent].children:doc.roots;
  const oldIndex=oldList.indexOf(key);if(oldIndex>=0)oldList.splice(oldIndex,1);
  let parent=target,where='inside';
  if(target!=='body' && (placement==='before'||placement==='after'||!CONTAINERS.has(doc.nodes[target]?.tag))){parent=parentOf(doc,target)||'body';where=placement==='before'?'before':'after'}
  const list=parent==='body'?doc.roots:doc.nodes[parent]?.children;
  if(!list){oldList.push(key);return false}
  if(where==='inside')list.push(key);else{let index=list.indexOf(target);list.splice((index<0?list.length:index)+(where==='after'?1:0),0,key)}
  return true;
}
export function removeItem(doc,key){if(key==='body'||!doc.nodes[key])return doc;const next=clone(doc);const p=parentOf(next,key);const list=p?next.nodes[p].children:next.roots;list.splice(list.indexOf(key),1);const remove=k=>{for(const id of next.nodes[k].children)remove(id);delete next.nodes[k]};remove(key);return next;}
// Editor-only empty slots preserve the visual footprint of deleted elements.
// They stay in the editor document and history, but never appear in exported code.
export const isEditorSlot = n => n?.tag === 'studio-slot';
export function replaceWithSlot(doc,key,dimensions={}){
  const original=doc.nodes[key];
  if(!original || isEditorSlot(original))return doc;
  const next=clone(doc);
  const old=next.nodes[key];
  const removeDescendants=id=>{for(const child of next.nodes[id]?.children||[])removeDescendants(child);if(id!==key)delete next.nodes[id]};
  removeDescendants(key);
  const width=Math.max(30,Math.round(Number(dimensions.width)||100));
  const height=Math.max(28,Math.round(Number(dimensions.height)||44));
  next.nodes[key]={key,tag:'studio-slot',originTag:old.tag,originText:old.text||'',attrs:{},text:'',children:[],styles:{width:`${width}px`,height:`${height}px`,minHeight:`${height}px`,flexShrink:'0',...(old.styles?.gridArea?{gridArea:old.styles.gridArea}:{})},responsive:{},motion:{preset:'none',trigger:'load'},action:{type:'none'}};
  return next;
}
// Replace the slot at exactly its original sibling index with a real element.
export function fillEditorSlot(doc,slotKey,tag){
  if(!isEditorSlot(doc.nodes[slotKey]))return null;
  const created=addItem(doc,tag,'body');
  if(!insertExisting(created.doc,created.key,slotKey,'before'))return null;
  return {doc:removeItem(created.doc,slotKey),key:created.key};
}
export function wrapItem(doc,key){if(key==='body'||!doc.nodes[key])return null;const next=clone(doc);const p=parentOf(next,key);const siblings=p?next.nodes[p].children:next.roots;const i=siblings.indexOf(key);const box=node('div',{attrs:{class:'box'},styles:{display:'flex',flexDirection:'column',gap:'12px',padding:'18px',minHeight:'100px',border:'1px dashed #b8bbb6',borderRadius:'8px'}});box.children=[key];next.nodes[box.key]=box;siblings.splice(i,1,box.key);return {doc:next,key:box.key}}
export function duplicateItem(doc,key){if(!doc.nodes[key])return null;const next=clone(doc);const cp=k=>{const original=next.nodes[k],fresh={...clone(original),key:uid(),attrs:{...original.attrs,id:''},children:[]};next.nodes[fresh.key]=fresh;fresh.children=original.children.map(cp);return fresh.key};const id=cp(key);insertExisting(next,id,key,'after');return {doc:next,key:id};}
export function cssEffective(n,viewport){return {...n.styles,...(viewport==='desktop'?{}:n.responsive?.tablet||{}),...(viewport==='mobile'?n.responsive?.mobile||{}:{})};}
export function cssText(styles,indent='  '){return Object.entries(styles||{}).filter(([,v])=>v!==''&&v!==null&&v!==undefined).map(([k,v])=>`${indent}${toKebab(k)}: ${v};`).join('\n');}
export function generatedHTML(doc){
  const walk=(key,depth=1)=>{const n=doc.nodes[key];if(!n||isEditorSlot(n))return '';const tab='  '.repeat(depth);const attrs={...n.attrs};attrs.class=[attrs.class||'',`element-${n.key}`].filter(Boolean).join(' ');if(n.action?.type!=='none'&&n.action?.type)attrs['data-action']=n.key;
    const attrText=Object.entries(attrs).filter(([,v])=>v!==''&&v!=null).map(([k,v])=>` ${k}="${esc(v)}"`).join('');
    if(VOID.has(n.tag))return `${tab}<${n.tag}${attrText}>`;
    const text=esc(n.text);if(!n.children.some(k=>doc.nodes[k]&&!isEditorSlot(doc.nodes[k])))return `${tab}<${n.tag}${attrText}>${text}</${n.tag}>`;
    return `${tab}<${n.tag}${attrText}>\n${n.text?tab+'  '+text+'\n':''}${n.children.map(k=>walk(k,depth+1)).filter(Boolean).join('\n')}\n${tab}</${n.tag}>`;
  };return doc.roots.map(k=>walk(k)).join('\n');
}
export function generatedCSS(doc){
  const base=`/* Generated by element. — Design visually. Own the code. */\n* { box-sizing: border-box; }\nhtml { scroll-behavior: smooth; }\n.is-hidden { display: none !important; }\nbody {\n${cssText(doc.bodyStyles)}\n}`;
  const rules=Object.values(doc.nodes).filter(n=>!isEditorSlot(n)).map(n=>`.element-${n.key} {\n${cssText(n.styles)}\n}`).join('\n\n');
  const bp=(scope,query)=>{const pieces=[];const body=doc.bodyResponsive?.[scope];if(body&&Object.keys(body).length)pieces.push(`  body {\n${cssText(body,'    ')}\n  }`);for(const n of Object.values(doc.nodes).filter(n=>!isEditorSlot(n))){const v=n.responsive?.[scope];if(v&&Object.keys(v).length)pieces.push(`  .element-${n.key} {\n${cssText(v,'    ')}\n  }`)}return pieces.length?`\n@media ${query} {\n${pieces.join('\n')}\n}`:''};
  const animated=Object.values(doc.nodes).filter(n=>!isEditorSlot(n)&&n.motion?.preset&&n.motion.preset!=='none');const frames=[...new Set(animated.map(n=>n.motion.preset))].map(name=>`@keyframes element-${name} { ${KEYS[name]} }`).join('\n');
  const motion=animated.map(n=>`.element-${n.key}.element-motion { animation: element-${n.motion.preset} ${Number(n.motion.duration)||700}ms ${n.motion.easing||'ease-out'} ${Number(n.motion.delay)||0}ms ${n.motion.iterations||1} both; }`).join('\n');
  const out=[base,rules,bp('tablet','(max-width: 1023px)'),bp('mobile','(max-width: 767px)'),frames,motion,doc.extraCSS].filter(Boolean).join('\n\n');return out+'\n@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; } }\n';
}
export function generatedJS(doc){
  const actions=Object.values(doc.nodes).filter(n=>!isEditorSlot(n)&&n.action?.type&&n.action.type!=='none');
  let result=`// Generated interactions\ndocument.addEventListener('DOMContentLoaded', () => {\n`;
  for(const n of actions){const q=`document.querySelector(${JSON.stringify(`.element-${n.key}`)})`;const val=JSON.stringify(n.action.value||'').replace(/</g,'\\u003c');let expr='';const target=`document.querySelector(${val})`;switch(n.action.type){case 'alert':expr=`alert(${val});`;break;case 'scroll':expr=`${target}?.scrollIntoView({behavior:'smooth'});`;break;case 'toggle':expr=`${target}?.classList.toggle('is-hidden');`;break;case 'hide':expr=`if (${target}) ${target}.style.display = 'none';`;break;case 'show':expr=`if (${target}) ${target}.style.display = '';`;break;case 'set-text':expr=`if (${target}) ${target}.textContent = ${JSON.stringify(n.action.payload||'')};`;break;case 'open-url':expr=`if (/^https?:\\/\\//.test(${val})) window.open(${val}, '_blank', 'noopener,noreferrer');`;break;default:break}if(expr)result+=`  ${q}?.addEventListener('click', (event) => { event.preventDefault(); ${expr} });\n`;}
  const motionNodes=Object.values(doc.nodes).filter(n=>!isEditorSlot(n)&&n.motion?.preset&&n.motion.preset!=='none');
  for(const n of motionNodes){const q=`document.querySelector(${JSON.stringify(`.element-${n.key}`)})`;const trigger=n.motion.trigger;if(trigger==='scroll')result+=`  { const element=${q}; if(element){ const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){element.classList.add('element-motion');observer.disconnect();}},{threshold:.18});observer.observe(element);} }\n`;else if(trigger==='click')result+=`  ${q}?.addEventListener('click', e=>{e.currentTarget.classList.remove('element-motion');void e.currentTarget.offsetWidth;e.currentTarget.classList.add('element-motion');});\n`;else if(trigger==='hover')result+=`  ${q}?.addEventListener('mouseenter', e=>{e.currentTarget.classList.remove('element-motion');void e.currentTarget.offsetWidth;e.currentTarget.classList.add('element-motion');});\n`;else result+=`  ${q}?.classList.add('element-motion');\n`;}
  result+=`});\n// End generated interactions\n`;
  return result+`\n/* Custom JavaScript — edit this section in the Code panel */\n${doc.customJS||''}`;
}
export function fullHTML(doc){const html=generatedHTML(doc);const css=generatedCSS(doc).replace(/<\/style/gi,'<\\/style');const js=generatedJS(doc).replace(/<\/script/gi,'<\\/script');return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>${esc(doc.name)}</title>\n  <style>\n${css}  </style>\n</head>\n<body>\n${html}\n  <script>\n${js}\n  </script>\n</body>\n</html>`;}
export function importHTML(doc,source){if(typeof DOMParser==='undefined')throw new Error('HTML parsing requires a browser');const dom=new DOMParser().parseFromString(source,'text/html');const next=clone(doc);next.roots=[];const previous=next.nodes;next.nodes={};const parse=el=>{if(el.nodeType!==1)return null;const tag=el.tagName.toLowerCase();const supported=Object.values(ELEMENTS).flat().some(([t])=>t===tag);if(!supported)throw new Error(`Unsupported <${tag}> element; no changes applied.`);const classes=(el.getAttribute('class')||'').split(/\s+/);let key=classes.map(c=>c.startsWith('element-')?c.slice(8):null).find(Boolean)||uid();if(next.nodes[key])key=uid();const old=previous[key];const attrs={};for(const attr of el.attributes){if(attr.name==='class')attrs.class=classes.filter(c=>c!==`element-${key}`&&!c.startsWith('element-')).join(' ');else if(attr.name!=='data-action'&&!attr.name.startsWith('on'))attrs[attr.name]=attr.value}const children=[];for(const child of el.children){const id=parse(child);if(id)children.push(id)}const n={...node(tag),...old,key,tag,attrs,text:VOID.has(tag)?'':Array.from(el.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim(),children};next.nodes[key]=n;return key};for(const el of dom.body.children){if(el.tagName.toLowerCase()==='script')continue;next.roots.push(parse(el))}return next;}
export function importCSS(doc,source){
  let sheet;try{sheet=new CSSStyleSheet();sheet.replaceSync(source)}catch(e){throw new Error(`Invalid CSS: ${e.message}`)}
  const next=clone(doc);next.extraCSS='';next.bodyStyles={};next.bodyResponsive={};
  for(const n of Object.values(next.nodes)){n.styles={};n.responsive={}}
  const unknown=[];
  const readRule=(rule,breakpoint=null)=>{
    if(rule.type===CSSRule.STYLE_RULE){const selector=rule.selectorText.trim();if(selector==='*'||selector==='html')return;
      let target=null,styleKey='styles';if(selector==='body'){target=next;styleKey=breakpoint?'bodyResponsive':'bodyStyles'}else if(/^\.element-[\w-]+$/.test(selector)){const k=selector.slice(9);target=next.nodes[k];styleKey=breakpoint?'responsive':'styles'}
      if(target){let dest;if(selector==='body'){dest=breakpoint?(target.bodyResponsive[breakpoint] ||= {}):target.bodyStyles}else{dest=breakpoint?(target.responsive[breakpoint] ||= {}):target.styles}for(const property of rule.style){dest[toCamel(property)]=rule.style.getPropertyValue(property).trim()+(rule.style.getPropertyPriority(property)?' !important':'')}return;}
    }
    if(!breakpoint)unknown.push(rule.cssText);
  };
  for(const rule of sheet.cssRules){if(rule.type===CSSRule.MEDIA_RULE){const cond=rule.conditionText;if(cond.includes('prefers-reduced-motion'))continue;const scope=cond.includes('767px')?'mobile':cond.includes('1023px')?'tablet':null;if(scope)for(const child of rule.cssRules)readRule(child,scope);else unknown.push(rule.cssText)}else if(rule.type===CSSRule.KEYFRAMES_RULE&&rule.name.startsWith('element-'))continue;else readRule(rule)}
  next.extraCSS=unknown.join('\n\n');return next;
}
export function generateBlock(doc,type){const next=clone(doc);const create=(tag,options={})=>{const el=node(tag,options);next.nodes[el.key]=el;return el};let block;
  if(type==='navigation'){
    const logo=create('strong',{text:'Your brand',styles:{fontSize:'20px'}});
    const a=create('a',{text:'About',attrs:{href:'#about'},styles:{fontSize:'14px',textDecoration:'none',color:'#343a35'}});
    const b=create('a',{text:'Contact',attrs:{href:'#contact'},styles:{fontSize:'14px',textDecoration:'none',color:'#343a35'}});
    block=create('header',{styles:{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'16px',padding:'24px',backgroundColor:'#f9faf7'},children:[logo.key,a.key,b.key]});
  }else if(type==='hero'){
    const eyebrow=create('span',{text:'NEW SECTION',styles:{fontSize:'11px',fontWeight:'700',letterSpacing:'2px',color:'#ab715f'}});
    const h=create('h1',{text:'Make something remarkable.',styles:{fontSize:'43px',lineHeight:'1.1',margin:'0'}});
    const p=create('p',{text:'Your next idea starts here. Select any element to make it your own.',styles:{color:'#6d746f',fontSize:'15px',maxWidth:'440px'}});
    const a=create('a',{text:'Discover more ↗',attrs:{href:'#'},styles:{padding:'13px 19px',color:'#fff',backgroundColor:'#35473b',borderRadius:'99px',textDecoration:'none',fontSize:'13px'}});
    block=create('section',{styles:{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',gap:'20px',padding:'60px 28px',backgroundColor:'#f3f2ea',minHeight:'360px'},children:[eyebrow.key,h.key,p.key,a.key]});
  }else{
    const h=create('h2',{text:'Beautifully simple.',styles:{fontSize:'24px',margin:'0'}});
    const p=create('p',{text:'A container keeps your content grouped and organized.',styles:{fontSize:'14px',color:'#777e76'}});
    block=create('div',{attrs:{class:'content-card'},styles:{display:'flex',flexDirection:'column',gap:'15px',padding:'26px',border:'1px solid #dadcd6',borderRadius:'14px',backgroundColor:'#fff'},children:[h.key,p.key]});
  }
  return {doc:next,key:block.key};
}
