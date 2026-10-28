export const ACTION_EVENTS = ['click','dblclick','input','change','submit','focus','blur','mouseenter','mouseleave','keydown'];
export const ACTION_TYPES = ['none','alert','scroll','toggle','show','hide','set-text','copy-value','set-value','toggle-class','add-class','remove-class','set-style','increment','focus','reset-form','validate-form','open-url'];
export const hasAction = action => Boolean(action?.type && action.type !== 'none');
export const actionEvent = (action, tag='') => action?.event || (tag==='form'?'submit':'click');
export const actionTargetRequired = type => !['none','alert','open-url'].includes(type);
export const actionPayloadRequired = type => ['set-text','set-value','toggle-class','add-class','remove-class','set-style','increment'].includes(type);
export const eventForTag = tag => tag==='form'?'submit':['input','textarea','select'].includes(tag)?'input':'click';

// This exact runtime is shared by editor Preview and standalone exported JavaScript.
// All authored selectors stay scoped to the target page and are guarded against invalid CSS.
export function executeVisualAction(event, action, root = document) {
 if (!action || !action.type || action.type === 'none') return false;
 const type = action.type;
 const value = String(action.value || '').trim();
 const payload = String(action.payload ?? '');
 const source = event.currentTarget;
 let target = null;
 if (value && !['alert','open-url'].includes(type)) {
   try { target = root.querySelector(value); } catch { return false; }
 }
 if (['alert','open-url'].includes(type)) {
   if (type === 'alert') { event.preventDefault(); window.alert(value || 'Action triggered'); return true; }
   if (/^https?:\/\//i.test(value)) { event.preventDefault(); window.open(value, '_blank', 'noopener,noreferrer'); return true; }
   return false;
 }
 if (!target) return false;
 if (type === 'scroll') { event.preventDefault(); target.scrollIntoView({ behavior:'smooth',block:'start' }); return true; }
 if (type === 'toggle') { event.preventDefault(); target.classList.toggle('is-hidden'); return true; }
 if (type === 'show') { event.preventDefault(); target.classList.remove('is-hidden'); target.style.removeProperty('display'); return true; }
 if (type === 'hide') { event.preventDefault(); target.classList.add('is-hidden'); return true; }
 if (type === 'set-text') { event.preventDefault(); target.textContent = payload; return true; }
 if (type === 'copy-value') { target.textContent = String(source?.value ?? source?.textContent ?? ''); return true; }
 if (type === 'set-value') { if ('value' in target) target.value = payload; else target.textContent = payload; return true; }
 if (['toggle-class','add-class','remove-class'].includes(type)) {
   const className = payload.trim();
   if (!className || !/^[a-zA-Z_][\w-]*$/.test(className)) return false;
   const method = type==='toggle-class'?'toggle':type==='add-class'?'add':'remove';
   target.classList[method](className); return true;
 }
 if (type === 'set-style') {
   const colon = payload.indexOf(':'); if (colon < 1) return false;
   const property = payload.slice(0,colon).trim(); const content = payload.slice(colon+1).trim();
   if (!/^--[a-z\w-]+$/.test(property) && !/^[a-z-]+$/.test(property)) return false;
   target.style.setProperty(property,content); return true;
 }
 if (type === 'increment') {
   const amount = Number(payload || 1); const count = Number(target.textContent?.trim() || 0);
   if (!Number.isFinite(amount) || !Number.isFinite(count)) return false;
   target.textContent = String(count + amount); return true;
 }
 if (type === 'focus') { target.focus(); return true; }
 if (type === 'reset-form') { if (target.tagName === 'FORM') { event.preventDefault(); target.reset(); return true; } return false; }
 if (type === 'validate-form') {
   if (target.tagName !== 'FORM') return false;
   event.preventDefault();
   if (!target.checkValidity()) target.reportValidity();
   return true;
 }
 return false;
}

export function generatedActionSource(nodes) {
 const rules = Object.values(nodes).filter(n=>hasAction(n.action) && n.tag!=='studio-slot')
   .map(n=>({selector:`.element-${n.key}`,event:actionEvent(n.action,n.tag),action:n.action}));
 if (!rules.length) return '';
 const json=JSON.stringify(rules,null,2).replace(/</g,'\\u003c');
 return `  const interactions = ${json};\n  ${executeVisualAction.toString()}\n  for (const rule of interactions) {\n    const element = document.querySelector(rule.selector);\n    if (!element) continue;\n    element.addEventListener(rule.event, event => executeVisualAction(event, rule.action, document));\n  }\n`;
}
