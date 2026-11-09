/* Lingua Town — original pixel-art teaching adventure. No framework or backend required. */
(() => {
  'use strict';
  const T = 32, W = 26, H = 18;
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const portraitCanvas = document.getElementById('portraitCanvas');
  const pctx = portraitCanvas.getContext('2d');
  pctx.imageSmoothingEnabled = false;
  const dialogueContent = document.getElementById('dialogueContent');
  const nearbyTip = document.getElementById('nearbyTip');
  const introModal = document.getElementById('introModal');
  const topScreen = document.querySelector('.top-screen');
  const dialoguePanel = document.getElementById('dialoguePanel');
  const overlayBody = document.getElementById('overlayBody');
  const overlaySpeaker = document.getElementById('overlaySpeaker');
  const STORAGE_KEY = 'lingua-town-stolen-voice-v2-progress';

  const characters = [
  {
    "id": "mina",
    "name": "Mina",
    "role": "The Café Regular",
    "subject": "Register & Audience",
    "icon": "☕",
    "hair": "#26244d",
    "skin": "#db9a70",
    "outfit": "#df8099",
    "accent": "#ffd0a7",
    "badge": "THE SOCIAL CHAMELEON",
    "x": 7,
    "y": 8,
    "greeting": "Leila saw the missing book leave the square. Everyone is asking her to name a thief. I need her account, not another accusation.",
    "done": "Leila gave us a route and a description. Listening got us further than treating her like a suspect.",
    "questions": [
      {
        "title": "Interview a friend, not a suspect",
        "concept": "REGISTER",
        "prompt": "A nervous friend saw someone carrying the missing book. Choose how to invite her account.",
        "explanation": "Register is variation in language associated with context and use. Formal questioning can create distance in a friendship; shared humour or quiet reassurance may work if the listener welcomes it. A listener’s response lets you adjust.",
        "discussion": "Quiet and playful approaches both work when they respect Leila’s response."
      },
      {
        "title": "Get the object right",
        "concept": "AUDIENCE DESIGN",
        "prompt": "Ask the organizers to compare a witness description with their inventory.",
        "explanation": "Audience design means adapting language to the recipient and their needs. The committee needs identifying details and an explicit question. Neither a formal nor a friendly register makes an unsupported accusation true.",
        "discussion": "Both a formal request and a friendly question can supply the same useful details."
      }
    ]
  },
  {
    "id": "theo",
    "name": "Theo",
    "role": "The Librarian",
    "subject": "Conversation Rules",
    "icon": "📚",
    "hair": "#69513d",
    "skin": "#bc855f",
    "outfit": "#77a6a6",
    "accent": "#ffe1a0",
    "badge": "THE CONVERSATION KEEPER",
    "x": 21,
    "y": 8,
    "greeting": "I said, “I wouldn’t leave that book there.” Someone heard a threat. Come look at the leak I was pointing to.",
    "done": "The leak explains my warning. Lin’s rescue slip and the lantern sighting gave us the next part of the route.",
    "questions": [
      {
        "title": "A warning, or an order to disappear?",
        "concept": "COOPERATION & INDIRECT MEANING",
        "prompt": "Theo said “I wouldn’t leave that book there” while pointing at a leak. Interpret it and check his intention.",
        "explanation": "The cooperative principle invites listeners to seek relevant meaning in context. A declarative sentence about a hypothetical action can function as an indirect warning or request. The leak supports that interpretation; Theo confirms it.",
        "discussion": "The literal words alone do not say the book was stolen or the festival cancelled."
      },
      {
        "title": "A lantern is not a name",
        "concept": "CONVERSATIONAL IMPLICATURE",
        "prompt": "Asked who carried the book, a witness reports a lantern moving toward the market.",
        "explanation": "An answer that supplies a direction instead of an identity may imply that the speaker cannot identify the person. This inference is defeasible: a follow-up could reveal another reason for the indirect answer. Here the witness confirms they saw no face.",
        "discussion": "Record the observed bundle and route separately from an inferred identity."
      }
    ]
  },
  {
    "id": "prof",
    "name": "Professor Lin",
    "role": "The Linguist",
    "subject": "Meaning & Context",
    "icon": "🎓",
    "hair": "#53506d",
    "skin": "#f1bd8d",
    "outfit": "#7486ba",
    "accent": "#faf0d0",
    "badge": "THE MEANING DETECTIVE",
    "x": 6,
    "y": 11,
    "greeting": "You found my first rescue update? Let’s compare what it said with what people thought it meant. Then we can follow the delivery slip.",
    "done": "All forty pages were rescued. “Some” was an early update, not proof that the remaining pages were lost.",
    "questions": [
      {
        "title": "How many stories survived?",
        "concept": "SCALAR IMPLICATURE",
        "prompt": "Lin wrote “Some pages were rescued.” Does that require some pages to be lost?",
        "explanation": "In the standard logical reading, “some” means at least one and is compatible with all. It often conversationally suggests “not all”. That scalar implicature can be cancelled: “Some—in fact, all forty—were rescued.” The final tally, not the weaker statement alone, establishes the total.",
        "discussion": "The early statement was true but less informative than the completed tally."
      },
      {
        "title": "Keep the trail from blowing away",
        "concept": "INDIRECT SPEECH ACTS",
        "prompt": "The delivery slip lifts in a gust. Lin says “That paper won’t stay there for long…”",
        "explanation": "An indirect speech act accomplishes something beyond the literal sentence type. Lin’s prediction functions as a request to secure the slip. Closing the window or moving the paper can both satisfy the goal; checking with Lin avoids assuming a single required action.",
        "discussion": "Different actions can successfully respond to the same indirect request."
      }
    ]
  },
  {
    "id": "jules",
    "name": "Jules",
    "role": "The Market Seller",
    "subject": "Ambiguity & Structure",
    "icon": "🍎",
    "hair": "#382f54",
    "skin": "#a96b4d",
    "outfit": "#eeb15c",
    "accent": "#a2ddb8",
    "badge": "THE AMBIGUITY EXPLORER",
    "x": 18,
    "y": 10,
    "greeting": "I followed the courier with the lantern. Wait—you think I had the lantern? That would send you after the wrong person. Let’s untangle my records.",
    "done": "The courier carried the lantern. Crate B held old scripts and new masks; I sent that crate, with the blue bundle, to Nova.",
    "questions": [
      {
        "title": "Who carried the lantern?",
        "concept": "STRUCTURAL AMBIGUITY",
        "prompt": "“I followed the courier with the lantern” permits more than one attachment. Jules confirms the courier carried it. Rewrite that reading explicitly.",
        "explanation": "The prepositional phrase “with the lantern” can attach to the verb phrase (I used a lantern to follow) or to the noun phrase (the courier had it). “I followed the courier who carried the lantern” selects the second interpretation. Jules’s testimony, not word order alone, establishes which event happened.",
        "discussion": "A clearer sentence reports the confirmed reading; it does not discover the facts by itself.",
        "success": "The relative clause makes the courier the lantern carrier."
      },
      {
        "title": "Which crate holds the book?",
        "concept": "COORDINATION & MODIFIER SCOPE",
        "prompt": "The label says “old scripts and masks”. Crate A contains old scripts and old masks; Crate B contains old scripts and new masks. Jules confirms the masks were new.",
        "explanation": "In “old scripts and masks”, “old” can modify scripts alone or the coordinated scripts-and-masks group. Both crates fit a possible reading of the label. The independent detail that the masks are new identifies Crate B; explicitly labelling each group prevents another wrong delivery.",
        "discussion": "Use both the language analysis and the packing record, then give Nova an unambiguous label.",
        "success": "Old scripts and new masks identify Crate B. Jules sent it to Nova with the blue-wrapped book inside."
      }
    ]
  },
  {
    "id": "nova",
    "name": "Dr. Nova",
    "role": "The AI Researcher",
    "subject": "Writing & Perception",
    "icon": "🤖",
    "hair": "#2e4167",
    "skin": "#cf9b7b",
    "outfit": "#8a80d7",
    "accent": "#b9eeeb",
    "badge": "MASTER OF CONTEXT",
    "x": 21,
    "y": 11,
    "greeting": "Crate B arrived from Jules. Before we announce anything, help me check what’s inside—and where that alarming note came from.",
    "done": "The book is back and the note has its missing context. You can revisit the case or compare how different messages sound.",
    "questions": [
      {
        "title": "Find the book, then trust the message",
        "concept": "NATURALNESS ≠ AUTHORSHIP",
        "prompt": "Two messages claim the stories are safe. Authenticate the recovered book using inventory and delivery records.",
        "explanation": "Naturalness in context, personal preference, and perceived AI authorship are distinct judgments. Neither casual nor formal style establishes who wrote a message or whether its claim is true. Physical identifiers, the page tally, and matching transfer records support this recovery.",
        "discussion": "The optional comparison desk lets you make the three judgments separately, without marking a stylistic preference wrong."
      },
      {
        "title": "Who is “your” in the note?",
        "concept": "DEIXIS & CONTEXT",
        "prompt": "The full script assigns “Tonight, your voice is mine” to the Voice Thief addressing a fictional chorus. Compare that with the unsigned cue card.",
        "explanation": "Deictic expressions such as “I” and “your” are interpreted relative to a speaking context. A performance supplies fictional speaker and addressee roles. When the cue card lost its speaker label and scene, readers supplied a different context and interpreted a threat. The prop record and script support the theatrical reading.",
        "discussion": "Feeling threatened was understandable; the new context lets listeners revise that interpretation."
      }
    ]
  }
];

  // Gameplay narrative is separate from the no-storage comparison model.
  const stories=window.LinguaConversations;
  const rooms = {
    cafe:{name:'THE CORNER CAFÉ',npc:'mina',door:[5,7],color:'#d5918d',floor:'#d9b493',furniture:[[5,5,3,2],[17,5,3,2],[6,11,3,2],[17,11,3,2]]},
    library:{name:'THE LIBRARY',npc:'theo',door:[20,7],color:'#818cbb',floor:'#c4b89e',furniture:[[4,4,5,2],[17,4,5,2],[4,9,4,2],[18,9,4,2]]},
    campus:{name:'LIN’S CLASSROOM',npc:'prof',door:[5,17],color:'#b59d67',floor:'#c8bd9d',furniture:[[5,7,3,2],[17,7,3,2],[5,11,3,2],[17,11,3,2]]},
    lab:{name:'THE LINGO LAB',npc:'nova',door:[20,17],color:'#9480bd',floor:'#b6cbd3',furniture:[[4,5,5,2],[17,5,5,2],[17,11,3,2]]}
  };
  let scene='town', routeEnter=null, travelTarget=null;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  for(const [id,room] of Object.entries(rooms)){
    const n=characters.find(n=>n.id===room.npc);n.scene=id;n.x=12;n.y=7;
  }
  characters.find(n=>n.id==='jules').scene='town';
  const sceneNPCs=()=>characters.filter(n=>n.scene===scene);
  function roomBlocked(x,y){
    return x<3||x>22||y<4||y>16||(scene==='cafe'&&saved.progress.mina>0&&x===10&&y===8)||rooms[scene].furniture.some(([a,b,w,h])=>x>=a&&x<a+w&&y>=b&&y<b+h);
  }
  function changeScene(id){
    if(id==='lab'&&!unlocked(characters[4])){announce('The lab opens after four neighbor badges.');travelTarget=null;return;}
    const old=scene;scene=id;route=[];routeTalk=null;routeEnter=null;pressed.clear();pointerCell=null;
    const dest=id==='town'?rooms[old].door:[12,15];
    player.x=player.px=dest[0];player.y=player.py=dest[1];player.move=null;
    document.querySelector('.location-title').textContent=id==='town'?'LINGUA TOWN ✦ DAY 01':rooms[id].name;
    document.getElementById('leaveRoomBtn').hidden=id==='town';
    document.querySelector('.top-screen').classList.remove('scene-arrival');
    if(!reducedMotion)requestAnimationFrame(()=>document.querySelector('.top-screen').classList.add('scene-arrival'));
    drawIdlePanel();renderNearby();announce(id==='town'?'BACK IN THE TOWN SQUARE':rooms[id].name);
    if(travelTarget){const target=travelTarget;travelTarget=null;walkToNPC(target);}
  }
  function doorHere(){return scene==='town'?Object.entries(rooms).find(([,r])=>r.door[0]===player.x&&r.door[1]===player.y)?.[0]:(player.x===12&&player.y===16?'town':null);}

  const obstacles = new Set();
  const key = (x,y) => `${x},${y}`;
  function blockRect(x,y,w,h){for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)obstacles.add(key(xx,yy));}
  blockRect(2,2,7,5); blockRect(17,2,7,5); blockRect(2,13,7,4); blockRect(17,13,7,4);
  blockRect(12,8,2,2);
  const trees = [[1,1],[10,2],[14,2],[24,1],[1,6],[24,6],[1,16],[10,16],[15,16],[24,16],[1,12],[24,13]];
  const benches = [[10,7],[15,11]];
  const boxes = [[16,8]];
  for (const [x,y] of [...trees,...benches,...boxes]) obstacles.add(key(x,y));
  const npcAt = (x,y) => sceneNPCs().find(n=>n.x===x && n.y===y);
  const walkable = (x,y) => x>=0&&x<W&&y>=0&&y<H&&!(scene==='town'?obstacles.has(key(x,y)):roomBlocked(x,y))&&!npcAt(x,y);
  const player={x:12,y:12,px:12,py:12,facing:'down',move:null};
  const dirs={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
  const keydirs={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',a:'left',s:'down',d:'right',W:'up',A:'left',S:'down',D:'right'};
  const pressed=new Set();
  let route=[]; let routeTalk=null; let lastStep=0; let modalOpen=true;
  let dialogue=null; // NPC encounter and story state.
  let encounterStarted=0;

  let pointerCell=null;
  let toastTimer=null;
  let saved={progress:{},started:false,relationships:{},repairs:{},pending:{},turns:{},world:{},memories:[]};
  try {
    const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    if(raw&&typeof raw==='object'){
      const record=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
      saved={...saved,started:!!raw.started,progress:record(raw.progress),relationships:record(raw.relationships),repairs:record(raw.repairs),pending:record(raw.pending),turns:record(raw.turns),world:record(raw.world),memories:Array.isArray(raw.memories)?raw.memories.filter(m=>typeof m==='string').slice(-5):[]};
    }
  }catch(e){ /* storage optional */ }
  if(saved.world.storyEnding&&!saved.world.caseSolved)saved.world.caseSolved=true;
  for(const n of characters){
    saved.progress[n.id]=Math.max(0,Math.min(n.questions.length,Math.floor(Number(saved.progress[n.id])||0)));
    if(saved.progress[n.id]===n.questions.length||!stories[n.id]||typeof saved.pending[n.id]!=='string')delete saved.pending[n.id];
    if(!['Needs repair','Trust restored','In sync','Talking it through'].includes(saved.relationships[n.id]))delete saved.relationships[n.id];
    const turn=saved.turns[n.id];
    if(!turn||turn.stage!==saved.progress[n.id]||!Object.hasOwn(stories[n.id]?.[turn.stage]?.branches||{},turn.node))delete saved.turns[n.id];
    saved.repairs[n.id]=Math.max(0,Math.floor(Number(saved.repairs[n.id])||0));
  }
  function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(saved));}catch(e){document.getElementById('saveStatus').textContent='SAVING UNAVAILABLE · THIS SESSION ONLY';}}
  function completed(n){return saved.progress[n.id]>=n.questions.length;}
  // Follow one lead at a time. Existing saves still retain previously visited villagers.
  function nextLead(){return characters.find(n=>!completed(n))||characters[4];}
  function unlocked(n){
    if(completed(n)||saved.progress[n.id]>0)return true;
    const index=characters.indexOf(n);
    return index===0||completed(characters[index-1]);
  }
  function nextAfter(n){return characters[characters.indexOf(n)+1]||null;}

  function completedCount(){return characters.filter(completed).length;}
  function announce(msg){const e=document.getElementById('toast');e.textContent=msg;e.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('visible'),2600);}
  function numberEmoji(){return ['①','②','③'];}
  // Each clue adds a necessary link to the same missing-book investigation.
  const storyClues = [
  {
    "id": "mina",
    "title": "PIECE 1 · A witness, not a suspect",
    "short": "Red book → library",
    "text": "Leila saw a red book with a gold star, wrapped in blue cloth, carried toward the library. The committee confirms the description matches. She did not identify the carrier or witness a theft."
  },
  {
    "id": "theo",
    "title": "PIECE 2 · The warning under the leak",
    "short": "A rescue, then a lantern",
    "text": "Theo’s “I wouldn’t leave that book there” warned about a leak. Lin arranged a rescue. A witness saw blue cloth and a lantern moving toward the market, but no face."
  },
  {
    "id": "prof",
    "title": "PIECE 3 · Forty pages accounted for",
    "short": "“Some”—in fact, all forty",
    "text": "Lin’s final tally records all forty pages rescued. “Some” suggested a possible “not all”; it did not entail lost pages. Jules’s delivery slip reads “I followed the courier with the lantern.”"
  },
  {
    "id": "jules",
    "title": "PIECE 4 · Follow Crate B",
    "short": "Courier’s lantern · new masks",
    "text": "Jules confirms the courier carried the lantern. The blue bundle went in Crate B with old scripts and NEW masks. The ambiguous label “old scripts and masks” also fit Crate A. Jules sent Crate B to Nova."
  },
  {
    "id": "nova",
    "title": "PIECE 5 · The voice behind the note",
    "short": "A cue card, not a confession",
    "text": "Crate B contains the matching book and all forty pages. The full rehearsal script assigns “Tonight, your voice is mine” to the fictional Voice Thief. The prop record places that cue card at the stand before the rain and rescue."
  }
];
  const caseQuestions = [
  {
    "id": "mina",
    "question": "What could Leila actually establish?",
    "options": [
      "The matching book went toward the library; the carrier and their intentions were unknown.",
      "The carrier stole the book because they left the square.",
      "A red cover alone proved it was the town’s book."
    ],
    "correct": 0,
    "reason": "The inventory corroborates the description. Neither carrying the book nor leaving the square establishes theft."
  },
  {
    "id": "theo",
    "question": "Why did the book leave the stand?",
    "options": [
      "Theo ordered the storytellers to leave town.",
      "Theo’s warning about a leak prompted a rescue arranged by Lin.",
      "A lantern sighting proves someone took it without permission."
    ],
    "correct": 1,
    "reason": "Theo confirms his intended warning; the rescue slip supports the move. The lantern gives a route, not a motive."
  },
  {
    "id": "prof",
    "question": "Did “some pages were rescued” prove stories were lost?",
    "options": [
      "Yes. “Some” logically excludes “all”.",
      "No. It permits all; the final tally confirms all forty survived.",
      "No. “Some” by itself guarantees every page survived."
    ],
    "correct": 1,
    "reason": "“Not all” is a cancellable scalar implicature. Only the complete tally gives the final total."
  },
  {
    "id": "jules",
    "question": "Which route does the clarified evidence support?",
    "options": [
      "Follow Jules’s lantern to Crate A, with old masks.",
      "Search both crates forever; language cannot be clarified.",
      "Follow the lantern-carrying courier to Crate B: old scripts, new masks, then Nova."
    ],
    "correct": 2,
    "reason": "The two ambiguous phrases permit alternatives; Jules’s testimony and packing record select the readings that identify Crate B."
  },
  {
    "id": "nova",
    "question": "What best explains the note beside the empty stand?",
    "options": [
      "Its threatening style proves a real thief wrote it.",
      "The script and prop record identify a rehearsal cue card left before the separate rescue.",
      "The casual recovery message proves nobody did anything wrong."
    ],
    "correct": 1,
    "reason": "The script supplies the fictional speaker and addressee; the prop and delivery records establish the sequence. Style alone cannot do either."
  }
];
  const finalAnnouncements = [
  {
    "title": "Explain the evidence",
    "message": "The storybook is back—all forty pages. It was moved out of a leak. The note was a rehearsal cue card, not a message from a thief. Meet us in the square for Story Night.",
    "ending": "Theo lays the rescue slips beside the cue card. People can follow the route you reconstructed. Leila points out the gold star on the cover. This time, nobody adds a name she never gave.",
    "tone": "clarity"
  },
  {
    "title": "Invite everyone back",
    "message": "We found our stories 💛 Every page is safe. The scary note belonged to the play, and the book had been moved out of the rain. Come back to the square—we have a night to begin.",
    "ending": "Mina waves Leila over to a seat. Your invitation gives the crowd somewhere to go and something to look forward to. When someone asks how you know, Nova shows them the book and the full script.",
    "tone": "warmth"
  },
  {
    "title": "Post an official update",
    "message": "STORY NIGHT UPDATE: The complete storybook has been recovered following its relocation due to a leak. The apparent threat was a theatrical cue card. The event will proceed in the town square.",
    "ending": "Lin posts your update beside the recovered book. The committee appreciates a clear public record; Mina adds a personal invitation at the café. Different audiences, the same verified account.",
    "tone": "official"
  }
];
  function openCaseboard(){
    if(!dialogue||!storyClues.every(c=>completed(characters.find(n=>n.id===c.id))))return;
    dialogue.mode='caseboard';dialogue.caseStep=0;dialogue.caseHint='';drawDialogue();
  }
  function solveCase(i){
    if(dialogue?.mode!=='caseboard')return;
    const item=caseQuestions[dialogue.caseStep];if(!item)return;
    if(i!==item.correct){dialogue.caseHint=item.reason+' Check the matching clue, then try again.';drawDialogue();return;}
    dialogue.caseHint='';dialogue.caseStep++;
    if(dialogue.caseStep>=caseQuestions.length){
      saved.world.caseSolved=true;persist();renderJournal();dialogue.mode='victory';
      announce('✦ ALL FIVE PIECES FIT TOGETHER!');
    }
    drawDialogue();
  }
  function storyChapter(){
    const clues=storyClues.filter(c=>saved.progress[c.id]>=2).length;
    return saved.world.storyEnding?'EPILOGUE · A TOWN TOGETHER':clues===5?'CHAPTER III · THE VOICE BEHIND THE NOTE':clues>=2?'CHAPTER II · FOLLOW THE LANTERN':'CHAPTER I · THE EMPTY STAND';
  }

  function renderJournal(){
    const count=completedCount();
    document.getElementById('progressCount').textContent=`${count} / 5`;
    document.getElementById('progressFill').style.width=`${count*20}%`;
    const list=document.getElementById('questList');list.replaceChildren();
    const next=characters.find(n=>!completed(n));
    const clues=storyClues.filter(c=>completed(characters.find(n=>n.id===c.id)));
    const chapter=storyChapter();
    document.getElementById('storyAct').textContent=chapter;
    document.getElementById('storyTitle').textContent=saved.world.storyEnding?'The stories are home.':clues.length===5?'The book is found. Explain the note.':'The Stolen Voice';
    document.getElementById('storySummary').textContent=saved.world.storyEnding?'All forty stories are back. Revisit your friends or try another announcement.':clues.length===5?'The book and full script are recovered. Reconstruct what happened with Nova.':`A missing book. A threatening note. You hold ${clues.length} of 5 clues to what happened.`;
    document.getElementById('objectiveText').textContent=saved.world.storyEnding?'The festival is saved. Return to Nova to try another ending.':saved.world.caseSolved?'The puzzle is solved! Choose your town announcement with Nova.':clues.length===5?'Visit Dr. Nova. Fit all five pieces together on the caseboard.':`NEXT LEAD: ${nextLead().name} · ${5-clues.length} more puzzle ${5-clues.length===1?'piece':'pieces'} to find.`;
    const clueList=document.getElementById('clueList');
    clueList.replaceChildren(...storyClues.map(c=>h('li',`${clues.includes(c)?'✦':'◇'} ${c.title}${clues.includes(c)?' — '+c.text:' — not yet found'}`,clues.includes(c)?'found':'missing')));
    document.getElementById('memoryList').replaceChildren(...saved.memories.map(m=>h('li',m)));
    document.querySelector('.location-title').textContent=`THE STOLEN VOICE ✦ ${chapter}`;

    for(const npc of characters){
      const button=document.createElement('button');button.type='button';
      button.className=`quest-item ${completed(npc)?'done':''} ${unlocked(npc)?'':'locked'} ${nextLead()===npc?'current-lead':''}`;
      button.title=`Find ${npc.name} in the town`;
      const avatar=document.createElement('span');avatar.className='quest-avatar';avatar.textContent=npc.icon;
      const details=document.createElement('span');details.className='quest-details';
      const strong=document.createElement('strong');strong.textContent=npc.name;
      const small=document.createElement('small');small.textContent=completed(npc)?'Clue collected ✓':!unlocked(npc)?`Follow ${characters[characters.indexOf(npc)-1].name}'s lead first`:nextLead()===npc?`NEXT LEAD · ${npc.subject}`:`${saved.progress[npc.id]} / 2 · ${npc.subject}`;
      details.append(strong,small); const mood=h('small',saved.relationships[npc.id]||'Ready to talk','relationship');details.append(mood);
      const mark=document.createElement('span');mark.className='quest-mark';mark.textContent=completed(npc)?'✓':nextLead()===npc?'★':unlocked(npc)?'→':'🔒';
      button.append(avatar,details,mark);
      button.addEventListener('click',()=>{
        if(modalOpen){closeIntro();} if(dialogue)closeDialogue();
        walkToNPC(npc);
      });
      list.appendChild(button);
    }
  }

  function setPortrait(npc){
    const p=document.getElementById('portrait');p.style.background=npc?.accent||'#bee2e7';
    const scale=2.05;
    pctx.clearRect(0,0,112,112);
    pctx.fillStyle=npc?.accent||'#c7e6e9';pctx.fillRect(0,0,112,112);
    pctx.fillStyle='#ffffff55'; for(let i=0;i<7;i++){pctx.fillRect((i*37)%112,(i*29)%112,10,4);}
    if(npc){drawCharacter(pctx,56,104,npc,scale,false);}
    else drawCharacter(pctx,56,104,{hair:'#252b5c',skin:'#e8b68a',outfit:'#4e7bc4',accent:'#fff6c8'},scale,true);
  }
  function h(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
  function resetPanel(){dialogueContent.replaceChildren();}
  function paragraph(s,cl=''){dialogueContent.append(h('p',s,cl));}
  function heading(name,title){dialogueContent.append(h('p',name,'speaker-name'));dialogueContent.append(h('h2',title));}
  function action(label,handler,secondary=false){const b=h('button',label+(label.includes('→')?'':'  →'),'dialogue-action'+(secondary?' secondary':''));b.type='button';b.addEventListener('click',handler);dialogueContent.append(b);}
  function talkTo(npc){
    if(modalOpen||player.move)return;
    route=[];routeTalk=null;
    // Face the other character before the DS-style camera moves in.
    const dx=npc.x-player.x,dy=npc.y-player.y;
    player.facing=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';
    encounterStarted=performance.now();
    dialogue={npc,mode:!unlocked(npc)?'locked':saved.turns[npc.id]?'branch':saved.pending[npc.id]?'repair':completed(npc)?'done':'greeting'};pressed.clear();
    drawDialogue();
    // Field-guide navigation can scroll the page below the game on phones.
    // Return the map to view as soon as an NPC conversation opens.
    if(window.matchMedia('(max-width: 680px)').matches)topScreen.scrollIntoView?.({behavior:'auto',block:'start'});
    renderNearby();
  }
  function closeDialogue(){
    dialogue?.comparison?.dispose();dialogue=null;pressed.clear();encounterStarted=0;
    topScreen.classList.remove('in-dialogue');dialoguePanel.setAttribute('aria-hidden','true');
    setPortrait(null);drawIdlePanel();renderNearby();canvas.focus({preventScroll:true});
  }
  function drawIdlePanel(){
    resetPanel();heading('YOUR ADVENTURE','Every conversation is a puzzle.');
    paragraph(scene==='town'?'Visit your neighbors. Step onto a glowing doorstep and press E, or select a name in your field guide.':`Explore ${rooms[scene].name.toLowerCase()}. Talk to your neighbor; the gold rug leads back outside.`);
    paragraph('Your words affect people. A misunderstanding is a chance to listen and repair.','dialogue-mini');
  }
  function drawDialogue(){
    if(!dialogue){drawIdlePanel();return;}
    const npc=dialogue.npc;
    topScreen.classList.add('in-dialogue');dialoguePanel.setAttribute('aria-hidden','false');
    overlaySpeaker.textContent=dialogue.mode==='comparison'?'DR. NOVA · COMPARISON DESK':`${npc.name.toUpperCase()} · ${npc.subject.toUpperCase()}`;
    overlayBody.scrollTop=0;
    setPortrait(npc);resetPanel();
    const phase=dialogue.mode;
    if(phase==='comparison'){drawComparison();return;}
    if(phase==='locked'){
      const lead=nextLead();
      heading(npc.name+' · INVESTIGATION','You need the previous clue first.');
      paragraph(`“I have part of the story,” ${npc.name} says, “but ${lead.name} has the next lead. Follow their trail and come back when the pieces connect.”`);
      paragraph('Every villager holds one distinct part of the same mystery. Follow the highlighted character in your Field Guide.','story-hint');
      action(`FIND ${lead.name.toUpperCase()}`,()=>{closeDialogue();walkToNPC(lead);});
      action('I’LL BE BACK',closeDialogue);
      return;
    }
    if(phase==='done'){
      heading(npc.name+' · FRIEND','Good to see you again!');paragraph(npc.done);
      paragraph(saved.repairs[npc.id]?'I remember how you listened when we misunderstood each other. Thanks for working through it with me.':'We made a good team. The town feels a little more connected now.','feedback');
      paragraph(`Badge collected: ${npc.badge}.`,'dialogue-mini');
      if(npc.id==='jules')action('PRACTICE TILES',()=>{dialogue.practice=true;dialogue.mode='question';drawDialogue();},true);
      if(npc.id==='nova'){
        action(saved.world.caseSolved?(saved.world.storyEnding?'READ OR CHANGE YOUR ENDING':'CHOOSE THE TOWN ANNOUNCEMENT'):'ASSEMBLE THE FIVE CLUES',()=>{if(saved.world.caseSolved){dialogue.mode='victory';drawDialogue();}else openCaseboard();});
        action('BLIND A/B DESK · OPTIONAL',openComparison,true);
      }
      action('BACK TO TOWN',closeDialogue);
      return;
    }
    if(phase==='greeting'){
      heading(npc.name+' · '+npc.role,'Hey there, explorer!');
      paragraph(npc.greeting);
      paragraph(`STORY · ${storyChapter()} · ${npc.subject}`,'dialogue-mini');
      if(npc.id!=='nova' && saved.progress[npc.id]===0)paragraph('Recover the book. Find out who the note was speaking to. Each witness knows a different part.','story-hint');
      if(npc.id==='nova')paragraph('The trail ends at Crate B. Check the book first; the note still needs an explanation.','story-hint');
      paragraph(`Conversation ${saved.progress[npc.id]+1} of ${npc.questions.length}`,'dialogue-mini');
      action('LET’S TALK',()=>{dialogue.mode='question';drawDialogue();});
      if(npc.id==='nova')action('BLIND A/B DESK · OPTIONAL',openComparison,true);
      return;
    }
    if(phase==='question'){
      if(npc.id==='jules'){drawPuzzle();return;}
      const st=stories[npc.id][saved.progress[npc.id]];
      heading(`${npc.name} · ${saved.relationships[npc.id]||'LISTENING'}`,npc.questions[saved.progress[npc.id]].title);
      if(st.context?.lines[saved.world[st.context.key]])paragraph(st.context.lines[saved.world[st.context.key]],'dialogue-mini');
      paragraph(st.line,'spoken-line');
      choiceButtons(st.replies,answerQuestion);
      action('PAUSE CONVERSATION',closeDialogue,true);
      return;
    }
    if(phase==='branch'){
      const turn=saved.turns[npc.id],node=stories[npc.id][turn.stage].branches[turn.node];
      heading(npc.name+' · YOUR CONVERSATION',npc.questions[turn.stage].title);
      paragraph(node.line,'spoken-line');
      paragraph('Different choices can work here. Decide what you want to do together.','dialogue-mini');
      choiceButtons(node.replies,answerBranch);action('PAUSE CONVERSATION',closeDialogue,true);return;
    }
    if(phase==='repair'){
      const st=stories[npc.id][saved.progress[npc.id]];
      heading(npc.name+' · MISUNDERSTANDING','The conversation needs repair.');
      paragraph(saved.pending[npc.id],'feedback wrong');paragraph(st.repair);
      if(dialogue.repairHint)paragraph(dialogue.repairHint,'dialogue-mini');
      choiceButtons(st.repairs,repairConversation);
      action('TAKE A BREATHER',closeDialogue,true);return;
    }
    if(phase==='feedback'){
      const q=dialogue.question;
      heading(npc.name+' · '+(dialogue.repaired?'UNDERSTOOD AGAIN':'CONNECTION MADE'),dialogue.repaired?'You repaired the conversation.':'The conversation moves forward.');
      paragraph(dialogue.reaction,'spoken-line');
      paragraph(dialogue.consequence,'feedback');
      dialogueContent.append(h('span',q.concept,'concept-tag'));
      const notes=h('details',undefined,'lesson-notes');notes.append(h('summary','Field note · concept and example'),h('p',q.explanation),h('p',q.prompt),h('p',q.discussion||q.choices[q.correct]));dialogueContent.append(notes);
      const bridge=stories[npc.id]?.[saved.progress[npc.id]-1]?.next;if(bridge)paragraph(bridge,'dialogue-mini');
      if(completed(npc)){
        const clue=storyClues.find(c=>c.id===npc.id);
        if(clue){
          paragraph(`✦ PUZZLE PIECE ${storyClues.indexOf(clue)+1}/${storyClues.length} · ${clue.short}`,'story-clue-reveal');
          paragraph(clue.text,'story-hint');
        }
        const next=nextAfter(npc);
        if(next){
          paragraph(`${npc.name}: “You have my piece. ${next.name} knows what happened next—take this clue to them!”`,'spoken-line');
          action(`FOLLOW THE LEAD → ${next.name.toUpperCase()}`,()=>{closeDialogue();walkToNPC(next);});
        }
        if(storyClues.every(c=>saved.progress[c.id]>=2))paragraph('All five clues are collected. Reconstruct the disappearance at Nova’s caseboard.','story-hint');
      }
      if(completed(npc))action(npc.id==='nova'?'THE FINAL SCENE':'KEEP THE CLUE & EXPLORE',advance);
      else action('CONTINUE CONVERSATION',advance);
      return;
    }
    if(phase==='caseboard'){
      if(dialogue.caseStep>=caseQuestions.length){dialogue.mode='victory';drawDialogue();return;}
      const q=caseQuestions[dialogue.caseStep];
      heading('DR. NOVA · RECONSTRUCTION DESK',`Reconstruct the disappearance · ${dialogue.caseStep+1}/${caseQuestions.length}`);
      paragraph('Trace the book from the stand to the lab, then explain the note. Use the clues in your Field Guide if you need them.','story-hint');
      const found=storyClues[dialogue.caseStep];
      paragraph(`✦ ${found.title}`,'story-clue-reveal');
      paragraph(q.question,'spoken-line');
      if(dialogue.caseHint)paragraph(dialogue.caseHint,'feedback wrong');
      choiceButtons(q.options,solveCase);
      paragraph('This is a deduction puzzle about the story, not a score for naturalness or AI authorship.','dialogue-mini');
      action('PAUSE RECONSTRUCTION',closeDialogue,true);
      return;
    }
    if(phase==='victory'){
      if(!saved.world.caseSolved){openCaseboard();return;}
      heading('CHAPTER III · THE VOICE BEHIND THE NOTE','No stolen voices. Forty rescued stories.');
      paragraph("Nova sets the red book beside the cue card. ‘Rehearsal left a villain’s line on the stand. Then rain hit. Theo warned Lin; Lin sent the rescued book through Jules to my dry lab. The card and the empty stand looked like one event. Our records show two.’",'spoken-line');
      paragraph('You carry the book back to the square. Leila is waiting beside the empty stand. What will you tell everyone?','story-hint');
      choiceButtons(finalAnnouncements.map(c=>`${c.title}: ${c.message}`),chooseEnding);
      paragraph('All three messages are viable. Style changes how different audiences may receive the news; there is no single “most human” answer.','dialogue-mini');
      action('BLIND A/B DESK · OPTIONAL',openComparison,true);
      action('BACK TO THE SQUARE',closeDialogue,true);
      return;
    }
    if(phase==='epilogue'){
      const ending=finalAnnouncements.find(c=>c.tone===saved.world.storyEnding)||finalAnnouncements[0];
      heading('EPILOGUE · THE NIGHT OF VOICES','The stories begin. ✦');
      paragraph(`Your announcement: “${ending.message}”`,'spoken-line');
      paragraph(ending.ending,'story-hint');
      const touches=[];
      if(saved.world.cafeStyle==='quiet')touches.push('Mina saves a quiet café table for guests who want a moment away from the crowd.');
      if(saved.world.cafeStyle==='playful')touches.push('Mina raises her cup for a pre-festival toast with Leila.');
      if(saved.world.classroomComfort==='sunny')touches.push('Professor Lin files the rescued delivery slip on the sheltered table.');
      if(saved.world.classroomComfort==='window')touches.push('Professor Lin pins the delivery slip beside the secured window.');
      if(saved.world.libraryHelp==='map')touches.push('Theo posts an easy-to-follow map so nobody misses Story Night.');
      if(saved.world.libraryHelp==='escort')touches.push('Theo walks late guests from the library to the square.');
      if(touches.length)paragraph(touches.join(' '));
      paragraph('The actor playing the Voice Thief steps up: ‘Tonight, your voice is mine.’ This time the chorus answers: ‘Then we’ll tell our stories together.’ Leila laughs. Same words. Now everyone knows the scene.','feedback');
      action('TRY ANOTHER ANNOUNCEMENT',()=>{dialogue.mode='victory';drawDialogue();});
      action('EXPLORE AFTER THE FESTIVAL',closeDialogue,true);
      action('BLIND A/B DESK · OPTIONAL',openComparison,true);
      return;
    }
  }
  function chooseEnding(i){
    if(dialogue?.mode!=='victory'||!finalAnnouncements[i])return;
    saved.world.storyEnding=finalAnnouncements[i].tone;
    saved.memories.push(`Story Night: The town reunited through ${finalAnnouncements[i].title.toLowerCase()}.`);
    saved.memories=saved.memories.slice(-5);
    persist();renderJournal();dialogue.mode='epilogue';drawDialogue();
    announce('✦ STORY NIGHT IS BACK!');
  }
  function choiceButtons(choices,handler){
    const group=h('div',undefined,'choice-grid');
    choices.forEach((text,i)=>{const b=h('button',`${i+1}. ${text}`,'choice-button');b.type='button';b.addEventListener('click',()=>handler(i));group.append(b);});dialogueContent.append(group);
  }
  function finishExchange(reaction,consequence,repaired=false,effect={}){
    const npc=dialogue.npc;dialogue.question=npc.questions[saved.progress[npc.id]];
    dialogue.reaction=reaction;dialogue.consequence=consequence;dialogue.repaired=repaired;dialogue.mode='feedback';
    saved.progress[npc.id]++;delete saved.pending[npc.id];delete saved.turns[npc.id];
    Object.assign(saved.world,effect);
    saved.relationships[npc.id]=repaired?'Trust restored': 'In sync';
    if(repaired)saved.repairs[npc.id]=(saved.repairs[npc.id]||0)+1;
    saved.memories.push(`${npc.name}: ${consequence}`);saved.memories=saved.memories.slice(-5);
    persist();renderJournal();drawDialogue();
    if(completed(npc))announce(`✦ ${npc.badge} · BADGE EARNED!`);
  }
  function applyRoute(route,repaired=false){
    if(!route)return;
    const npc=dialogue.npc,st=stories[npc.id][saved.progress[npc.id]];
    if(route.branch){
      saved.turns[npc.id]={stage:saved.progress[npc.id],node:route.branch,repaired};
      delete saved.pending[npc.id];saved.relationships[npc.id]='Talking it through';
      dialogue.mode='branch';persist();renderJournal();drawDialogue();
    }else if(route.outcome){const o=route.outcome;finishExchange(o.reaction,o.consequence,repaired,o.effect);}
    else if(route.hint){dialogue.repairHint=route.hint;drawDialogue();}
  }
  function answerQuestion(i){
    if(!dialogue||dialogue.mode!=='question'||dialogue.npc.id==='jules')return;
    const npc=dialogue.npc,st=stories[npc.id][saved.progress[npc.id]],route=st.routes[i];
    if(!route)return;
    if(route.repair){saved.pending[npc.id]=st.reaction[i];saved.relationships[npc.id]='Needs repair';dialogue.mode='repair';persist();renderJournal();drawDialogue();}
    else applyRoute(route);
  }
  function answerBranch(i){
    if(!dialogue||dialogue.mode!=='branch')return;
    const turn=saved.turns[dialogue.npc.id],node=stories[dialogue.npc.id][turn.stage].branches[turn.node],o=node.outcomes[i];
    if(o)finishExchange(o.reaction,o.consequence,!!turn.repaired,o.effect);
  }
  function repairConversation(i){
    if(!dialogue||dialogue.mode!=='repair')return;
    applyRoute(stories[dialogue.npc.id][saved.progress[dialogue.npc.id]].repairRoutes[i],true);
  }
  function openComparison(){
    if(!dialogue||dialogue.npc.id!=='nova'||!unlocked(dialogue.npc))return;
    dialogue.returnMode=dialogue.mode;dialogue.comparison=window.LinguaComparisons.createSession();dialogue.mode='comparison';drawDialogue();
  }
  function exitComparison(){
    dialogue.comparison.dispose();delete dialogue.comparison;dialogue.mode=dialogue.returnMode;delete dialogue.returnMode;drawDialogue();
  }
  function chooseComparison(i){
    if(dialogue?.mode!=='comparison')return;
    const option=dialogue.comparison.view().choices[i];
    if(option&&dialogue.comparison.choose(option.id))drawDialogue();
  }
  function drawComparison(){
    const view=dialogue.comparison.view();
    heading(`DR. NOVA · BLIND A/B DESK · ${view.pair}/${view.total}`,view.title);
    paragraph('Optional teaching demo · no score · judgments are not saved or sent. Closing the desk clears them.','comparison-notice');
    paragraph('These are constructed practice messages with no verified human/AI source labels. A and B are presentation positions, not author identities.','dialogue-mini');
    paragraph(view.context,'spoken-line');
    const cards=h('div',undefined,'comparison-cards');
    for(const card of view.cards){const article=h('section',undefined,'writing-card');article.setAttribute('aria-label','Message '+card.label);article.append(h('h3','MESSAGE '+card.label),h('p',card.text));cards.append(article);}dialogueContent.append(cards);
    if(view.dimension){
      paragraph(view.dimension.label,'concept-tag');paragraph(view.dimension.prompt);
      choiceButtons(view.choices.map(c=>c.label),chooseComparison);
      paragraph('Use 1–4, or choose a button. Equal and unsure are valid responses.','dialogue-mini');
    }else{
      const list=h('dl',undefined,'comparison-summary');
      for(const row of view.summary)list.append(h('dt',row.label),h('dd',row.value));dialogueContent.append(list);
      paragraph('Nova puts three separate cards on the desk. “These can agree or differ. Finding a message natural, liking it, and suspecting AI authorship are different judgments. None of your choices is marked wrong.”','spoken-line');
      paragraph(view.note);
      paragraph('Nova leaves the source labels blank. “There is no verified authorship answer key for these practice samples. A stylistic impression does not establish who wrote a message.”','feedback');
      if(view.hasNext)action('COMPARE ANOTHER CONTEXT',()=>{dialogue.comparison.next();drawDialogue();});
    }
    action('CLOSE DESK & CLEAR JUDGMENTS',exitComparison,true);
  }
  function advance(){
    if(modalOpen){closeIntro();return;}
    if(!dialogue){interact();return;}
    if(dialogue.mode==='greeting'){dialogue.mode='question';drawDialogue();}
    else if(dialogue.mode==='feedback'){
      if(completed(dialogue.npc)){
        if(dialogue.npc.id==='nova'){if(saved.world.caseSolved){dialogue.mode='victory';drawDialogue();}else openCaseboard();}else closeDialogue();
      } else {dialogue.mode='question';delete dialogue.tiles;drawDialogue();}
    }else if(['done','locked','victory','epilogue','caseboard'].includes(dialogue.mode))closeDialogue();
  }
  // Resolve two ambiguous records to identify the courier and the destination crate.
  function drawPuzzle(){
    const stage=dialogue.practice?0:saved.progress.jules, first=stage===0;
    if(!dialogue.tiles)dialogue.tiles=first?['carried the lantern','I followed','who','the courier']:['new masks','share the crate','and','old scripts'];
    heading('JULES · EVIDENCE WORKBENCH',first?'Who carried the lantern?':'Which crate should Nova open?');
    paragraph(first?"Jules wrote: ‘I followed the courier with the lantern.’ It could mean Jules used the lantern, or the courier carried it. Jules confirms: ‘The courier had it. I followed their light.’ Build a sentence with ‘who’ that makes the carrier explicit.":"The delivery label says ‘old scripts and masks’. Crate A has old scripts + old masks. Crate B has old scripts + new masks. Jules checks his packing record: ‘The masks were NEW. I put the blue bundle in that crate and sent it to Nova.’ Rewrite the label to identify it.");
    paragraph('Drag a tile, tap two tiles to swap, or focus a tile and press Alt + ← / →.','dialogue-mini');
    const tray=h('div',undefined,'word-tray');tray.setAttribute('aria-label','Evidence phrase tiles');
    dialogue.tiles.forEach((word,i)=>{
      const tile=h('button',word,'word-tile'+(dialogue.selected===i?' selected':''));tile.type='button';tile.draggable=true;tile.setAttribute('aria-label',`Tile ${i+1}: ${word}`);tile.setAttribute('aria-pressed',String(dialogue.selected===i));
      tile.addEventListener('click',()=>{if(dialogue.selected===undefined){dialogue.selected=i;drawDialogue();}else{const a=dialogue.selected;delete dialogue.selected;[dialogue.tiles[a],dialogue.tiles[i]]=[dialogue.tiles[i],dialogue.tiles[a]];drawDialogue();}focusTile(i);});
      tile.addEventListener('dragstart',ev=>{ev.dataTransfer.setData('text/plain',String(i));ev.dataTransfer.effectAllowed='move';});
      tile.addEventListener('dragover',ev=>ev.preventDefault());
      tile.addEventListener('drop',ev=>{ev.preventDefault();const raw=ev.dataTransfer.getData('text/plain');if(!/^\d+$/.test(raw))return;const from=Number(raw);if(from>=dialogue.tiles.length)return;moveTile(from,i);});
      tile.addEventListener('keydown',ev=>{if(ev.altKey&&['ArrowLeft','ArrowRight'].includes(ev.key)){ev.preventDefault();ev.stopPropagation();moveTile(i,Math.max(0,Math.min(dialogue.tiles.length-1,i+(ev.key==='ArrowLeft'?-1:1))));}});
      tray.append(tile);
    });dialogueContent.append(tray);
    const sentence=dialogue.tiles.join(' ');
    const solved=first?sentence==='I followed the courier who carried the lantern':['old scripts and new masks share the crate','new masks and old scripts share the crate'].includes(sentence);
    const reading=first?(solved?'The courier carried the lantern. Follow that person’s route to Jules’s stall.':'Use “who” directly after the person it describes; finish with what that person carried.'):(solved?'Crate B: old scripts + NEW masks. Nova has this crate and the blue bundle.':'Both crates fit a possible reading of “old scripts and masks”. Specify the age of each group, then say they share the crate.');
    paragraph('INTERPRETATION · '+reading,'meaning-preview');
    if(dialogue.puzzleHint)paragraph(dialogue.puzzleHint,'feedback wrong');
    action('SHOW JULES',()=>{
      if(solved&&dialogue.practice){announce('Delivery evidence clarified! Your clues remain collected.');closeDialogue();return;}
      if(solved){const q=characters[3].questions[stage];finishExchange(q.success,first?'Jules followed the lantern-carrying courier to the covered stall.':'Jules sent Crate B—old scripts, new masks, blue bundle—to Nova. Follow that delivery.');}
      else {dialogue.puzzleHint='Jules: “Match the confirmed details, and keep the sentence grammatical. You can swap any two tiles.”';drawDialogue();}
    });action('PAUSE PUZZLE',closeDialogue,true);
  }
  function focusTile(i){dialogueContent.querySelectorAll('.word-tile')[i]?.focus();}
  function moveTile(from,to){const [tile]=dialogue.tiles.splice(from,1);dialogue.tiles.splice(to,0,tile);delete dialogue.selected;delete dialogue.puzzleHint;drawDialogue();focusTile(to);}
  function nearestNPC(){
    const nearby=sceneNPCs().filter(n=>Math.abs(n.x-player.x)+Math.abs(n.y-player.y)<=1);
    return nearby.length?nearby[0]:null;
  }
  function renderNearby(){
    const n=(!dialogue&&!modalOpen)?nearestNPC():null;
    const door=!dialogue&&!modalOpen?doorHere():null;
    nearbyTip.textContent=n?`[ E ] TALK TO ${n.name.toUpperCase()}`:door?`[ E ] ${door==='town'?'BACK TO TOWN':'ENTER '+rooms[door].name}`:'';
    nearbyTip.classList.toggle('active',!!n||!!door);
  }
  function interact(){
    if(modalOpen||player.move)return;
    const n=nearestNPC();
    if(n)talkTo(n);else if(doorHere())changeScene(doorHere());else announce('Walk next to a character or onto a glowing doorstep.');
  }
  function tryStep(d){
    if(dialogue||modalOpen||player.move)return false;
    player.facing=d;
    const [dx,dy]=dirs[d];const x=player.x+dx,y=player.y+dy;
    if(!walkable(x,y))return false;
    player.move={sx:player.x,sy:player.y,tx:x,ty:y,start:performance.now(),duration:142};
    player.x=x;player.y=y;return true;
  }
  function routeTo(x,y,allowAdjacent=false){
    const targets=[];
    if(allowAdjacent){for(const [dx,dy] of Object.values(dirs))if(walkable(x+dx,y+dy))targets.push(key(x+dx,y+dy));}
    else if(walkable(x,y))targets.push(key(x,y));
    if(!targets.length)return null;
    const goal=new Set(targets);const start=key(player.x,player.y);
    const queue=[[player.x,player.y]];const seen=new Set([start]);const parent=new Map();
    let head=0,found=null;
    while(head<queue.length){
      const [cx,cy]=queue[head++];const ck=key(cx,cy);
      if(goal.has(ck)){found=ck;break;}
      for(const [d,[dx,dy]] of Object.entries(dirs)){
        const nx=cx+dx,ny=cy+dy,nk=key(nx,ny);
        if(!walkable(nx,ny)||seen.has(nk))continue;
        seen.add(nk);parent.set(nk,[ck,d]);queue.push([nx,ny]);
      }
    }
    if(!found)return null;
    const steps=[];
    while(found!==start){const info=parent.get(found);if(!info)break;steps.push(info[1]);found=info[0];}
    return steps.reverse();
  }
  function walkToNPC(npc){
    if(modalOpen||dialogue)return;
    routeEnter=null;travelTarget=null;
    if(npc.scene!==scene){
      travelTarget=npc;const destination=scene==='town'?rooms[npc.scene].door:[12,16];
      const steps=routeTo(...destination);if(steps===null){travelTarget=null;announce('Could not find a path to that door.');return;}
      route=steps;routeEnter=scene==='town'?npc.scene:'town';routeTalk=null;
      if(!route.length&&!player.move){const next=routeEnter;routeEnter=null;changeScene(next);}return;
    }
    if(Math.abs(npc.x-player.x)+Math.abs(npc.y-player.y)<=1&&!player.move){talkTo(npc);return;}
    const steps=routeTo(npc.x,npc.y,true);
    if(steps===null){announce('Could not find a path there.');return;}
    route=steps;routeTalk=npc;
    if(!route.length&&!player.move){const n=routeTalk;routeTalk=null;talkTo(n);}
    else announce(`HEADING TO ${npc.name.toUpperCase()}...`);
  }
  function onMapClick(ev){
    if(modalOpen||dialogue)return;
    const r=canvas.getBoundingClientRect();const x=Math.floor((ev.clientX-r.left)/r.width*W);const y=Math.floor((ev.clientY-r.top)/r.height*H);
    const door=scene==='town'?Object.entries(rooms).find(([,r])=>r.door[0]===x&&r.door[1]===y)?.[0]:(x===12&&y===16?'town':null);
    routeEnter=null;travelTarget=null;
    if(door){const steps=routeTo(x,y);if(steps){route=steps;routeEnter=door;routeTalk=null;}return;}
    const npc=npcAt(x,y);
    if(npc){walkToNPC(npc);return;}
    const steps=routeTo(x,y,false);
    if(steps){route=steps;routeTalk=null;}
    else announce('Choose an open tile or tap a character.');
    canvas.focus({preventScroll:true});
  }
  function closeIntro(){document.querySelector('.shell').inert=false;introModal.classList.add('hidden');modalOpen=false;saved.started=true;saved.world.storyIntroSeen=true;persist();renderNearby();canvas.focus({preventScroll:true});}
  function showIntro(){document.querySelector('.shell').inert=true;modalOpen=true;pressed.clear();introModal.classList.remove('hidden');document.getElementById('startBtn').focus();}
  document.getElementById('startBtn').addEventListener('click',closeIntro);
  document.getElementById('helpBtn').addEventListener('click',showIntro);
  document.getElementById('talkBtn').addEventListener('click',advance);
  document.getElementById('closeDialogueBtn').addEventListener('click',closeDialogue);
  document.getElementById('leaveRoomBtn').addEventListener('click',()=>{if(dialogue)closeDialogue();travelTarget=null;route=routeTo(12,16)||[];routeEnter='town';});
  document.getElementById('restartBtn').addEventListener('click',()=>{
    if(!window.confirm('Start a new game and clear all earned badges on this device?'))return;
    for(const n of characters)saved.progress[n.id]=0;
    saved.relationships={};saved.repairs={};saved.pending={};saved.turns={};saved.world={};saved.started=false;saved.memories=[];travelTarget=null;routeEnter=null;
    if(scene!=='town')changeScene('town');
    persist();renderJournal();route=[];routeTalk=null;player.x=player.px=12;player.y=player.py=12;player.move=null;closeDialogue();showIntro();announce('NEW STORY STARTED!');
  });
  window.addEventListener('keydown',ev=>{
    const keyName=ev.key;
    if(ev.target.closest?.('button, input, textarea, select, summary')&&['Enter',' ','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(keyName))return;
    if(modalOpen&&keyName==='Tab'){ev.preventDefault();document.getElementById('startBtn').focus();return;}
    if(modalOpen){if(keyName==='Escape'){closeIntro();}else if(keyName==='Enter'){ev.preventDefault();closeIntro();}return;}
    if(dialogue?.mode==='caseboard'&&['1','2','3'].includes(keyName)){ev.preventDefault();if(!ev.repeat)solveCase(Number(keyName)-1);return;}
    if(dialogue?.mode==='victory'&&['1','2','3'].includes(keyName)){ev.preventDefault();if(!ev.repeat)chooseEnding(Number(keyName)-1);return;}
    if(dialogue?.mode==='comparison'&&['1','2','3','4'].includes(keyName)){ev.preventDefault();if(!ev.repeat)chooseComparison(Number(keyName)-1);return;}
    if(dialogue?.mode==='branch'&&['1','2','3'].includes(keyName)){ev.preventDefault();if(!ev.repeat)answerBranch(Number(keyName)-1);return;}
    if(dialogue&&dialogue.mode==='repair'&&['1','2','3'].includes(keyName)){ev.preventDefault();if(!ev.repeat)repairConversation(Number(keyName)-1);return;}

    if(keyName in keydirs){ev.preventDefault();pressed.add(keydirs[keyName]);if(!ev.repeat){route=[];routeTalk=null;routeEnter=null;travelTarget=null;tryStep(keydirs[keyName]);}return;}
    if(['e','E','Enter',' '].includes(keyName)){ev.preventDefault();if(!ev.repeat)advance();return;}
    if(dialogue&&dialogue.mode==='question'&&['1','2','3'].includes(keyName)){ev.preventDefault();answerQuestion(Number(keyName)-1);return;}
    if(ev.key==='Escape'&&dialogue){if(dialogue.mode==='comparison')exitComparison();else closeDialogue();}
  });
  window.addEventListener('keyup',ev=>{if(ev.key in keydirs)pressed.delete(keydirs[ev.key]);});
  window.addEventListener('blur',()=>pressed.clear());
  canvas.addEventListener('click',onMapClick);
  canvas.addEventListener('mousemove',ev=>{const r=canvas.getBoundingClientRect();pointerCell=[Math.floor((ev.clientX-r.left)/r.width*W),Math.floor((ev.clientY-r.top)/r.height*H)];});
  canvas.addEventListener('mouseleave',()=>pointerCell=null);
  for(const btn of document.querySelectorAll('[data-direction]')){
    const dir=btn.dataset.direction;
    btn.addEventListener('pointerdown',ev=>{ev.preventDefault();route=[];routeTalk=null;routeEnter=null;travelTarget=null;pressed.add(dir);tryStep(dir);});
    for(const ev of ['pointerup','pointercancel','pointerleave'])btn.addEventListener(ev,()=>pressed.delete(dir));
  }

  // ------- Original canvas pixel art (no copyrighted sprites/assets) -------
  const fill=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.floor(x),Math.floor(y),w,h);};
  function hash(x,y){let n=(x*12879+y*78263+51513)|0;n=((n^(n>>>13))*1274126177)|0;return(n^(n>>>16))>>>0;}
  function path(x,y){return (y>=8&&y<=10)||(x>=12&&x<=13)||(x>=4&&x<=6&&y>=6&&y<=13)||(x>=20&&x<=22&&y>=6&&y<=13);}
  // The town is lit for Story Night: an original midnight-blue pixel palette.
  const night={grass:'#243b45',grass2:'#2c4750',path:'#405064',pave:'#53647a',ink:'#101a32',gold:'#f7d18a',glow:'#fff0bd'};
  function drawGround(){
    fill(0,0,W*T,H*T,night.grass);
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){
      const px=x*T,py=y*T,n=hash(x,y),onPath=path(x,y);
      if(onPath){
        fill(px,py,T,T,(x+y)%3===0?'#394b60':'#405168');
        // Hand-laid moonlit cobbles, staggered and slightly uneven.
        fill(px+1,py+2,18,12,'#4e6075');fill(px+20,py+3,10,12,'#52657a');
        fill(px+3,py+17,10,12,'#4b5c72');fill(px+15,py+17,15,12,'#4b5e73');
        fill(px+1,py+15,29,2,'#293c50');fill(px+18,py+2,2,13,'#293c50');
        fill(px+12,py+17,2,13,'#2c3d52');
        if(n%6===0)fill(px+19,py+22,3,2,'#6e7889');
      }else{
        fill(px,py,T,T,(x+y)%4===0?night.grass2:night.grass);
        const gx=(n%21)+4,gy=((n>>>4)%20)+5;
        fill(px+gx,py+gy,3,7,'#3c6462');fill(px+gx+4,py+gy+2,2,5,'#46766b');
        fill(px+((n>>>8)%20)+4,py+((n>>>13)%21)+3,5,2,'#314f55');
        if(n%13===0){fill(px+21,py+9,3,3,'#ad91a7');fill(px+19,py+12,3,3,'#d9b7c5');}
      }
    }
    // Worn paving around the fountain, with scattered cracks and moss.
    for(let y=7;y<=11;y++)for(let x=10;x<=15;x++){
      if((x>=12&&x<=13)||(y>=8&&y<=10))continue;
      let px=x*T,py=y*T;
      fill(px,py,T,T,(x+y)%2?'#485e67':'#50656c');
      fill(px+2,py+2,27,2,'#60737c');fill(px+14,py+16,2,14,'#334b54');
      if((x+y)%3===0){fill(px+5,py+25,5,2,'#41676c');fill(px+7,py+21,2,5,'#41676c');}
    }
    // Deep koi pond: little light flecks are visible in the midnight water.
    for(let y=0;y<=3;y++)for(let x=0;x<=1;x++){
      let px=x*T,py=y*T;
      fill(px,py,T,T,'#163a4b');fill(px+2,py+4,28,2,'#2b6070');
      fill(px+5,py+13,13,3,'#408090');fill(px+18,py+24,9,2,'#337b86');
      if((x+y)%2===0){fill(px+10,py+9,5,2,'#8bbcc1');fill(px+22,py+17,3,3,'#daaba0');}
    }
  }

    function drawBuilding(x,y,w,h,kind,roof,trim){
    const px=x*T,py=y*T,pw=w*T,ph=h*T,lab=kind==='LINGO LAB', library=kind==='LIBRARY';
    // Foundation and dark-mortar brickwork.
    fill(px+9,py+17,pw-2,ph-6,'#14273a');
    fill(px+5,py+38,pw-10,ph-39,lab?'#38445c':library?'#41546a':'#4c4b5b');
    for(let yy=69;yy<ph;yy+=13){
      fill(px+9,py+yy,pw-18,2,'#2a354b');
      for(let xx=18+(Math.floor(yy/13)%2)*15;xx<pw-14;xx+=36)fill(px+xx,py+yy-11,2,10,'#353c50');
    }
    // Triple-tier roof with individual slate shingles and metallic ridge.
    fill(px,py+7,pw,60,'#15283e');fill(px+4,py+8,pw-8,46,roof);
    fill(px+9,py+12,pw-18,3,trim);
    for(let ry=20;ry<53;ry+=10){
      fill(px+7,py+ry,pw-14,2,'#1b2d44');
      for(let rx=9+(ry%20?9:0);rx<pw-13;rx+=23)fill(px+rx,py+ry+3,2,7,'#203047');
    }
    fill(px+1,py+54,pw-2,9,'#16283f');fill(px+6,py+59,pw-12,4,trim);
    fill(px+7,py+66,pw-14,7,'#1f3046');
    // Window halos sit *behind* the warm panes and stone frames.
    for(const wx of [px+20,px+pw-58]){
      fill(wx-7,py+78,52,44,'#bc7e4360');
      fill(wx-3,py+80,47,39,'#26354a');
      fill(wx+2,py+84,37,30,lab?'#7ccbcc':'#f3bd76');
      fill(wx+4,py+86,33,7,lab?'#b0f1e9':'#ffdeb1');
      fill(wx+19,py+84,4,30,'#384159');fill(wx+2,py+99,37,3,'#384159');
      fill(wx+29,py+105,5,5,lab?'#3d929a':'#b27758');
      fill(wx-3,py+116,47,5,'#29364a');
    }
    // Brass signs and a readable, illuminated front entrance.
    fill(px+pw/2-32,py+65,64,23,'#1b263b');
    fill(px+pw/2-29,py+67,58,19,'#4d4c66');
    ctx.fillStyle='#ffe3a2';ctx.font='bold 11px monospace';ctx.textAlign='center';
    ctx.fillText(kind,px+pw/2,py+80);ctx.textAlign='start';
    fill(px+pw/2-27,py+94,54,ph-94,'#1d2b42');
    fill(px+pw/2-22,py+98,44,ph-98,lab?'#51687f':'#66546a');
    fill(px+pw/2-17,py+102,32,ph-103,'#243852');
    fill(px+pw/2+12,py+113,4,5,'#f7d18a');
    fill(px+pw/2-29,py+92,58,3,'#9a7b5c');
    // Doorway lanterns; each creates a legible warm focal point.
    for(const side of [-1,1]){
      let lx=px+pw/2+side*41;
      fill(lx-4,py+88,8,4,'#243248');fill(lx-2,py+91,4,11,'#9c795e');
      fill(lx-4,py+96,8,8,'#ffda83');fill(lx-6,py+94,12,2,'#f5d89f');
      fill(lx-8,py+93,16,18,'#ffcc6230');
    }
    // Distinctive identity details make buildings feel inhabited.
    if(kind==='CAFÉ'){
      fill(px+15,py+73,15,4,'#cc8b75');fill(px+pw-29,py+73,15,4,'#cc8b75');
      fill(px+13,py+122,19,8,'#42615d');fill(px+16,py+116,13,9,'#5a957d');
    }else if(library){
      fill(px+19,py+68,12,4,'#8aa4b8');fill(px+pw-33,py+68,12,4,'#8aa4b8');
      fill(px+26,py+90,8,18,'#a36152');fill(px+pw-36,py+90,7,17,'#628293');
    }else if(lab){
      fill(px+pw/2-7,py+21,14,17,'#a9e5dc');fill(px+pw/2-2,py+17,4,27,'#a9e5dc');
      fill(px+14,py+69,6,6,'#86d8cf');fill(px+pw-20,py+69,6,6,'#86d8cf');
    }else{
      fill(px+17,py+70,6,7,'#d1b88b');fill(px+pw-23,py+70,6,7,'#d1b88b');
    }
  }

    function drawFountain(time){
    const x=12*T,y=8*T;
    fill(x-13,y+9,94,68,'#263c55');fill(x-11,y+7,90,60,'#73818c');
    fill(x-8,y+12,84,49,'#1b4558');fill(x+3,y+17,62,38,'#206276');
    fill(x+12,y+20,46,33,'#357d8f');fill(x+20,y+13,27,39,'#618f9d');
    fill(x+27,y-4,12,35,'#a5b3b6');fill(x+24,y+8,19,6,'#d5d9cb');
    const wave=reducedMotion?0:Math.sin(time/600)*2;
    fill(x+14,y+31+wave,8,3,'#b6e4dc');fill(x+52,y+34-wave,6,3,'#c9f2e8');
    fill(x+24,y+40,17,2,'#8ccbcc');fill(x-3,y+60,73,6,'#344a60');
    // Nighttime coins and caustic sparkle.
    if((Math.floor(time/700)%3)!==0||reducedMotion)fill(x+45,y+21,3,3,'#f6c989');
  }
  function drawTree(x,y){
    const px=x*T,py=y*T;
    fill(px+12,py+21,10,24,'#393f4b');fill(px+15,py+23,4,17,'#776757');
    fill(px-5,py+10,45,24,'#193c42');fill(px-1,py+2,41,27,'#245048');
    fill(px+3,py-8,33,33,'#2b5b50');fill(px+8,py-12,24,25,'#386b5b');
    fill(px+7,py-3,10,6,'#568476');fill(px+22,py+5,9,5,'#427c66');
    fill(px+2,py+17,12,5,'#1b3f40');fill(px+28,py+20,8,4,'#1c4540');
    if(hash(x,y)%3===0){fill(px+21,py-7,4,3,'#739489');fill(px+27,py+14,3,3,'#749489');}
  }
  function drawBench(x,y){
    let px=x*T,py=y*T;fill(px,py+22,35,8,'#1c3345');
    fill(px+1,py+10,33,9,'#66545c');fill(px+3,py+11,29,4,'#b2917a');
    fill(px+5,py+19,4,13,'#314258');fill(px+27,py+19,4,13,'#314258');
    fill(px+2,py+15,31,2,'#c1a88c');
  }
  function drawStand(x,y){
    let px=x*T,py=y*T;
    fill(px-5,py+17,44,22,'#2c3549');fill(px-2,py+21,39,15,'#8e6571');
    fill(px-8,py+5,50,13,'#2b3853');
    for(let i=0;i<5;i++)fill(px-6+i*10,py+7,9,10,i%2?'#9b6988':'#ddad88');
    fill(px+3,py+23,8,7,'#edb26d');fill(px+15,py+22,7,8,'#8bbc8f');fill(px+25,py+22,6,8,'#d88c8d');
    fill(px+1,py+16,34,2,'#e4bd90');
  }
  function drawSign(x,y,text){
    let px=x*T,py=y*T;fill(px+14,py+13,4,23,'#604957');
    fill(px-14,py,62,23,'#18273f');fill(px-11,py+3,56,17,'#ddc49e');
    ctx.fillStyle='#314158';ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillText(text,px+17,py+15);ctx.textAlign='start';
  }
  function drawStreetLamp(x,y,time){
    const px=x*T+16,py=y*T+10,pulse=reducedMotion?0:Math.sin(time/420+x)*.08;
    const glow=ctx.createRadialGradient?.(px,py,2,px,py,64);
    if(glow){
      glow.addColorStop(0,`rgba(255,205,119,${.20+pulse})`);
      glow.addColorStop(.42,'rgba(255,199,103,.095)');glow.addColorStop(1,'rgba(255,177,96,0)');
      ctx.fillStyle=glow;ctx.fillRect(px-64,py-64,128,128);
    }
    fill(px-2,py+3,4,27,'#1c2a42');fill(px-5,py+29,10,4,'#6e6570');
    fill(px-6,py-3,12,10,'#ffda8e');fill(px-4,py-1,8,6,'#fff3bc');
    fill(px-8,py-5,16,3,'#384058');fill(px-5,py-9,10,4,'#637181');
  }
  function drawFireflies(time){
    // Deterministic, motion-reduced, noninteractive atmosphere.
    for(let i=0;i<29;i++){
      const n=hash(i,917),x=18+n%(W*T-36),y=54+((n>>>9)%(H*T-98));
      const phase=reducedMotion?0:Math.sin(time/720+i*2.7);
      const opacity=reducedMotion?.55:.2+.42*(phase*.5+.5);
      const fx=x+(reducedMotion?0:Math.sin(time/1100+i)*3),fy=y+(reducedMotion?0:Math.cos(time/1300+i)*4);
      fill(fx-2,fy-2,8,8,`rgba(254,207,132,${(opacity*.13).toFixed(3)})`);
      fill(fx,fy,3,3,`rgba(255,233,169,${opacity.toFixed(3)})`);
    }
  }
  function drawStoryFestival(time){
    const isSaved=!!saved.world.storyEnding;
    const left=9*T,right=17*T,y=2*T+10;
    fill(left,y,right-left,3,'#82768a');
    for(let i=0;i<12;i++){
      const x=left+i*21,color=['#b26d87','#e2ae75','#70aeaa','#8e79ad'][i%4];
      fill(x,y+4,16,10,isSaved?color:'#55516b');
      fill(x+4,y+14,8,5,isSaved?color:'#55516b');
      // String bulbs appear lit after your final announcement.
      fill(x+7,y-3,4,4,isSaved?'#ffdf95':'#756b78');
      if(isSaved)fill(x+4,y-5,10,9,'#ffd98940');
    }
    const sx=15*T,sy=11*T+4;
    fill(sx+29,sy+36,7,18,'#7a5f57');
    fill(sx,sy,66,39,'#1e2c43');fill(sx+4,sy+4,58,31,isSaved?'#f7d7a6':'#d3beb2');
    ctx.fillStyle=isSaved?'#325c54':'#815963';ctx.font='bold 9px monospace';ctx.textAlign='center';
    ctx.fillText(isSaved?'BOOK HOME':'MISSING',sx+33,sy+17);
    ctx.fillText(isSaved?'40 / 40':'RED BOOK',sx+33,sy+29);ctx.textAlign='start';
    if(isSaved){
      for(const [x,y,col] of [[9,12,'#c56c8a'],[10,13,'#6a8cac'],[16,9,'#d2a078'],[14,13,'#72b69d']]){
        fill(x*T+7,y*T+8,12,12,col);fill(x*T+9,y*T+2,8,8,'#d7a985');
      }
    }
  }

    function drawCharacter(g,x,y,n,scale=1,isPlayer=false,walk=0){
    // x,y marks the sprite centre and ground line. Blocks make it legible at native DS-like resolution.
    const block=(px,py,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x+px*scale),Math.round(y+py*scale),Math.round(w*scale),Math.round(h*scale));};
    const hat=isPlayer?'#dc6b83':n.hair;
    const lift=walk?Math.round(Math.sin(walk)*2):0;
    const stride=isPlayer&&walk?Math.round(Math.sin(walk)*3):0;
    const mood=saved.relationships[n.id];
    const blink=!reducedMotion&&Math.floor(performance.now()/180)%23===0;
    g.fillStyle='#26335440';g.fillRect(Math.round(x-11*scale),Math.round(y+0*scale),Math.round(22*scale),Math.round(4*scale));
    block(-9,-7-lift+stride,7,6,'#252a4b');block(2,-7-lift-stride,7,6,'#252a4b');
    block(-12,-25-lift,24,18,'#243153');block(-10,-24-lift,20,17,n.outfit);block(-13,-23-lift,5,14,n.outfit);block(8,-23-lift,5,14,n.outfit);
    block(-13,-11-lift,5,5,n.skin);block(8,-11-lift,5,5,n.skin);
    block(-10,-40-lift,20,17,'#27324a');block(-8,-39-lift,16,15,n.skin);
    block(-11,-42-lift,22,9,hat);block(-11,-33-lift,5,5,hat);block(7,-34-lift,4,7,hat);
    const face=isPlayer?player.facing:(dialogue?.npc?.id===n.id?(player.x<n.x?'left':player.x>n.x?'right':player.y<n.y?'up':'down'):'down');
    const look=face==='left'?-2:face==='right'?2:0;
    block(-4+look,-30-lift,3,blink?1:3,'#20243b');block(4+look,-30-lift,3,blink?1:3,'#20243b');
    if(mood==='Needs repair'){block(-5,-34-lift,5,2,'#493b60');block(4,-35-lift,4,2,'#493b60');}
    if(mood==='Trust restored'||mood==='In sync'){block(-3,-26-lift,2,2,'#c98176');block(3,-26-lift,2,2,'#c98176');}
    if(face==='up'){block(-8,-36-lift,16,12,hat);}
    block(-1,-25-lift,4,2,'#c98176');
    if(isPlayer){block(9,-23-lift,6,14,'#344f69');block(-11,-42-lift,21,5,'#c84d6b');block(-8,-46-lift,16,8,'#d9687c');block(5,-38-lift,10,5,'#c84d6b');block(-6,-20-lift,13,5,'#f8e4af');}
    else{block(-3,-21-lift,6,8,n.accent);if(n.id==='theo'){block(-9,-30-lift,7,6,'#39475b');block(2,-30-lift,7,6,'#39475b');block(-2,-29-lift,4,2,'#d8caba');}if(n.id==='prof'){block(-11,-20-lift,4,9,'#d9cab7');block(8,-20-lift,4,9,'#d9cab7');}if(n.id==='nova'){block(-12,-26-lift,5,8,'#8ed5d1');block(8,-26-lift,5,8,'#8ed5d1');}}
  }
  function npcLabel(n){
    const px=n.x*T+16,py=n.y*T-17,near=Math.abs(n.x-player.x)+Math.abs(n.y-player.y)<=2;
    if(!near&&!completed(n))return;
    const label=n.name.toUpperCase();ctx.font='bold 10px monospace';const width=ctx.measureText(label).width+16;
    fill(px-width/2,py-12,width,17,completed(n)?'#2f806d':'#2d3b68');
    ctx.fillStyle='#fffbea';ctx.textAlign='center';ctx.fillText(label,px,py);ctx.textAlign='start';
  }
  function drawMapUI(){
    fill(12,12,200,34,'#0f1b34e8');fill(14,14,196,2,'#8f8db6');
    ctx.fillStyle='#f5d6a2';ctx.font='bold 13px monospace';
    ctx.fillText(`✦ CLUES ${characters.filter(completed).length}/${storyClues.length}`,24,34);
    if(completedCount()===4){
      fill(W*T-208,12,196,34,'#3f365de6');ctx.fillStyle='#f4d3ac';ctx.fillText('LINGO LAB OPEN!',W*T-194,33);
    }
    if(completedCount()===5){
      fill(W*T-233,12,220,34,'#255952e6');ctx.fillStyle='#d5f6e8';ctx.fillText('CASE EVIDENCE READY!',W*T-219,33);
    }
    // Clock signals the story's setting without imposing a real-time deadline.
    fill(12,H*T-35,155,25,'#0e1b31db');ctx.fillStyle='#cad5eb';
    ctx.font='bold 10px monospace';ctx.fillText('☾ STORY NIGHT',22,H*T-18);
  }

    function drawRoom(time){
    const room=rooms[scene],closed=scene==='campus'&&saved.progress.prof>=2&&saved.world.classroomComfort!=='sunny';
    fill(0,0,W*T,H*T,'#0b172b');
    fill(2*T,2*T,22*T,15*T,'#263249');
    fill(3*T,2*T,20*T,3*T,room.color);
    // Plank and stone floor with pixel seams: each interior has its own personality.
    for(let y=4;y<=16;y++)for(let x=3;x<=22;x++){
      const px=x*T,py=y*T,n=hash(x+22,y+37);
      fill(px,py,T,T,scene==='lab'?'#253a4d':scene==='library'?'#403b4e':scene==='cafe'?'#504051':'#414458');
      fill(px,py+((y+x)%3),T,2,'#ffffff09');fill(px+((y%2)*15),py+2,2,T-4,'#10172a33');
      if(n%7===0)fill(px+7,py+20,8,2,'#abb5bf18');
    }
    fill(3*T,4*T,20*T,8,'#1c2940');
    // Midnight visible through an illuminated, cross-framed window.
    fill(11*T-3,2*T+8,4*T+6,60,'#132840');
    fill(11*T+4,2*T+14,4*T-8,47,closed?'#5d8797':'#1d4e68');
    if(!closed){
      fill(11*T+25,2*T+23,7,7,'#f5dfab');
      for(const [xx,yy] of [[16,28],[76,26],[106,37]])fill(11*T+xx,2*T+yy,3,3,'#c3e2e4');
    }
    fill(13*T-1,2*T+10,5,52,'#d4b3a0');
    fill(11*T+3,2*T+35,4*T-5,4,'#d4b3a0');
    fill(11*T-7,2*T+68,4*T+14,6,'#192a41');
    // Rug and stone trim; door remains at the existing map coordinates.
    fill(10*T,10*T,6*T,4*T,'#343249');
    fill(10*T+7,10*T+7,6*T-14,4*T-14,scene==='lab'?'#3b6471':'#71516c');
    fill(10*T+16,10*T+15,6*T-32,4*T-30,scene==='cafe'?'#8e6a73':'#576274');
    for(const [x,y,w,h] of room.furniture){
      const px=x*T,py=y*T,pw=w*T,ph=h*T;
      fill(px+6,py+13,pw,ph-5,'#111b2c88');
      fill(px,py,pw,ph-7,scene==='lab'?'#344d62':'#624d5f');
      fill(px+4,py+4,pw-8,ph-17,scene==='lab'?'#6e8490':'#987d7b');
      if(scene==='library'){
        for(let j=0;j<w*4;j++){
          const color=['#af777d','#d1b17e','#628f89','#818db3','#a18fa9'][j%5];
          fill(px+5+j*7,py+7,5,28+(j%3===0?4:0),color);
          if(j%3===0)fill(px+5+j*7,py+16,5,2,'#e5cfa9');
        }
      }else if(scene==='lab'){
        fill(px+11,py-5,41,28,'#1b2942');fill(px+15,py,33,19,'#69bfc0');
        fill(px+19,py+6,13,3,'#c2f4e8');fill(px+23,py+12,18,2,'#277e8b');
        fill(px+63,py+5,12,23,'#b5d8ca');fill(px+63,py,12,6,'#e1a5a4');
      }else if(scene==='cafe'){
        // Two ceramic mugs and a napkin on each table.
        fill(px+14,py+9,17,13,'#dfbda1');fill(px+17,py+6,11,4,'#fff0c3');
        fill(px+51,py+13,16,12,'#99c3bc');fill(px+54,py+10,9,3,'#e7ece4');
        fill(px+33,py+22,16,4,'#e8d4ba');
      }else{
        fill(px+14,py+11,26,18,'#ded0b7');fill(px+18,py+14,18,2,'#927e81');
        fill(px+48,py+12,25,15,'#e4ceb2');fill(px+52,py+16,14,3,'#7682a0');
      }
    }
    // Context-specific decor, still purely decorative (no new collision geometry).
    if(scene==='cafe'){
      for(const [x,y] of [[4,5],[20,5]]){
        fill(x*T+4,y*T+2,4,24,'#6f5569');fill(x*T-6,y*T+22,25,9,'#f2c78e');
        fill(x*T-10,y*T+19,33,18,'#f4bd6740');
      }
      fill(20*T,11*T,40,34,'#293f3d');fill(20*T+7,11*T-10,27,21,'#477d65');
      if(saved.progress.mina>0){drawBench(10,8);fill(10*T+9,8*T+5,12,10,'#e9c99a');}
    }else if(scene==='library'){
      fill(5*T,5*T,77,38,'#223249');fill(5*T+5,5*T+5,67,4,'#c6ae89');
      fill(5*T+9,5*T+12,8,18,'#bc8b85');fill(5*T+21,5*T+10,7,20,'#86a6a0');
      fill(5*T+33,5*T+13,9,17,'#a9a4d0');fill(5*T+46,5*T+11,11,20,'#d5b184');
    }else if(scene==='campus'){
      fill(15*T,5*T,6*T,2*T,'#223747');fill(15*T+6,5*T+7,6*T-12,2*T-14,'#2b5a55');
      ctx.fillStyle='#b3d6c1';ctx.font='bold 12px monospace';ctx.fillText('SOME ≠ NOT ALL',15*T+12,5*T+29);
    }else if(scene==='lab'){
      fill(8*T,5*T,6*T,2*T,'#183344');fill(8*T+6,5*T+5,6*T-12,2*T-10,'#235a69');
      for(let i=0;i<9;i++)fill(8*T+16+i*15,5*T+37+Math.sin(i*.8)*12,10,3,'#8bdbd2');
      fill(18*T,5*T,47,45,'#32495a');fill(18*T+7,5*T+7,33,19,'#7ba8c5');
    }
    fill(11*T,16*T,3*T,T,'#d7af7f');ctx.fillStyle='#29344b';ctx.font='bold 11px monospace';ctx.fillText('↓ EXIT',11*T+23,16*T+20);
    ctx.fillStyle='#fff0d0';ctx.font='bold 14px monospace';ctx.textAlign='center';ctx.fillText(room.name,13*T,52);ctx.textAlign='start';
    if(scene==='campus'&&saved.world.classroomComfort==='sunny'){fill(17*T+7,7*T+10,64,20,'#e3c99f');ctx.fillStyle='#514963';ctx.font='10px monospace';ctx.fillText('POSTER',17*T+20,7*T+24);}
    if(scene==='library'&&['map','escort'].includes(saved.world.libraryHelp)){fill(12*T-20,9*T,80,27,'#b8ceb6');ctx.fillStyle='#32515b';ctx.font='10px monospace';ctx.fillText(saved.world.libraryHelp==='map'?'RETURNS →':'NEED HELP?',12*T-12,9*T+17);}
    if(scene==='cafe'&&saved.progress.mina>0){ctx.fillStyle='#f4dbb9';ctx.font='10px monospace';ctx.fillText(saved.world.cafeStyle==='playful'?'ONE SILLY TOAST':'QUIET TABLE',10*T-20,9*T+14);}
    if(scene==='campus'&&!closed&&!reducedMotion){const drift=Math.sin(time/500)*7;fill(13*T+drift,5*T,23,2,'#7cb1b3');}
    if(scene==='lab'&&completed(characters[4])){fill(8*T,14*T,10*T,24,'#254e5a');ctx.fillStyle='#b1e8d8';ctx.font='bold 11px monospace';ctx.fillText('STYLE ≠ AUTHORSHIP',9*T+5,14*T+16);}
  }

    function drawWorld(time){
    if(reducedMotion)time=0;
    const active=dialogue?.npc;
    // A DS-era challenger encounter: camera frames the two facing sprites in the visible upper map.
    const elapsed=Math.max(0,performance.now()-encounterStarted);
    const blend=active?(reducedMotion?1:Math.min(1,elapsed/460)):0;
    const eased=blend*blend*(3-2*blend);
    const zoom=1+eased*.55;
    const fx=active?(player.px+active.x)*T/2+T/2:W*T/2;
    const fy=active?(player.py+active.y)*T/2+T/2:H*T/2;
    ctx.save();
    if(active){
      fill(0,0,W*T,H*T,'#0b172b');
      const x=eased*(W*T/2-fx*zoom);
      const y=eased*(H*T*.31-fy*zoom);
      ctx.translate(x,y);ctx.scale(zoom,zoom);
    }
    if(scene==='town'){
    drawGround();
    drawBuilding(2,2,7,5,'CAFÉ','#81536b','#b57a86');
    drawBuilding(17,2,7,5,'LIBRARY','#515b83','#8697c5');
    drawBuilding(2,13,7,4,'CAMPUS','#7d7167','#c09f7d');
    drawBuilding(17,13,7,4,'LINGO LAB','#695683','#9a8ac2');
    drawFountain(time);
    for(const [x,y] of trees)drawTree(x,y);
    for(const [x,y] of [[10,7],[16,7],[9,12],[16,12],[11,15],[14,4]])drawStreetLamp(x,y,time);
    for(const [x,y] of benches)drawBench(x,y);
    for(const [x,y] of boxes)drawStand(x,y);
    drawSign(10,5,'STORY');
    drawStoryFestival(time);
    // Flower patches and flags.
    for(const [x,y] of [[3,8],[8,11],[3,11],[23,9],[15,14],[9,4],[25,11]]){
      fill(x*T+7,y*T+8,4,4,'#d4ba96');fill(x*T+13,y*T+14,4,4,'#b987aa');fill(x*T+22,y*T+20,4,4,'#dfb77d');
    }
    drawFireflies(time);
    for(const [id,r] of Object.entries(rooms)){
      const [x,y]=r.door;fill(x*T,y*T,T,T,'#d2b077');fill(x*T+5,y*T+5,T-10,T-10,'#594b67');
      ctx.fillStyle='#fff4d1';ctx.font='bold 18px monospace';ctx.fillText(id==='lab'&&!unlocked(characters[4])?'×':'↑',x*T+10,y*T+23);
    }
    }else drawRoom(time);
    // Route destination trail.
    if(route.length&&(!modalOpen&&!dialogue)){
      let x=player.x,y=player.y;
      for(let i=0;i<route.length;i++){const [dx,dy]=dirs[route[i]];x+=dx;y+=dy;if(i%2===0){fill(x*T+13,y*T+13,7,7,'#e1c28c');fill(x*T+15,y*T+15,3,3,'#47576c');}}
    }
    if(pointerCell&&!modalOpen&&!dialogue){const [x,y]=pointerCell;if(walkable(x,y)){ctx.strokeStyle='#f8d8a9b5';ctx.lineWidth=2;ctx.strokeRect(x*T+2,y*T+2,T-4,T-4);}}
    for(const npc of sceneNPCs()){
      const walk=reducedMotion?0:time/440+npc.x;
      drawCharacter(ctx,npc.x*T+16,npc.y*T+27,npc,1,false,walk);
      if(saved.relationships[npc.id]==='Needs repair'){
        fill(npc.x*T+7,npc.y*T-25,20,18,'#f4c799');ctx.fillStyle='#6d4057';ctx.font='bold 15px monospace';ctx.fillText('?!',npc.x*T+8,npc.y*T-11);
      }else if(nextLead()===npc){
        fill(npc.x*T+4,npc.y*T-26,25,21,'#f4cf83');ctx.fillStyle='#31415f';ctx.font='bold 15px monospace';ctx.fillText('★',npc.x*T+10,npc.y*T-9);
      }else if(!unlocked(npc)){
        fill(npc.x*T+9,npc.y*T-22,15,16,'#e8e0b6');ctx.fillStyle='#3e4771';ctx.font='bold 13px monospace';ctx.fillText('!',npc.x*T+13,npc.y*T-9);
      } else if(completed(npc)){
        fill(npc.x*T+8,npc.y*T-24,16,16,'#ecf7d9');ctx.fillStyle='#47856e';ctx.font='bold 13px monospace';ctx.fillText('✓',npc.x*T+11,npc.y*T-10);
      }else{
        fill(npc.x*T+9,npc.y*T-24,15,16,'#fdf3c7');ctx.fillStyle='#4c618b';ctx.font='bold 14px monospace';ctx.fillText('?',npc.x*T+12,npc.y*T-10);
      }
      npcLabel(npc);
    }
    const plx=player.px*T+16,ply=player.py*T+28;
    drawCharacter(ctx,plx,ply,{hair:'#29375b',skin:'#dba77d',outfit:'#6188bd',accent:'#f0d09a'},1,true,player.move?time/90:0);
    // Small gold cursor above player.
    fill(plx-4,ply-58+(reducedMotion?0:Math.sin(time/290)*2),8,8,'#f8dc9b');fill(plx-2,ply-60+(reducedMotion?0:Math.sin(time/290)*2),4,4,'#fff3bb');
    ctx.restore();
    drawMapUI();
    if(active){
      fill(W*T-219,51,204,28,'#192849ee');fill(W*T-216,53,198,2,'#edbf86');
      ctx.fillStyle='#ffe3ae';ctx.font='bold 11px monospace';
      ctx.fillText(`✦ ENCOUNTER: ${active.name.toUpperCase()}`,W*T-208,69);
    }
    if(dialogue&&dialogue.npc)setPortrait(dialogue.npc);
  }
  function animationLoop(time){
    if(player.move){
      const m=player.move;const t=Math.min(1,(time-m.start)/m.duration);const smooth=t*t*(3-2*t);
      player.px=m.sx+(m.tx-m.sx)*smooth;player.py=m.sy+(m.ty-m.sy)*smooth;
      if(t>=1){player.px=player.x;player.py=player.y;player.move=null;renderNearby();}
    }else if(!modalOpen&&!dialogue){
      if(route.length&&time-lastStep>130){
        const d=route.shift();lastStep=time;
        if(!tryStep(d)){route=[];routeTalk=null;}
      }else if(!route.length&&routeEnter){
        const dest=routeEnter;routeEnter=null;changeScene(dest);
      }else if(!route.length&&routeTalk){
        const npc=routeTalk;routeTalk=null;if(Math.abs(npc.x-player.x)+Math.abs(npc.y-player.y)<=1)talkTo(npc);
      }else if(!route.length&&pressed.size&&time-lastStep>155){
        lastStep=time;tryStep([...pressed].at(-1));
      }
    }
    drawWorld(time);
    requestAnimationFrame(animationLoop);
  }
  // Test hooks for browser tests only: no game data sent anywhere.
  window.__LINGUA_DEBUG__={getState:()=>({x:player.x,y:player.y,progress:{...saved.progress},scene,relationships:{...saved.relationships},repairs:{...saved.repairs},turns:JSON.parse(JSON.stringify(saved.turns)),world:{...saved.world},pending:{...saved.pending},dialogue:dialogue?.mode||null,caseStep:dialogue?.caseStep||0,nextLead:nextLead().id,modalOpen}),moveTo:walkToNPC,characters};
  setPortrait(null);renderJournal();drawIdlePanel();
  if(saved.started&&saved.world.storyIntroSeen){modalOpen=false;introModal.classList.add('hidden');}
  if(modalOpen){document.querySelector('.shell').inert=true;document.getElementById('startBtn').focus();}
  renderNearby();requestAnimationFrame(animationLoop);
})();
