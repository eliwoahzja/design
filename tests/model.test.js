import test from 'node:test';
import assert from 'node:assert/strict';
import {createBlank,addItem,wrapItem,duplicateItem,removeItem,insertExisting,generatedHTML,generatedCSS,generatedJS,fullHTML} from '../src/model.js';
test('adds nested containers and generates semantic HTML',()=>{let d=createBlank();let a=addItem(d,'section');d=a.doc;let b=addItem(d,'button',a.key);d=b.doc;assert.match(generatedHTML(d),/<section/);assert.match(generatedHTML(d),/<button/);assert.equal(d.nodes[a.key].children[0],b.key)});
test('wrap and duplicate preserve source structure',()=>{let a=addItem(createBlank(),'p');let w=wrapItem(a.doc,a.key);assert.equal(w.doc.nodes[w.key].children[0],a.key);let dup=duplicateItem(w.doc,a.key);assert.ok(dup.doc.nodes[dup.key]);assert.equal(dup.doc.nodes[w.key].children.length,2)});
test('remove deletes a subtree',()=>{let a=addItem(createBlank(),'div');let b=addItem(a.doc,'p',a.key);let d=removeItem(b.doc,a.key);assert.equal(Object.keys(d.nodes).length,0)});
test('generates CSS, interactions and standalone HTML',()=>{let a=addItem(createBlank(),'button');a.doc.nodes[a.key].styles.color='#112233';a.doc.nodes[a.key].action={type:'alert',value:'Hello'};assert.match(generatedCSS(a.doc),/#112233/);assert.match(generatedJS(a.doc),/addEventListener/);assert.match(fullHTML(a.doc),/<!DOCTYPE html>/)});
