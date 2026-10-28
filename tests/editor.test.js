import test from 'node:test';
import assert from 'node:assert/strict';
import {createBlank,createStarter,addItem,clone,insertExisting,cssEffective,generatedHTML,generatedCSS,generatedJS,fullHTML,wrapItem,removeItem,duplicateItem,generateBlock} from '../src/model.js';

test('body is represented as a separate editable root with empty children',()=>{const doc=createBlank();assert.equal(doc.roots.length,0);assert.equal(doc.bodyStyles.margin,'0');assert.equal(doc.version,3)});
test('adds nested box and leaf, then wraps leaf in a new box',()=>{let doc=createBlank();const box=addItem(doc,'div','body');doc=box.doc;const h=addItem(doc,'h1',box.key);doc=h.doc;assert.ok(doc.nodes[box.key].children.includes(h.key));const wrap=wrapItem(doc,h.key);doc=wrap.doc;assert.equal(doc.nodes[wrap.key].tag,'div');assert.equal(doc.nodes[wrap.key].children[0],h.key);assert.ok(generatedHTML(doc).includes('<h1'))});
test('moving a parent inside its child is rejected without altering document',()=>{let doc=createBlank();const p=addItem(doc,'section');doc=p.doc;const c=addItem(doc,'div',p.key);doc=c.doc;const copy=clone(doc);assert.equal(insertExisting(copy,p.key,c.key),false);assert.deepEqual(copy.roots,doc.roots);assert.deepEqual(copy.nodes[p.key].children,doc.nodes[p.key].children)});
test('mobile styles override tablet and base while desktop retains base',()=>{let doc=createBlank();const p=addItem(doc,'h1');doc=p.doc;doc.nodes[p.key].styles.fontSize='54px';doc.nodes[p.key].responsive={tablet:{fontSize:'42px'},mobile:{fontSize:'32px'}};assert.equal(cssEffective(doc.nodes[p.key],'desktop').fontSize,'54px');assert.equal(cssEffective(doc.nodes[p.key],'tablet').fontSize,'42px');assert.equal(cssEffective(doc.nodes[p.key],'mobile').fontSize,'32px');assert.match(generatedCSS(doc),/@media \(max-width: 767px\)/)});
test('starter fits into standalone HTML and includes interactions',()=>{const doc=createStarter(),html=fullHTML(doc);assert.match(html,/<!DOCTYPE html>/);assert.match(html,/<header/);assert.match(html,/<main/);assert.match(html,/<style>/);assert.match(html,/<script>/);assert.match(generatedCSS(doc),/grid-template-columns/);assert.doesNotThrow(()=>new Function(generatedJS(doc)))});
test('content block inserts actual children',()=>{const doc=createBlank();const block=generateBlock(doc,'hero');insertExisting(block.doc,block.key,'body');assert.ok(block.doc.nodes[block.key].children.length>=3);assert.match(generatedHTML(block.doc),/Make something remarkable/)});
test('deletion removes descendants, duplication changes identities',()=>{let doc=createBlank();const a=addItem(doc,'div');doc=a.doc;const b=addItem(doc,'p',a.key);doc=b.doc;const dup=duplicateItem(doc,a.key);doc=dup.doc;assert.notEqual(dup.key,a.key);assert.notEqual(doc.nodes[dup.key].children[0],b.key);doc=removeItem(doc,a.key);assert.equal(doc.nodes[a.key],undefined);assert.equal(doc.nodes[b.key],undefined);assert.ok(doc.nodes[dup.key])});

// Slots are a studio-only representation of deleted elements, not fake HTML.
test('deleting a button keeps an editor-only slot at its original position and restores it cleanly',async()=>{
 const {replaceWithSlot,fillEditorSlot,isEditorSlot}=await import('../src/model.js');
 let d=createBlank();const row=addItem(d,'div');d=row.doc;const one=addItem(d,'button',row.key);d=one.doc;const two=addItem(d,'button',row.key);d=two.doc;
 const deleted=replaceWithSlot(d,one.key,{width:124,height:43});
 assert.deepEqual(deleted.nodes[row.key].children,[one.key,two.key]);
 assert.ok(isEditorSlot(deleted.nodes[one.key]));
 assert.equal(deleted.nodes[one.key].styles.width,'124px');
 assert.equal(deleted.nodes[one.key].styles.height,'43px');
 assert.equal(deleted.nodes[two.key].tag,'button');
 assert.ok(!generatedHTML(deleted).includes('studio-slot'));
 assert.ok(!generatedCSS(deleted).includes(`element-${one.key}`));
 assert.ok(!generatedJS(deleted).includes(`element-${one.key}`));
 const filled=fillEditorSlot(deleted,one.key,'button');
 assert.ok(filled);assert.equal(filled.doc.nodes[one.key],undefined);
 assert.equal(filled.doc.nodes[row.key].children[0],filled.key);
 assert.equal(filled.doc.nodes[row.key].children[1],two.key);
 assert.equal(filled.doc.nodes[filled.key].tag,'button');
 assert.ok(!fullHTML(filled.doc).includes('studio-slot'));
 assert.equal(d.nodes[one.key].tag,'button'); // original snapshot remains valid for Undo
});
test('a nested subtree can be deleted to a slot without losing its siblings',async()=>{
 const {replaceWithSlot}=await import('../src/model.js');
 let doc=createBlank();const section=addItem(doc,'section');doc=section.doc;
 const wrap=addItem(doc,'div',section.key);doc=wrap.doc;
 const child=addItem(doc,'p',wrap.key);doc=child.doc;
 const sibling=addItem(doc,'h2',section.key);doc=sibling.doc;
 const slot=replaceWithSlot(doc,wrap.key,{width:330,height:120});
 assert.equal(slot.nodes[child.key],undefined);
 assert.deepEqual(slot.nodes[section.key].children,[wrap.key,sibling.key]);
 assert.match(generatedHTML(slot),/<h2/);
 assert.ok(!generatedHTML(slot).includes('<studio-slot'));
});
