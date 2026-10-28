const number=v=>Number.isFinite(v)?v:0;
const clamp=(v,min,max)=>Math.min(Math.max(v,min),Math.max(min,max));

/** Pure alignment engine. All values are in unscaled canvas CSS pixels. */
export function alignRect({rect,dx=0,dy=0,parent,peers=[],settings={},threshold=10}){
 const width=Math.max(0,number(rect.width)),height=Math.max(0,number(rect.height));
 const pw=Math.max(0,number(parent.width)),ph=Math.max(0,number(parent.height));
 let x=number(rect.left)+dx,y=number(rect.top)+dy;
 if(settings.keepInBounds){x=clamp(x,0,pw-width);y=clamp(y,0,ph-height)}
 let guideX=null,guideY=null;
 const snapAxis=(start,size,total,peerList,enabled)=>{
  const candidateLines=[];
  if(enabled)candidateLines.push({pos:0,type:'edge'},{pos:total/2,type:'center'},{pos:total,type:'edge'});
  if(settings.snapElements)for(const peer of peerList){candidateLines.push({pos:peer.start,type:'peer'},{pos:peer.start+peer.size/2,type:'peer'},{pos:peer.start+peer.size,type:'peer'})}
  const offsets=[0,size/2,size];let best=null;
  for(const cand of candidateLines)for(const offset of offsets){const change=cand.pos-(start+offset);if(Math.abs(change)<=threshold&&(!best||Math.abs(change)<Math.abs(best.change)))best={change,pos:cand.pos}}
  let moved=best?start+best.change:start;
  if(!best&&settings.snapGrid){const grid=Math.max(2,Number(settings.gridSize)||8),nearest=Math.round(moved/grid)*grid;if(Math.abs(nearest-moved)<=threshold/2)moved=nearest}
  if(settings.keepInBounds)moved=clamp(moved,0,total-size);
  return {value:moved,guide:best&&Math.abs(moved-(start+best.change))<0.5?best.pos:null};
 };
 if(settings.autoAlign||settings.snapElements||settings.snapGrid){
  const sx=snapAxis(x,width,pw,peers.map(p=>({start:p.left,size:p.width})),Boolean(settings.autoAlign));
  const sy=snapAxis(y,height,ph,peers.map(p=>({start:p.top,size:p.height})),Boolean(settings.autoAlign));
  x=sx.value;y=sy.value;guideX=sx.guide;guideY=sy.guide;
 }
 return {dx:Math.round(x-number(rect.left)),dy:Math.round(y-number(rect.top)),guideX,guideY};
}
