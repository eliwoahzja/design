/** Selection state is editor-only and is never emitted in the generated website. */
export function nextSelection({id,selected='body',selectedKeys=[],extend=false}) {
 if(id==='body')return {keys:[],focus:'body'};
 if(typeof id!=='string'||!id)return {keys:selectedKeys,focus:selected};
 const base=selectedKeys.length?selectedKeys:(selected!=='body'?[selected]:[]);
 const keys=extend?(base.includes(id)?base.filter(x=>x!==id):[...base,id]):[id];
 return {keys,focus:keys.includes(id)?id:(keys.at(-1)||'body')};
}
export function selectionForMode({selected='body',selectedKeys=[],enabled}){
 if(enabled)return {keys:selectedKeys.length?selectedKeys:(selected==='body'?[]:[selected]),focus:selected};
 const focus=selected!=='body'?selected:(selectedKeys.at(-1)||'body');
 return {keys:focus==='body'?[]:[focus],focus};
}
