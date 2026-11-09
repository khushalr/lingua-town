/* Authored game conversations. These are fictional situations, not research stimuli.
   Nodes describe world outcomes, never a score for a player's stylistic preference. */
window.LinguaConversations = {
  mina: [
    {
      line: "Hey! Class is finally over, and Story Night's tonight. Everyone's nervous about that rumour. I'm tired, but I could use some company before the festival. Want to hang out?",
      replies: ["Would you be available for refreshments this afternoon?", "Bubble tea after class? We could find a quiet table.", "Tea mission? I'll buy if you help me choose a ridiculous flavor."],
      routes: [{repair:true}, {branch:'quiet'}, {branch:'playful'}],
      reaction: ["Mina hesitates. ‘Available for refreshments? Is this an official appointment, or are we just hanging out?’"],
      repair: "Mina heard distance in your wording. You can explain your intention without claiming formal language is bad.",
      repairs: ["Sorry, I slipped into email mode. I'd like to hang out—how are you feeling?", "I meant it politely. Shall we proceed with refreshments?", "That was my pretend fancy voice! But we can keep things low-key if you're tired."],
      repairRoutes: [{branch:'quiet'}, {hint:"‘I get that you meant to be polite,’ Mina says, ‘but I still can't tell if this is a meeting or time with a friend.’ Try naming the relationship or the playful intention."}, {branch:'playful'}],
      branches: {
        quiet: {line:"Mina smiles. ‘A quiet table sounds good. Do you want to talk about class, or just sit together for a bit?’", replies:["Let's talk it through. I'm listening.", "No need to talk yet. We can just enjoy our tea."], outcomes:[
          {reaction:"‘Thanks. I do want to talk, just without the café noise.’ Mina brings over two cups. Your low-key invitation made space for her to choose.", consequence:"Mina saves you a quiet table for a catch-up.", effect:{cafeStyle:'quiet'}},
          {reaction:"Mina relaxes. ‘Company without pressure. Exactly what I needed.’ Being supportive didn't require a long message.", consequence:"Mina saves you a quiet table for companionable silence.", effect:{cafeStyle:'quiet'}}]},
        playful: {line:"Mina laughs. ‘Tea mission accepted. I'm a bit wiped out, though—are we doing full dramatic voices or just one silly toast?’", replies:["One silly toast, then we can relax.", "Let's save the dramatic voices for a day with more energy."], outcomes:[
          {reaction:"‘To surviving class!’ Mina grins, then settles in. The joke worked because you checked whether she wanted to keep it going.", consequence:"Mina starts a one-toast café tradition with you.", effect:{cafeStyle:'playful'}},
          {reaction:"‘Deal. I like the joke, just not a whole performance today.’ Mina feels heard. Register can change within one conversation.", consequence:"Mina chooses the quiet table after your playful invitation.", effect:{cafeStyle:'quiet'}}]}
      },
      next:"Mina glances at the empty café seats. ‘Maybe people thought our invitation sounded too cold. Now, another audience: I need to ask Professor Chen about office hours.’"
    },
    {
      line:"I haven't met Professor Chen. The syllabus says office hours are by appointment. Which opening should I send?",
      context:{key:'cafeStyle',lines:{quiet:"Mina lowers her voice at your quiet table. ‘The way we talked just now felt right for us. Professor Chen doesn't know me yet, though.’",playful:"Mina grins. ‘I'll save the tea-mission voice for you. Professor Chen hasn't heard our running joke.’"}},
      replies:["Hi Professor Chen, I'm dropping by tomorrow to discuss my essay.", "Dear Professor Chen, would you be available during office hours this week?", "Hi Professor Chen, could we find a time to talk about my essay this week?"],
      routes:[{repair:true},{outcome:{reaction:"Mina reads the reply: ‘Certainly—what would you like to discuss?’ ‘The greeting worked. Now I should add the topic so Chen can prepare.’",consequence:"Mina receives an office-hours invitation and lends you her café pass."}},{branch:'friendly'}],
      reaction:["‘I can't promise tomorrow,’ Chen replies. Mina pauses: ‘We announced a visit before checking their availability.’"],
      repair:"Keep the greeting if you like; repair the assumption about the professor's time.",
      repairs:["Sorry for assuming. Would you have time this week to discuss my essay?", "Would tomorrow suit you? I'm planning to arrive at noon.", "Could you suggest a convenient time? I'd like help with my essay outline."],
      repairRoutes:[{outcome:{reaction:"‘Thanks for checking—Thursday works.’ Mina sees that respect came from making room for the other person's schedule, not just adding ‘Dear’.",consequence:"Mina arranges an appointment and lends you her café pass."}},{hint:"Chen replies, ‘Noon is still a plan I haven't agreed to.’ Mina asks you to leave the time open or offer genuine alternatives."},{branch:'friendly'}],
      branches:{friendly:{line:"Chen replies, ‘Happy to help. What would you like to focus on?’ Mina says, ‘Hi’ was fine here. What should I add?",replies:["My outline is ready; I'd value feedback on the main claim.", "I'm still deciding on a topic. Could we talk through two ideas?"],outcomes:[
        {reaction:"‘Send the outline before we meet,’ Chen replies. Mina smiles: ‘A friendly opening and a specific request worked together.’",consequence:"Mina prepares an outline for office hours and lends you her café pass."},
        {reaction:"‘Bring both ideas,’ Chen replies. Mina smiles: ‘Being honest about what I need helped more than sounding grand.’",consequence:"Mina prepares two ideas for office hours and lends you her café pass."}]}}
    }
  ],
  theo: [
    {
      line:"A student asks, ‘What time does the library close tonight?’ We close at 8 PM, but Story Night is in the town square. Someone forwarded only 'Closes at eight' and now thinks the festival is ending. The student needs the exact time.",
      replies:["You've still got time to borrow that.", "8 PM tonight.", "8 PM tonight. Would you like help finding anything before then?"],
      routes:[{repair:true},{outcome:{reaction:"‘Great, I'll be back by half past seven.’ The student can plan their evening. Theo nods: ‘The short answer gave them what they asked for.’",consequence:"The library closing time is clear, and Theo can help with the Story Night archive.",effect:{libraryHelp:'concise'}}},{branch:'help'}],
      reaction:["‘Thanks, but when exactly?’ the student asks. Theo whispers, ‘Your reassurance was relevant; it just didn't give them a time.’"],
      repair:"The student has a bus to catch. Add the information they need to plan.",
      repairs:["Sorry—8 PM tonight. You can check it out any time before then.", "You should be fine if you come back later.", "We close at 8 PM. Do you need a quick checkout before your bus?"],
      repairRoutes:[{outcome:{reaction:"‘8 PM—got it.’ The student checks their bus timetable. Theo says, ‘Now the reassurance has a useful fact behind it.’",consequence:"The student borrows the book before their bus.",effect:{libraryHelp:'concise'}}},{hint:"‘Later could mean seven or nine,’ the student says. They still need the closing time; being reassuring isn't enough in this context."},{branch:'help'}],
      branches:{help:{line:"‘Actually, yes—where's the returns desk?’ The student accepts your offer. Theo points out a map and an open aisle.",replies:["Point out the desk on the map so they can go straight there.", "Offer to walk them over, if they'd like."],outcomes:[
        {reaction:"‘Perfect, I can find it from here.’ The student heads off. Theo smiles: ‘Extra information helped because you checked that it was wanted.’",consequence:"Theo leaves a clear route map out for visitors.",effect:{libraryHelp:'map'}},
        {reaction:"‘Yes, please.’ You walk over together. Theo says, ‘A short answer and an offer of help can both cooperate; the next turn tells us what helps this person.’",consequence:"Theo offers visitors a choice of directions or a short escort.",effect:{libraryHelp:'escort'}}]}},
      next:"Theo finds an old Story Night lecture flyer. ‘A friend said, “Well, the slides were colorful.” That's all I know about the talk.’"
    },
    {
      line:"A friend answered ‘Was the lecture interesting?’ with ‘Well, the slides were colorful.’ Should I recommend the lecture to a student?",
      replies:["That might be faint praise. I'd check what they thought of the talk itself.", "Let's recommend it as engaging—the comment about the slides sounds positive.", "They may genuinely care about the visuals. I'd ask what stood out before deciding."],
      routes:[{outcome:{reaction:"Theo asks. ‘I liked the diagrams, but lost the thread of the argument,’ the friend replies. ‘The narrow praise was a clue, not proof,’ Theo says.",consequence:"Theo adds a qualified description to the lecture archive."}},{repair:true},{branch:'visuals'}],
      reaction:["The student asks, ‘Was the argument good, or just the slides?’ Theo realizes the recommendation says more than the friend told us."],
      repair:"You can keep the positive observation while checking what it implies.",
      repairs:["We only know they praised the slides. Let's ask about the talk before recommending it.", "Let's say it was probably engaging, since they didn't criticize it.", "Let's ask whether the visuals made the ideas easier to follow."],
      repairRoutes:[{outcome:{reaction:"‘Good diagrams, hard-to-follow argument,’ the friend clarifies. Theo changes the note: ‘Useful visuals; ask whether the topic suits you.’",consequence:"Theo replaces an overconfident recommendation with a qualified description."}},{hint:"Theo points to the unanswered question: ‘Not criticizing something isn't the same as recommending it. Let's leave room for what they haven't said.’"},{branch:'visuals'}],
      branches:{visuals:{line:"‘The diagrams really helped me,’ the friend says, ‘though I found the argument hard to follow.’ Theo asks which detail to put first for this student.",replies:["Lead with the helpful diagrams; the student wants visual examples.", "Lead with the difficult argument; the student wants a clear introduction."],outcomes:[
        {reaction:"The student says, ‘Diagrams are just what I'm looking for. Thanks for the caveat about the argument.’ Theo sees why asking beat guessing.",consequence:"Theo recommends the lecture's visuals with a caveat about the argument."},
        {reaction:"‘I'll start with a simpler introduction,’ the student says. Theo keeps the note about the diagrams for another reader. Same facts, different audience need.",consequence:"Theo suggests an introductory talk and keeps the visual resource on file."}]}}
    }
  ],
  prof: [
    {
      line:"‘Some students finished the Story Night posters,’ Lin tells the study group. Rumour has it that the others left the event unfinished. What should the group infer?",
      replies:["Then we'll plan around the students who haven't finished yet.", "You may mean not everyone finished, but ‘some’ doesn't guarantee that. Shall we check?", "Do you know whether all of them finished, or only some?"],
      routes:[{repair:true},{outcome:{reaction:"‘In fact, all the festival posters are finished,’ Lin adds. The group puts away its unfinished-poster plan. ‘My second sentence cancels the suggestion without contradicting the first.’",consequence:"The study group checks the facts before planning its review."}},{branch:'check'}],
      reaction:["Lin stops the plan. ‘That's a reasonable inference from “some,” but in fact all finished. I hadn't said anyone was still working.’"],
      repair:"Adjust the group's plan after the new information. An understandable inference can still be revised.",
      repairs:["Then let's review questions they have about the completed work instead.", "Maybe we should keep the unfinished-work session because “some” suggested they needed it.", "Let's ask which parts they found difficult even though they finished."],
      repairRoutes:[{outcome:{reaction:"‘Good adjustment,’ Lin says. The group switches plans without treating the earlier inference as foolish—or certain.",consequence:"The group reviews questions about the completed work."}},{hint:"‘The suggestion has been cancelled,’ Lin reminds you. ‘We now know all finished. What plan uses that new information?’"},{branch:'check'}],
      branches:{check:{line:"‘All the posters were finished,’ Lin confirms. ‘But finishing isn't the same as being ready for the crowd.’ What should the group ask next?",replies:["Which part would you like to discuss together?", "Would you prefer a worked example or a short explanation?"],outcomes:[
        {reaction:"Students name two difficult steps. Lin nods: ‘You asked for the missing information instead of building a plan on an inference.’",consequence:"The study group chooses two difficult steps to discuss."},
        {reaction:"The group asks for a worked example. Lin smiles: ‘You checked their preference. Completion alone didn't tell us which kind of help they wanted.’",consequence:"The study group chooses a worked example."}]}},
      next:"Lin gestures toward the study area. ‘It's pretty chilly in here…’"
    },
    {
      line:"Lin rubs their hands and glances at the open window. ‘It's pretty chilly in here…’",
      replies:["It is. The weather turned colder this afternoon.", "Would you like me to close the window?", "Would moving to the sunny desk help? We could leave some fresh air coming in."],
      routes:[{repair:true},{outcome:{reaction:"‘Yes, please.’ You close it, and Lin relaxes. ‘I was hoping for help with the draft. Asking let me confirm that intention.’",consequence:"You close the window. The classroom becomes comfortable.",effect:{classroomComfort:'window'}}},{branch:'sunny'}],
      reaction:["‘True,’ Lin says, still shivering. ‘I was also hoping we could do something about the draft.’ Your observation was accurate, but it didn't address that wish."],
      repair:"Lin has now made the wish clearer. Offer an action rather than treating the first sentence as only a weather report.",
      repairs:["Would you like me to close the window?", "It should warm up later; let's keep working for now.", "Would you rather move to the sunny desk and keep the fresh air?"],
      repairRoutes:[{outcome:{reaction:"‘Yes, thanks.’ Lin stops shivering after you close it. A literal observation also functioned as a request in this setting.",consequence:"You close the window. The classroom becomes comfortable.",effect:{classroomComfort:'window'}}},{hint:"Lin shakes their head: ‘I'm cold now.’ The weather prediction may be true, but it doesn't respond to the present request for help."},{branch:'sunny'}],
      branches:{sunny:{line:"‘The sunny desk would be lovely. I do like the fresh air,’ Lin says. ‘Could you help me move the notes?’",replies:["Carry the notes to the sunny desk.", "Move the notes and offer to partly close the window if they're still cold."],outcomes:[
        {reaction:"Lin settles in the sun. ‘Much better. You understood my wish for comfort; closing the window wasn't the only way to help.’",consequence:"You move the study session to the sunny desk; the window stays open.",effect:{classroomComfort:'sunny'}},
        {reaction:"‘Let's try this first,’ Lin says. Soon they stop shivering. ‘Thanks for giving me a choice instead of assuming my preferred solution.’",consequence:"Lin chooses the sunny desk and keeps the window open.",effect:{classroomComfort:'sunny'}}]}}
    }
  ],
  nova: [
    {
      line:"A close friend texts, ‘Are you coming to my birthday tonight?’ You're busy. They sometimes use emoji and sometimes write short, plain messages. What would you send?",
      replies:["I won't be able to attend tonight.", "Ahh I wish 😭 already have plans, have the best night though!!", "Sorry, I can't make tonight. Hope it's a great birthday—coffee this weekend?"],
      routes:[{branch:'brief'},{outcome:{reaction:"The friend replies, ‘Aw, thanks! Catch you soon.’ Nova asks another visitor, who prefers fewer emoji. ‘Both reactions make sense; this friendship made yours work. We haven't learned who wrote it.’",consequence:"The birthday thread stays warm with an expressive reply."}},{branch:'plain'}],
      // Old saves may resume a repair here; both clear repairs still work.
      reaction:[], repair:"A friend wanted a little more warmth. Adapt to their reaction; don't treat their preference as a universal rule.",
      repairs:["Sorry I sounded abrupt. I hope you have a great birthday!", "I already declined, so there is nothing else to say.", "I can't make it, but I'd like to catch up another day."],
      repairRoutes:[{outcome:{reaction:"‘Thanks, see you soon!’ Nova notes that a warmer reply helped this person; it isn't an authorship test.",consequence:"You restore warmth to the birthday thread."}},{hint:"The friend already understood the refusal. They were asking about the relationship, so repeating only the refusal leaves that unresolved."},{branch:'plain'}],
      branches:{
        brief:{line:"The friend replies, ‘Got it—is everything okay between us?’ Nova says, ‘The message was clear. This friend wanted a relational cue too.’",replies:["All good! Sorry that sounded abrupt. Have a wonderful night.", "All good. I tend to text briefly, but I'd love to catch up this weekend."],outcomes:[
          {reaction:"‘Thanks! See you soon.’ Nova says, ‘You adjusted to this person's reaction. Brief messages can work elsewhere; this wasn't a test with one universal best style.’",consequence:"You reassure the friend after a brief birthday reply."},
          {reaction:"‘Ah, got it—weekend coffee sounds good.’ Nova says, ‘Explaining your style worked too. You didn't have to imitate the emoji version.’",consequence:"The friend understands your concise style and makes weekend plans."}]},
        plain:{line:"‘Coffee sounds great,’ the friend replies. Nova shows the same exchange to an expressive texter: ‘I'd have used a heart.’ How do you respond?",replies:["I'd keep the plain version. Offering another time feels warm to me.", "I'd add a heart if that fits this friendship. Both versions can work."],outcomes:[
          {reaction:"The visitor nods. ‘Fair—I'd read the coffee invitation as caring too.’ Nova keeps both versions on the board without ranking them.",consequence:"The lab displays a plain, warm reply alongside the expressive one."},
          {reaction:"‘That's how I'd write it,’ the visitor says. Nova leaves both versions up: ‘Personal preference and contextual fit can overlap without being identical.’",consequence:"The lab displays two defensible styles of birthday reply."}]}
      }, next:"Nova points at two unlabeled messages. ‘Now let's separate liking a style from claiming to know its author.’"
    },
    {
      line:"A visitor wants to label a polished message ‘AI-written’ and a casual message ‘human-written.’ They say it's a hunch from the style. What should our exhibit say?",
      replies:["The polished version feels more AI-like to me, so I'd label it probably AI-written.", "The casual version feels more human to me; I'd use that impression as our label.", "We can describe that impression, but we need different evidence to establish authorship."],
      routes:[{repair:true},{repair:true},{outcome:{reaction:"A visitor says, ‘I still have a hunch.’ Nova replies, ‘You can report it as a perception. We won't turn it into a verified source label.’ The exhibit leaves authorship undetermined.",consequence:"The lab exhibit separates style judgments from established authorship."}}],
      reaction:["A visitor who writes polished emails asks, ‘What evidence connects that style to the source of this particular message?’ Nova turns the proposed label face down.","A visitor says, ‘I asked a model for a casual draft yesterday.’ Nova asks how the exhibit could distinguish a hunch from evidence about this message."],
      repair:"Preserve the visitor's honest impression without presenting it as a source fact.",
      repairs:["Let's label it ‘perceived as more AI-like by this reader,’ with authorship undetermined.", "Let's keep ‘probably AI-written’ but add that it was only a style judgment.", "Let's remove the source label and describe the features that shaped the impression."],
      repairRoutes:[{outcome:{reaction:"‘That describes my impression accurately,’ the visitor says. Nova adds: ‘It doesn't certify the writer. We can like, find natural, and suspect AI in different ways.’",consequence:"The exhibit labels the perception and leaves authorship undetermined."}},{hint:"Nova points out that ‘probably AI-written’ still makes a claim about the source. A caveat doesn't supply the missing evidence; label the perception itself instead."},{outcome:{reaction:"The visitor points to polished transitions and sentence rhythm. Nova lists those features without assigning an author: ‘Now readers can discuss the impression without mistaking it for a finding.’",consequence:"The exhibit describes writing features without claiming to detect AI."}}],
      next:'Nova opens a drawer. “I have the fifth piece: the unedited festival programme. Doors open at seven; the stories start at seven thirty. Let’s assemble all five clues before telling the town.”'
    }
  ]
};
