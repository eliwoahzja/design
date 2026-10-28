import test from 'node:test';
import assert from 'node:assert/strict';
import {createBlank,addItem,clone,groupItems,ungroupItem,isGroupNode,parentOf,generatedHTML,generatedCSS,generatedJS,fullHTML} from '../src/model.js';

test('two siblings can be grouped into a real div, with unchanged descendants',()=>{
 let d=createBlank(); const a=addItem(d,'button','body');d=a.doc;const b=addItem(d,'p','body');d=b.doc; const c=addItem(d,'img','body');d=c.doc;
 const result=groupItems(d,[b.key,a.key]);assert.ok(result);
 assert.deepEqual(result.doc.roots,[result.key,c.key]);
 assert.deepEqual(result.doc.nodes[result.key].children,[a.key,b.key]);
 assert.equal(result.doc.nodes[result.key].tag,'div');
 assert.ok(isGroupNode(result.doc.nodes[result.key]));
 assert.equal(parentOf(result.doc,a.key),result.key);
 assert.equal(parentOf(result.doc,b.key),result.key);
 const html=generatedHTML(result.doc);assert.match(html,/<div class="studio-group element-/);
 assert.match(html,/<button/);assert.match(html,/<p/);
 assert.deepEqual(d.roots,[a.key,b.key,c.key]);
});
test('ungroup restores original siblings in place and preserves styles',()=>{
 let d=createBlank();const a=addItem(d,'p');d=a.doc;const b=addItem(d,'img');d=b.doc;
 d.nodes[a.key].styles.color='red';
 const group=groupItems(d,[a.key,b.key]);assert.ok(group);
 const res=ungroupItem(group.doc,group.key);assert.ok(res);
 assert.deepEqual(res.doc.roots,[a.key,b.key]);
 assert.equal(res.doc.nodes[group.key],undefined);
 assert.equal(res.doc.nodes[a.key].styles.color,'red');
 assert.equal(ungroupItem(d,a.key),null);
});
test('group rejects parents, children, slots, and elements from separate containers',()=>{
 let d=createBlank(); const p=addItem(d,'section');d=p.doc;const child=addItem(d,'button',p.key);d=child.doc;const other=addItem(d,'button');d=other.doc;
 assert.equal(groupItems(d,[p.key,child.key]),null);
 assert.equal(groupItems(d,[child.key,other.key]),null);
 assert.equal(groupItems(d,[child.key,child.key]),null);
 assert.equal(groupItems(d,['body',other.key]),null);
});
test('export is commentless for generated HTML, CSS, JS and the complete page',()=>{
 let d=createBlank();const item=addItem(d,'button');d=item.doc;
 d.nodes[item.key].action={type:'alert',value:'Clicked'};
 for(const source of [generatedHTML(d),generatedCSS(d),generatedJS(d),fullHTML(d)]){
  assert.doesNotMatch(source,/\/\*[\s\S]*?\*\//);
  assert.doesNotMatch(source,/<!--[\s\S]*?-->/);
  assert.doesNotMatch(source,/^\s*\/\//m);
 }
 assert.doesNotThrow(()=>new Function(generatedJS(d)));
});
test('custom user code is preserved even if it contains user-authored comments',()=>{
 const d=createBlank();d.extraCSS='/* authored by user */ .custom { color: red; }';d.customJS='// authored by user\nconsole.log("hi");';
 assert.match(generatedCSS(d),/authored by user/);
 assert.match(generatedJS(d),/authored by user/);
});
