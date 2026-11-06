/* Teaching-only blind comparison model. No DOM, storage, logging, network, game
   state, participant identity, timestamps, source answer key, or research mode.
   A future approved study must supply a separate host and verified stimuli. */
(() => {
  'use strict';
  const examples = [
    {
      id:'birthday', title:'A birthday invitation',
      context:"A close friend asks whether you're coming to their birthday tonight. You already have plans. This friend uses both plain messages and emoji.",
      texts:["Ahh I wish I could! I've already got plans, but have the best night 💛", "Sorry I can't make tonight. Hope you have a great birthday—coffee this weekend?"],
      note:"One version makes affection visible through punctuation and an emoji; the other offers a future meeting. Either may feel natural or preferable for a particular friendship."
    },
    {
      id:'office-hours', title:'Writing to a new professor',
      context:"You haven't met Professor Chen. Their syllabus invites students to arrange office hours by email. You want feedback on an essay outline.",
      texts:["Dear Professor Chen, would you have time this week to discuss my essay outline? Thank you for your help.", "Hi Professor Chen, could we find a time this week to talk through my essay outline? I'd appreciate your feedback."],
      note:"Both messages ask rather than assume availability. ‘Dear’ and ‘Hi’ can suggest different degrees of distance; local norms and the relationship affect how readers hear them."
    }
  ];
  const dimensions = [
    {id:'naturalness',label:'Naturalness in context',prompt:'Which message sounds more natural for this situation?',equal:'About equally natural'},
    {id:'preference',label:'Personal preference',prompt:'Which version do you personally prefer?',equal:'No preference'},
    {id:'authorship',label:'Perceived AI authorship',prompt:'Which message would you be more likely to guess was AI-generated?',equal:'About equally likely'}
  ];
  const allowed=new Set(['A','B','equal','unsure']);
  function createSession(random=Math.random){
    let pairIndex=0, step=0, answers={}, disposed=false;
    // The order is chosen once per pair. Rerenders and judgments never reshuffle it.
    const orders=examples.map(()=>random()<.5?[0,1]:[1,0]);
    function view(){
      if(disposed)return null;
      const item=examples[pairIndex],dimension=dimensions[step];
      return {
        title:item.title,context:item.context,pair:pairIndex+1,total:examples.length,
        cards:orders[pairIndex].map((index,i)=>({label:i===0?'A':'B',text:item.texts[index]})),
        dimension:dimension?{...dimension}:null,
        choices:dimension?[{id:'A',label:'Message A'},{id:'B',label:'Message B'},{id:'equal',label:dimension.equal},{id:'unsure',label:'Not sure / cannot tell'}]:[],
        // Feedback is deferred until all three distinct judgments have been made.
        summary:dimension?null:dimensions.map(d=>({label:d.label,value:answers[d.id]==='equal'?d.equal:answers[d.id]==='unsure'?'Not sure / cannot tell':`Message ${answers[d.id]}`})),
        note:dimension?null:item.note,hasNext:pairIndex+1<examples.length
      };
    }
    return Object.freeze({
      view,
      choose(id){if(disposed||step>=dimensions.length||!allowed.has(id))return false;answers[dimensions[step].id]=id;step++;return true;},
      next(){if(disposed||step!==dimensions.length||pairIndex+1>=examples.length)return false;answers={};step=0;pairIndex++;return true;},
      dispose(){answers={};orders.length=0;disposed=true;}
    });
  }
  window.LinguaComparisons=Object.freeze({createSession});
})();
