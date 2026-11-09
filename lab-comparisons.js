/* Teaching-only blind comparison model. No DOM, storage, logging, network, game
   state, participant identity, timestamps, source answer key, or research mode.
   A future approved study must supply a separate host and verified stimuli. */
(() => {
  'use strict';
  const examples = [
    {
      id:'festival-friend', title:'Reassuring a worried festival friend',
      context:"Leila heard a rumour that Night of Voices was cancelled. You know it is happening tonight in the square, but the signed start time has not yet been checked. Compare two truthful replies to a close friend.",
      texts:["Leila, it's still on tonight! ✨ Come to the square with me—we'll check the exact time together.","Story Night hasn't been cancelled. It's in the town square tonight; the official start time is being confirmed."],
      note:"Both messages share verified facts while leaving the time open. A warmer register may suit one friendship, while another person may prefer a more direct explanation. Neither style identifies the author."
    },
    {
      id:'festival-notice', title:'Correcting a public festival rumour',
      context:"The town must clarify a cropped message. The original invitation confirms Story Night happens in the town square tonight. The library service desk closes at 8 PM, but the exact event start time is awaiting verification. Compare two versions of a community correction.",
      texts:["Good news, neighbours! Story Night is ON 🌙 The eight o’clock sign was only for the library—not the festival! We’ll share the confirmed start time soon.", "OFFICIAL UPDATE: Night of Voices proceeds tonight in the town square. The library service desk closes at 8 PM; the festival schedule will be confirmed shortly."],
      note:"Both notices communicate the same verified distinctions in different registers. Your preference or suspicion about AI authorship does not establish how either was written."
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
