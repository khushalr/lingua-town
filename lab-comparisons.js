/* Teaching-only blind comparison model. No DOM, storage, logging, network, game
   state, participant identity, timestamps, source answer key, or research mode.
   A future approved study must supply a separate host and verified stimuli. */
(() => {
  'use strict';
  const examples = [
  {
    "id": "stolen-voice-friend",
    "title": "Update a worried witness",
    "context": "You have reached Nova's lab but have not yet verified the book. Leila is worried that her account caused a false accusation. Both replies report the same current facts to a close friend.",
    "texts": [
      "Leila, your description helped us follow the book to Nova’s lab. We’re checking it now. Seeing someone carry it didn’t make you a witness to a theft.",
      "Your account helped trace the book to Nova’s lab, Leila. It is being checked there. Your observation established that it was carried, not that it was stolen."
    ],
    "note": "Both versions distinguish observation from accusation. Preference, naturalness in this friendship, and perceived authorship need not line up. These practice samples have no verified source labels."
  },
  {
    "id": "stolen-voice-public",
    "title": "Keep the town informed",
    "context": "A delivery record led to Crate B at Nova's lab. The search team is checking the contents. The note's origin has not yet been verified. Compare two public updates with those same facts.",
    "texts": [
      "We’ve followed the delivery trail to Crate B at Nova’s lab. We’re checking what’s inside. We don’t yet know where the note came from; we’ll update you when we do.",
      "SEARCH UPDATE: Delivery records point to Crate B at Nova’s lab. Its contents are being checked. The origin of the note remains unverified. Further information will follow."
    ],
    "note": "The notices communicate the same information in different registers. An official tone is not evidence of accuracy or authorship; a conversational tone is not evidence either."
  }
];
  const dimensions = [
    {id:'preference',label:'Personal preference',prompt:'Which version do you personally prefer?',equal:'No preference'},
    {id:'naturalness',label:'Naturalness in context',prompt:'Which message sounds more natural for this situation?',equal:'About equally natural'},
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
