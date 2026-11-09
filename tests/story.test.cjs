// Run with node --test tests/story.test.cjs. No browser or dependencies needed.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
function content(){const c=vm.createContext({window:{}});vm.runInContext(read('dialogue-content.js'),c);return c.window.LinguaConversations;}
test('every initial choice and repair can reach an outcome; all follow-ups are complete',()=>{
 const data=content();let outcomes=0;
 for(const [id,scenes] of Object.entries(data)){
  assert.equal(scenes.length,2,id);
  for(const s of scenes){
   assert.equal(s.replies.length,s.routes.length);assert.equal(s.repairs.length,s.repairRoutes.length);
   const check=(r,i,repair=false)=>{
    if(r.repair){assert.ok(s.reaction[i],id+' missing reaction');assert.ok(s.repairRoutes.some(x=>!x.hint));}
    else if(r.branch){const b=s.branches[r.branch];assert.ok(b,id+' missing branch');assert.equal(b.replies.length,b.outcomes.length);for(const o of b.outcomes){assert.ok(o.reaction&&o.consequence);outcomes++;}}
    else if(r.outcome){assert.ok(r.outcome.reaction&&r.outcome.consequence);outcomes++;}
    else assert.ok(repair&&r.hint,'only repair routes may retry');
   };
   s.routes.forEach((r,i)=>check(r,i));s.repairRoutes.forEach((r,i)=>check(r,i,true));
  }
 }
 assert.ok(outcomes>40);
});
// Small DOM adapter exercises real game state transitions; visual QA is separate.
class Element{
 constructor(){this.children=[];this.style={};this.dataset={};this.classList={add(){},remove(){},toggle(){}};this.handlers={};}
 append(...nodes){this.children.push(...nodes);} appendChild(node){this.children.push(node);return node;} replaceChildren(...nodes){this.children=nodes;}
 setAttribute(){} addEventListener(e,fn){this.handlers[e]=fn;} focus(){} scrollIntoView(){}
 querySelectorAll(){return [];} querySelector(){return new Element();}
 getContext(){return new Proxy({measureText:()=>({width:20})},{get:(o,k)=>o[k]||(()=>{}),set:(o,k,v)=>(o[k]=v,true)});}
}
function game(initial={}){
 const elements=new Map(),el=k=>{if(!elements.has(k))elements.set(k,new Element());return elements.get(k);};
 const storage={...initial};
 const window={matchMedia:()=>({matches:true}),addEventListener(){}};
 const c=vm.createContext({window,document:{getElementById:el,querySelector:el,querySelectorAll:()=>[],createElement:()=>new Element()},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},requestAnimationFrame(){},performance:{now:()=>0},setTimeout(){},clearTimeout(){},console});
 for(const f of ['dialogue-content.js','lab-comparisons.js'])vm.runInContext(read(f),c);
 let src=read('game.js');const end=src.lastIndexOf('})();');
 src=src.slice(0,end)+`window.test={characters,saved,stories,storyClues,caseQuestions,closeIntro,unlocked,talkTo,advance,answerQuestion,answerBranch,repairConversation,closeDialogue,openCaseboard,solveCase,chooseEnding,openComparison,chooseComparison,exitComparison,drawPuzzle,moveTile,drawDialogue,getDialogue:()=>dialogue};`+src.slice(end);
 vm.runInContext(src,c);return {api:window.test,storage,elements};
}
function settle(a){let n=0;while(a.getDialogue()?.mode==='branch'){assert.ok(n++<5);a.answerBranch(0);}}
test('complete case, wrong deductions, all endings and independent save slot',()=>{
 const old=JSON.stringify({started:true,progress:{mina:2,theo:2,prof:2,jules:2,nova:2},world:{caseSolved:true}});
 const {api:a,storage,elements}=game({'lingua-town-v1-progress':old});
 assert.equal(a.saved.progress.mina,0);a.closeIntro();
 for(const npc of a.characters){
  assert.ok(a.unlocked(npc));a.talkTo(npc);a.advance();
  for(let stage=0;stage<2;stage++){
   if(npc.id==='jules'){
    const d=a.getDialogue();d.tiles=stage?['old scripts','and','new masks','share the crate']:['I followed','the courier','who','carried the lantern'];
    a.drawDialogue();
    elements.get('dialogueContent').children.find(e=>e.textContent?.startsWith('SHOW JULES')).handlers.click();
   }else{
    const s=a.stories[npc.id][stage];
    const i=s.routes.findIndex(r=>!r.repair);a.answerQuestion(i);settle(a);
   }
   assert.equal(a.saved.progress[npc.id],stage+1);a.advance();
  }
 }
 assert.equal(a.getDialogue().mode,'caseboard');
 for(const q of a.caseQuestions){const step=a.getDialogue().caseStep;a.solveCase((q.correct+1)%3);assert.equal(a.getDialogue().caseStep,step);a.solveCase(q.correct);}
 assert.equal(a.saved.world.caseSolved,true);
 for(let i=0;i<3;i++){a.getDialogue().mode='victory';a.chooseEnding(i);assert.equal(a.getDialogue().mode,'epilogue');assert.ok(a.saved.world.storyEnding);}
 assert.equal(storage['lingua-town-v1-progress'],old);assert.ok(storage['lingua-town-stolen-voice-v2-progress']);
 const restored=game(storage).api;assert.equal(restored.saved.world.caseSolved,true);assert.equal(restored.saved.progress.nova,2);
});
test('both tile puzzles progress through real controls; wrong order stays on puzzle',()=>{
 const {api:a,elements}=game();a.closeIntro();a.saved.progress.prof=2;a.talkTo(a.characters[3]);a.advance();
 const show=()=>elements.get('dialogueContent').children.find(e=>e.textContent?.startsWith('SHOW JULES')).handlers.click();
 show();assert.equal(a.saved.progress.jules,0);
 a.getDialogue().tiles=['I followed','the courier','who','carried the lantern'];a.drawDialogue();show();assert.equal(a.saved.progress.jules,1);a.advance();
 a.getDialogue().tiles=['new masks','and','old scripts','share the crate'];a.drawDialogue();show();assert.equal(a.saved.progress.jules,2);
});
test('every initial reply runs through the engine; repairs and branches resume',()=>{
 const data=content();
 for(const [id,scenes] of Object.entries(data))for(let stage=0;stage<2;stage++)for(let i=0;i<scenes[stage].routes.length;i++){
  const {api:a,storage}=game();a.closeIntro();a.characters.forEach(n=>a.saved.progress[n.id]=2);a.saved.progress[id]=stage;a.talkTo(a.characters.find(n=>n.id===id));a.advance();a.answerQuestion(i);
  if(a.getDialogue().mode==='repair'){
   const restored=game(storage).api;assert.ok(restored.saved.pending[id]);
   const repair=scenes[stage].repairRoutes.findIndex(r=>!r.hint);a.repairConversation(repair);
  }
  if(a.getDialogue().mode==='branch')assert.ok(game(storage).api.saved.turns[id]);
  settle(a);assert.equal(a.saved.progress[id],stage+1,id+' stage '+stage+' reply '+i);
 }
});
test('comparison dimensions stay separate, ordering stays stable and closing clears judgments',()=>{
 const c=vm.createContext({window:{}});vm.runInContext(read('lab-comparisons.js'),c);
 for(const r of [0,1]){
  const session=c.window.LinguaComparisons.createSession(()=>r);
  for(let pair=0;pair<2;pair++){
   const cards=JSON.stringify(session.view().cards);
   for(const dimension of ['preference','naturalness','authorship']){
    assert.equal(session.view().dimension.id,dimension);assert.equal(JSON.stringify(session.view().cards),cards);assert.equal(session.choose('invalid'),false);assert.equal(session.choose('unsure'),true);
   }
   assert.equal(session.view().summary.length,3);if(pair===0)assert.ok(session.next());
  }
  session.dispose();assert.equal(session.view(),null);assert.equal(session.choose('A'),false);
 }
});
