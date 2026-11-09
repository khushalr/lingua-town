/* Fictional teaching conversations. Every exchange investigates the same festival rumour.
   Outcomes describe how listeners respond, not whether a writing style is universally correct. */
window.LinguaConversations = {
  mina: [
    {
      line:"This is my ORIGINAL invitation: 'Night of Voices is ON tonight in the town square. Everyone's welcome!' But someone forwarded a cropped, official-sounding version. My friend Leila thinks she's been uninvited. What should I say to her?",
      replies:["You are hereby notified that your attendance remains permitted.","Leila, you're absolutely invited! Want to come with me? We can sit somewhere quiet.","Leila! Story mission is ON ✨ Come with me and we'll find the best seats!"],
      routes:[{repair:true},{branch:'quiet'},{branch:'playful'}],
      reaction:["Leila replies, 'Permitted? I thought we were friends. Are you sending me a rule or asking me to come?' The wording confirms eligibility but misses the relationship."],
      repair:"Leila needs reassurance that this is a personal invitation, not a cold official notice. Repair the social meaning.",
      repairs:["Sorry—that sounded official. I meant you're invited, and I'd love you to come with me.","The notice is technically correct. No further explanation is needed.","I was doing a mock-official voice! Really, come with me if you'd like."],
      repairRoutes:[{branch:'quiet'},{hint:"Leila: 'I understand the words, but are you actually inviting me?' Accuracy alone hasn't resolved the social distance."},{branch:'playful'}],
      branches:{
        quiet:{line:"Leila smiles: 'That helps. The rumour made me nervous. I'd love a quiet corner at Story Night.' What should Mina say next?",replies:["We'll sit together near the café, and I can fill you in on what we know.","No pressure to talk through the rumour now; I'll save you a quiet seat."],outcomes:[
          {reaction:"Leila: 'Thanks for listening rather than sending another announcement.' The invitation was successful because it fit this friendship.",consequence:"Mina saves a quiet festival seat for Leila.",effect:{cafeStyle:'quiet'}},
          {reaction:"Leila: 'A calm place sounds perfect.' She stops worrying that the rumour excluded her.",consequence:"Mina keeps a quiet festival corner ready for worried neighbours.",effect:{cafeStyle:'quiet'}}]},
        playful:{line:"Leila laughs: 'Story mission accepted! Just don't make me perform on stage.' How do you respond?",replies:["Deal—one silly toast before the show, then we can just listen.","No performance required. We can sit quietly if you're tired."],outcomes:[
          {reaction:"Leila: 'That's more like you!' The shared joke clarified an invitation that had felt distant.",consequence:"Mina starts a playful one-toast tradition before the festival.",effect:{cafeStyle:'playful'}},
          {reaction:"Leila: 'Thanks for checking.' Mina adjusts her tone as the conversation changes.",consequence:"Mina reserves a quiet table for Leila, despite the playful start.",effect:{cafeStyle:'quiet'}}]}
      },
      next:"Mina lays the original invitation beside the forwarded crop. 'Same event, very different feeling. We need a message the ORGANIZERS can confirm, too.'"
    },
    {
      line:"Before we reassure everyone, I need to contact the Story Night committee. Their cropped notice never showed a start time. What should my message say?",
      context:{key:'cafeStyle',lines:{quiet:"Mina lowers her voice. 'Leila needed a personal invitation; the committee needs a clear request for evidence.'",playful:"Mina grins. 'Our joke worked for Leila. The organizers still need an accurate, specific question.'"}},
      replies:["Hi committee, I'm announcing that Story Night begins at seven. See you then!","Dear Story Night committee, could you confirm the official start time and location before we post a correction?","Hi organizers, can you confirm the programme and time? People are mistaking the cropped notice for a cancellation."],
      routes:[{repair:true},{outcome:{reaction:"The committee replies, 'It's definitely in the town square. Dr. Nova has the signed programme with the start time.' Mina says, 'We asked instead of guessing.'",consequence:"Mina marks the original invitation as authentic and sends you to Theo for the next source."}},{branch:'friendly'}],
      reaction:["The committee replies, 'Please don't announce seven as the start time until you've seen the programme.' Mina realizes a friendly message can still spread a false fact."],
      repair:"The official schedule isn't verified yet. Repair the assumption, not merely the tone.",
      repairs:["Sorry, I shouldn't have guessed. Could you confirm the official start time and location?","Seven sounds reasonable. I'll keep the announcement as written.","Could we check the signed programme before sharing a time? I'll correct my message."],
      repairRoutes:[{outcome:{reaction:"'Good call,' the committee replies. 'Dr. Nova has the schedule.' Mina separates what the invitation proves from what remains to be checked.",consequence:"Mina confirms the festival is on and points you toward the missing schedule."}},{hint:"The committee: 'A plausible time is still a guess. Please ask for the programme before posting.'"},{branch:'friendly'}],
      branches:{friendly:{line:"The committee answers: 'The festival is on, but we've lost track of where the eight o'clock rumour came from.' Which fact should we investigate next?",replies:["Ask Theo whether the eight o'clock sign belongs to the library.","Ask Theo to find the original notice that was cropped."],outcomes:[
        {reaction:"'Theo keeps the library notices,' Mina says. 'That should tell us what actually closes at eight.'",consequence:"Mina sends you to Theo with the cropped notice."},
        {reaction:"'Good idea,' says Mina. 'A full notice can restore the subject the forwarded scrap lost.'",consequence:"Mina gives you the cropped notice to compare with Theo's original."}]}}
    }
  ],
  theo: [
    {
      line:"Here's the FULL notice: 'LIBRARY SERVICE DESK CLOSES AT 8 PM.' Someone circulated only 'Closes at eight' beside the festival flyer. A visitor asks: 'Does Story Night close at eight?' How do we answer without leaving out the subject?",
      replies:["There's probably still time. Don't worry about it.","No—the library service desk closes at eight. Story Night is in the square; its time is on the festival programme.","The eight o'clock sign is for this library. Want me to show you where the festival is?"],
      routes:[{repair:true},{outcome:{reaction:"The visitor: 'Oh! I confused two events.' Theo points to the missing words 'LIBRARY SERVICE DESK': a relevant subject changed the entire rumour.",consequence:"Theo pins up the complete library closing notice.",effect:{libraryHelp:'concise'}}},{branch:'help'}],
      reaction:["The visitor: 'But WHAT closes at eight?' Theo says, 'Reassurance isn't enough when the subject of the sentence is missing.'"],
      repair:"Give the visitor the subject and the verified distinction between the library and Story Night.",
      repairs:["Sorry—I meant the library service desk closes at eight, not the festival.","Just get there soon. Eight is a useful estimate.","This notice is about the library. Would a route to the square help?"],
      repairRoutes:[{outcome:{reaction:"'Now I know,' the visitor says. Theo replaces the cropped scrap with the full notice.",consequence:"The library's eight o'clock deadline is no longer confused with Story Night.",effect:{libraryHelp:'concise'}}},{hint:"Theo: 'They still don't know WHAT closes. Supply the missing subject rather than guessing a deadline.'"},{branch:'help'}],
      branches:{help:{line:"The visitor says, 'Yes! The rumour even made me think the square was shut. How can I find the festival?'",replies:["Mark the town-square route on the library map.","Offer to walk the visitor from the library to the square."],outcomes:[
        {reaction:"'Perfect. I can follow the map myself,' they say. Theo provides the amount of information this visitor needs.",consequence:"Theo posts a clear map to the festival square.",effect:{libraryHelp:'map'}},
        {reaction:"'Please do,' they say. Theo: 'Now the information has turned into help at exactly the right moment.'",consequence:"Theo escorts visitors from the library toward the festival.",effect:{libraryHelp:'escort'}}]}},
      next:"Theo uncovers another forwarded reply: 'The lanterns look lovely.' It was someone's answer to a question about whether the festival was still on."
    },
    {
      line:"A worried neighbour asked, 'Is Story Night definitely happening?' Their friend answered, 'Well, the lanterns look lovely.' Can Theo treat that as proof the festival is on—or off?",
      replies:["The reply avoids a direct answer. It may imply uncertainty, but let's ask whether the friend saw an official update.","The lanterns are up, so the friend must be confirming the festival is on.","Maybe they just liked the decorations. Let's ask what they actually know about the schedule."],
      routes:[{outcome:{reaction:"Theo asks. The friend admits, 'I saw lanterns, not the programme.' The hint of uncertainty was worth checking, not treating as a fact.",consequence:"Theo labels the decoration comment as an observation, not a cancellation notice."}},{repair:true},{branch:'visuals'}],
      reaction:["The neighbour asks, 'But could the event still be cancelled with the lanterns up?' Theo realizes the evidence doesn't answer the original question."],
      repair:"A conversational implicature may be informative, but it is not a verified event status.",
      repairs:["You're right. The lanterns alone don't confirm the festival; let's ask what the friend actually saw.","The lanterns suggest a festival, so we'll mark it confirmed.","Ask where the friend got the information and whether they saw the official programme."],
      repairRoutes:[{outcome:{reaction:"'I just liked the decorations,' the friend explains. Theo records the words without inventing a confirmation.",consequence:"The library notice now distinguishes observed decorations from verified festival information."}},{hint:"Theo: 'We still need a source. An indirect answer isn't proof of a schedule.'"},{branch:'visuals'}],
      branches:{visuals:{line:"The friend says, 'I was describing the lanterns. I never saw an announcement.' Theo asks what the evidence board should say.",replies:["'Lanterns were seen; event schedule not yet verified.'","'Someone liked the lanterns; check the official programme before giving a start time.'"],outcomes:[
        {reaction:"'That's precise,' says Theo. 'No more than the source supports.'",consequence:"Theo adds a cautious eyewitness note to the case file."},
        {reaction:"'Good distinction,' says Theo. 'Observations and intentions are different things.'",consequence:"Theo records the observation and a reminder to seek the programme."}]}}
    }
  ],
  prof: [
    {
      line:"My message was 'Some students finished the Story Night posters.' A forwarded version made others think the remaining posters weren't done and the festival had been called off. What can 'some' actually establish?",
      replies:["Then someone must still be working. We should postpone the festival.","It can suggest 'not all,' but it doesn't logically prove that. Could we check whether all the posters were finished?","Did all the students finish, or were some still working? We shouldn't assume cancellation."],
      routes:[{repair:true},{outcome:{reaction:"'In fact, all the posters are finished,' Lin says. 'Some' was true even though 'all' was also true. The rumour added a conclusion I never stated.",consequence:"Lin supplies the complete update: every festival poster was finished."}},{branch:'check'}],
      reaction:["Lin stops you: 'That is a possible conversational inference, not a proof. All posters were finished, and no festival decision was made.'"],
      repair:"Acknowledge that the implication was understandable, then revise it with the new evidence.",
      repairs:["Then we should correct the post: all posters were finished, and no cancellation followed.","'Some' still means others definitely failed, so let's keep the postponement.","Let's check the full class update and share only what it actually confirms."],
      repairRoutes:[{outcome:{reaction:"Lin nods. 'You corrected a defeasible inference rather than treating it as fact.'",consequence:"The poster-completion rumour is corrected."}},{hint:"Lin: 'The next sentence cancels the suggested meaning. We cannot keep treating it as evidence.'"},{branch:'check'}],
      branches:{check:{line:"Lin opens the class log: 'All the posters are finished. Some students also volunteered to hang them.' What should the corrected town update say?",replies:["All festival posters are finished; hanging volunteers are preparing the square.","The posters are complete. The class update did not cancel Story Night."],outcomes:[
        {reaction:"'Exactly,' says Lin. 'A narrower statement can be true without denying the broader one.'",consequence:"The full class progress note is added to the case file."},
        {reaction:"'Right,' says Lin. 'Someone supplied the cancellation that my words never said.'",consequence:"The class confirms completion and denies any cancellation announcement."}]}},
      next:"A draft of the ORIGINAL poster is on the windowsill. Lin glances at it: 'It's getting breezy in here…'"
    },
    {
      line:"The only unedited poster draft is beside an open window. A gust nearly blows it outside. Lin says, 'It's getting breezy in here…' What action might that indirect request invite?",
      replies:["Yes, the weather has changed. Let's keep reading the rumours.","Would you like me to close the window so the original poster stays safe?","Should we move the draft to the sheltered sunny table instead?"],
      routes:[{repair:true},{outcome:{reaction:"'Yes, please,' says Lin as you close it. 'I was warning you about the draft without explicitly saying close the window.' The original wording is safe.",consequence:"The original festival poster is protected behind a closed window.",effect:{classroomComfort:'window'}}},{branch:'sunny'}],
      reaction:["Another gust lifts the paper. Lin says, 'That observation is true, but I was hoping you'd help protect our evidence.'"],
      repair:"Interpret what the speaker wants accomplished, not just the literal weather report.",
      repairs:["I'll close the window to keep the poster from blowing away. Is that okay?","It'll probably calm down later. We can ignore it for now.","Would you prefer I carry the original draft to the sheltered sunny table?"],
      repairRoutes:[{outcome:{reaction:"'Thank you,' says Lin. The original poster remains legible. Context turned a comment about the breeze into a request for action.",consequence:"You secure the unedited festival draft by closing the window.",effect:{classroomComfort:'window'}}},{hint:"The poster could be lost now. A forecast doesn't answer Lin's immediate concern."},{branch:'sunny'}],
      branches:{sunny:{line:"Lin agrees: 'The sheltered table will work, and I like the air. Can you help carry the draft without smudging the ink?'",replies:["Carry the poster flat to the sunny table and weigh down the edges.","Move it carefully, then ask if Lin also wants the window partially closed."],outcomes:[
        {reaction:"Lin smooths the page. 'Exactly. You understood the goal even though you chose a different action.'",consequence:"The original festival poster is safe on the sunny table; the window stays open.",effect:{classroomComfort:'sunny'}},
        {reaction:"'The table is enough,' says Lin. 'Thank you for checking before deciding.'",consequence:"The preserved original stays on the sunny table while fresh air comes in.",effect:{classroomComfort:'sunny'}}]}}
    }
  ],
  nova: [
    {
      line:"We need to stop the rumour. I have three draft messages for the town, but I won't claim a festival start time until we check the signed programme. Which one would you send to anxious neighbours right now?",
      replies:["Story Night is happening.","Story Night is ON tonight ✨ Everyone is welcome at the town square! We're checking the exact start time now.","Story Night is going ahead tonight in the town square. Everyone is welcome; we'll confirm the start time shortly."],
      routes:[{branch:'brief'},{outcome:{reaction:"The neighbours reply, 'Thanks! We were worried.' Nova: 'That friendly version fits this audience, and it doesn't invent a time.'",consequence:"The town's message board displays a warm, accurate status update."}},{branch:'plain'}],
      reaction:[], repair:"The brief note is true but people still need location and a verified time. Expand it without guessing.",
      repairs:["Story Night is on at the town square; the exact time is being checked.","If it's happening, the details don't matter.","It's on tonight; we'll confirm the start time from the programme."],
      repairRoutes:[{outcome:{reaction:"Nova: 'You supplied the missing context without adding unverified details.'",consequence:"The initial status note is updated with the town-square location."}},{hint:"People are missing practical details. A true but incomplete sentence may not answer their questions."},{branch:'plain'}],
      branches:{
        brief:{line:"A villager asks, 'WHERE is it? Is eight the ending?' Your brief note was correct but left room for the same rumour. What next?",replies:["It's in the town square; eight refers to the library. I'll verify the programme's start time.","It's in the town square tonight. We won't publish a start time until we read the original schedule."],outcomes:[
          {reaction:"'Now I know where to go,' the villager says. Nova praises the added context rather than a particular tone.",consequence:"The notice now separates location, library hours, and the unverified start time."},
          {reaction:"'Thanks for not guessing,' the villager says. Nova: 'A concise update can still be helpful when it includes what is known.'",consequence:"The first festival clarification is posted without invented details."}]},
        plain:{line:"A villager says, 'I like a straightforward note; my friend wants something warmer.' Should we treat one style as the only natural one?",replies:["No; keep the clear facts and adapt tone to the intended readers.","We can offer both a plain public notice and a warm invitation, with the same verified facts."],outcomes:[
          {reaction:"Nova: 'Exactly. We can assess readability and tone without pretending to know who wrote each version.'",consequence:"The lab saves a plain festival clarification for the official board."},
          {reaction:"Nova: 'Both can work for different readers, provided they do not contradict the evidence.'",consequence:"The lab prepares two audience-appropriate festival messages."}]}
      },
      next:"Nova places two festival announcements side by side. 'How they sound is a preference question. Who wrote them is a different kind of claim.'"
    },
    {
      line:"Someone says the corrected festival announcement sounds 'too polished', so it must be AI-written and fake. Can the town use that style judgment to decide whether Story Night is cancelled?",
      replies:["The polished writing is suspicious, so I'll label the notice as an AI fake.","The casual version feels more human, so I'll treat its event details as verified.","We can describe those impressions, but only the original invitation and signed programme can verify the event."],
      routes:[{repair:true},{repair:true},{outcome:{reaction:"Nova: 'Exactly. A reader's stylistic impression is not source evidence.' The original invitation and signed programme remain our checks.",consequence:"The lab labels style impressions separately from verified festival facts."}}],
      reaction:["A festival volunteer asks, 'But I wrote the formal notice myself. How does polished wording make it fake?' Nova folds the speculative label away.","Nova shows a casual draft made by a language model. 'Casual wording doesn't authenticate the festival schedule either.'"],
      repair:"Separate what a reader thinks a style resembles from what the authenticated documents establish.",
      repairs:["We can say this reader perceived the announcement as AI-like, while its authorship remains unverified.","Let's keep 'probably fake' and add a disclaimer that it's only a feeling.","Remove the source claim. Check the signed schedule and discuss tone separately."],
      repairRoutes:[{outcome:{reaction:"'That states the impression without inventing a source,' Nova agrees. 'Now let's check the programme.'",consequence:"The festival exhibit records perceptions without treating them as provenance."}},{hint:"'Probably fake' is still an unsupported statement about the notice's source. A caveat cannot verify it."},{outcome:{reaction:"Nova: 'Good. The reliable schedule, not the prose style, determines when the festival starts.'",consequence:"The lab removes the misleading AI-authorship label from the festival notice."}}],
      next:"Nova opens a drawer: 'The FIFTH piece is the signed festival programme. The square opens at seven; the stories begin at seven thirty. Now we can assemble every clue and correct the rumour.'"
    }
  ]
};
