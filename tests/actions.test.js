import test from 'node:test';
import assert from 'node:assert/strict';
import {ACTION_TYPES,ACTION_EVENTS,actionEvent,eventForTag,executeVisualAction,generatedActionSource} from '../src/actions.js';
import {createBlank,node,generatedJS} from '../src/model.js';

const fakeClassList=()=>{const values=new Set();return {add:v=>values.add(v),remove:v=>values.delete(v),toggle:v=>values.has(v)?(values.delete(v),false):(values.add(v),true),contains:v=>values.has(v)}};
const fakeTarget=(tagName='DIV')=>({tagName, textContent:'', classList:fakeClassList(),style:{values:{},setProperty(k,v){this.values[k]=v},removeProperty(k){delete this.values[k]}}});
const environment=(target,source={value:'hello'})=>{let prevented=false;return {root:{querySelector:s=>{if(s==='#target')return target;return null}},event:{currentTarget:source,preventDefault(){prevented=true}},get prevented(){return prevented}}};
test('action event defaults reflect the HTML element while allowing overrides',()=>{
 assert.equal(eventForTag('form'),'submit');assert.equal(eventForTag('input'),'input');assert.equal(actionEvent({type:'toggle'},'div'),'click');assert.equal(actionEvent({event:'change'},'select'),'change');
 assert.ok(ACTION_EVENTS.includes('focus'));assert.ok(ACTION_TYPES.includes('copy-value'));assert.ok(ACTION_TYPES.includes('validate-form'));
});
test('text inputs can update unrelated text without button events',()=>{
 const target=fakeTarget(), {event,root}=environment(target,{value:'a typed sentence'});
 assert.equal(executeVisualAction(event,{type:'copy-value',value:'#target'},root),true);
 assert.equal(target.textContent,'a typed sentence');
});
test('click and hover actions can toggle classes and visibility',()=>{
 const target=fakeTarget(),{event,root}=environment(target);
 executeVisualAction(event,{type:'toggle',value:'#target'},root);
 assert.equal(target.classList.contains('is-hidden'),true);
 executeVisualAction(event,{type:'show',value:'#target'},root);
 assert.equal(target.classList.contains('is-hidden'),false);
 executeVisualAction(event,{type:'add-class',value:'#target',payload:'active'},root);
 assert.equal(target.classList.contains('active'),true);
 executeVisualAction(event,{type:'remove-class',value:'#target',payload:'active'},root);
 assert.equal(target.classList.contains('active'),false);
});
test('form validation on submit prevents native submission and reports errors',()=>{
 const form=fakeTarget('FORM');let reported=0;
 form.checkValidity=()=>false;form.reportValidity=()=>{reported++};
 const state=environment(form);
 assert.equal(executeVisualAction(state.event,{type:'validate-form',value:'#target'},state.root),true);
 assert.equal(state.prevented,true);assert.equal(reported,1);
});
test('style, counter and malformed selectors handled safely',()=>{
 const target=fakeTarget();target.textContent='4';const state=environment(target);
 executeVisualAction(state.event,{type:'increment',value:'#target',payload:'2'},state.root);
 assert.equal(target.textContent,'6');
 executeVisualAction(state.event,{type:'set-style',value:'#target',payload:'color: rgb(10, 20, 30)'},state.root);
 assert.equal(target.style.values.color,'rgb(10, 20, 30)');
 assert.equal(executeVisualAction(state.event,{type:'set-style',value:'#target',payload:'@@@'},state.root),false);
 assert.equal(executeVisualAction(state.event,{type:'show',value:'[broken'}, {querySelector(){throw Error('invalid selector')}}),false);
});
test('generated JS includes input and form event listeners and actionable runtime',()=>{
 const d=createBlank(); const input=node('input',{action:{type:'copy-value',event:'input',value:'#result'}});
 const form=node('form',{action:{type:'validate-form',event:'submit',value:'form'}});
 d.nodes[input.key]=input;d.nodes[form.key]=form;d.roots=[input.key,form.key];
 const js=generatedJS(d);
 assert.match(js,/"event": "input"/);assert.match(js,/"event": "submit"/);
 assert.match(js,/executeVisualAction\(event, rule.action, document\)/);
 assert.match(js,/target\.reportValidity\(\)/);
 assert.doesNotMatch(js,/(^|\n)\s*\/\/|\/\*[^]*?\*\//);
 assert.doesNotThrow(()=>new Function(js));
});
test('generated action source omits unconfigured actions instead of writing fake logic',()=>{
 const n=node('div');assert.equal(generatedActionSource({[n.key]:n}),'');
});
