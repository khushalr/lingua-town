/* The Stolen Voice: fictional teaching conversations.
   Each branch advances the same case; style choices do not score authorship. */
window.LinguaConversations = {
  "mina": [
    {
      "line": "Leila saw someone leave the square carrying a red book. Now everyone wants her to name the thief. She's my friend, and she's stopped answering. Help me get her side of it?",
      "replies": [
        "Leila, please provide a complete witness statement for the investigation.",
        "Leila, that sounds like a lot. Want to tell me what you saw, just us?",
        "Detective Leila, I could use my partner. Café booth, usual order?"
      ],
      "routes": [
        {
          "repair": true
        },
        {
          "branch": "quiet"
        },
        {
          "branch": "playful"
        }
      ],
      "reaction": [
        "Leila: ‘Am I in trouble? I saw a book, not a crime.’ Mina sighs. ‘That sounded like an interrogation.’"
      ],
      "repair": "A precise request can still create unwanted distance. Give Leila room to speak as a friend.",
      "repairs": [
        "Sorry, that sounded official. You're not in trouble. Tell me only what you remember.",
        "An official tone will make your memory more accurate.",
        "Bad detective voice. Start over? We can talk over our usual drinks."
      ],
      "repairRoutes": [
        {
          "branch": "quiet"
        },
        {
          "hint": "Mina: ‘Formality doesn't improve memory. She needs to know we aren't accusing her.’"
        },
        {
          "branch": "playful"
        }
      ],
      "branches": {
        "quiet": {
          "line": "Leila sits down. ‘A red cover, a gold star, blue cloth around it. I couldn't see the person's face.’ What do you ask?",
          "replies": [
            "Did you notice which way they went?",
            "Would you rather draw the route than describe it?"
          ],
          "outcomes": [
            {
              "reaction": "‘Toward the library. That's all I know.’ Mina writes down the details without adding ‘thief’. For this friend, a private conversation helped.",
              "consequence": "Leila describes a star-marked red book going toward the library.",
              "effect": {
                "cafeStyle": "quiet"
              }
            },
            {
              "reaction": "Leila draws a line from the square to the library. ‘Thanks for not making me name someone.’ The format changes; her evidence stays the same.",
              "consequence": "Leila sketches the route to the library in a quiet café booth.",
              "effect": {
                "cafeStyle": "quiet"
              }
            }
          ]
        },
        "playful": {
          "line": "Leila almost smiles. ‘Fine, partner. Red book. Gold star. Blue cloth. Someone carried it toward the library. But no jokes in the town report, okay?’",
          "replies": [
            "Deal. I'll write exactly that, without guessing who it was.",
            "Of course. Want somewhere quieter while I write it down?"
          ],
          "outcomes": [
            {
              "reaction": "‘That's my Mina.’ The shared joke opened the conversation; Leila's next request sets a different tone for the report.",
              "consequence": "Mina and Leila keep their detective joke private and report the route accurately.",
              "effect": {
                "cafeStyle": "playful"
              }
            },
            {
              "reaction": "‘Yes, please.’ Mina adjusts when Leila asks. No single tone works for every moment, even between friends.",
              "consequence": "Leila gives her account from a quiet café table.",
              "effect": {
                "cafeStyle": "quiet"
              }
            }
          ]
        }
      },
      "next": "Mina folds Leila's sketch. ‘Red cover, gold star, blue cloth. Let's check that description with the organizers before we call it the missing book.’"
    },
    {
      "line": "The committee has the storybook's inventory card. We need to compare it with Leila's account. What should I send?",
      "replies": [
        "We've found your thief. Someone took a red book toward the library.",
        "Could you confirm the missing book's cover and wrapping? A witness saw a red book with a gold star in blue cloth.",
        "Hi! We're following a lead toward the library. Does a red, star-marked book in blue cloth match your inventory?"
      ],
      "routes": [
        {
          "repair": true
        },
        {
          "outcome": {
            "reaction": "The committee replies: ‘That matches. It holds the town's handwritten stories. Theo was helping near the stand before it vanished.’",
            "consequence": "The inventory matches Leila's description; Theo is the next lead.",
            "effect": {}
          }
        },
        {
          "branch": "friendly"
        }
      ],
      "reaction": [
        "The committee asks, ‘Did anyone see a theft, or just someone carrying a book?’ Mina deletes the accusation."
      ],
      "repair": "Adapt the message for people checking an inventory. Keep an observation separate from an accusation.",
      "repairs": [
        "Correction: we saw a matching book being carried. Could you check its description?",
        "A missing book makes anyone carrying one a thief.",
        "Can you compare this description with your inventory before we make a claim?"
      ],
      "repairRoutes": [
        {
          "outcome": {
            "reaction": "‘Red cover, gold star, blue cloth: yes.’ The committee sends you to Theo, who was working near the stand.",
            "consequence": "The committee confirms the book description and points to Theo.",
            "effect": {}
          }
        },
        {
          "hint": "Mina: ‘Carrying a book doesn't tell us whether the person had permission.’"
        },
        {
          "branch": "friendly"
        }
      ],
      "branches": {
        "friendly": {
          "line": "The committee confirms the match. ‘Theo spoke to the people at the stand. Do you want the inventory card or the witness sketch for him?’",
          "replies": [
            "Take the inventory card and explain what Leila saw.",
            "Take the sketch and quote the matching inventory description."
          ],
          "outcomes": [
            {
              "reaction": "Mina clips the card to the sketch. ‘Either way, Theo gets both the route and the object we're looking for.’",
              "consequence": "You carry the matched description and route to Theo.",
              "effect": {}
            },
            {
              "reaction": "‘Good. The facts stay the same even when the format changes.’ Mina points across the square toward the library.",
              "consequence": "You bring Leila's route and the confirmed book description to Theo.",
              "effect": {}
            }
          ]
        }
      }
    }
  ],
  "theo": [
    {
      "line": "People heard me say, ‘I wouldn't leave that book there.’ Now they think I wanted the town's stories removed. I was pointing at water dripping onto the stand. What was I doing with those words?",
      "replies": [
        "You literally said what you would do; there can't be a request in that.",
        "In that situation, it sounds like a warning to move the book somewhere dry. Is that what you meant?",
        "You were ordering the festival to stop. The wording makes that clear."
      ],
      "routes": [
        {
          "repair": true
        },
        {
          "branch": "help"
        },
        {
          "repair": true
        }
      ],
      "reaction": [
        "Theo: ‘I didn't use an imperative, but I was trying to get someone to protect the book.’",
        null,
        "Theo points to the wet canopy. ‘I wanted the stories dry, not silenced.’"
      ],
      "repair": "The literal sentence describes a hypothetical action. Context can make it an indirect warning or request; check the intended goal.",
      "repairs": [
        "Were you asking someone to move it out of the leak?",
        "Then any warning must mean the festival is cancelled.",
        "Could you show me what you were pointing at when you said it?"
      ],
      "repairRoutes": [
        {
          "branch": "help"
        },
        {
          "hint": "Theo: ‘Nothing I said settles whether the festival goes ahead. Look at the leak.’"
        },
        {
          "branch": "help"
        }
      ],
      "branches": {
        "help": {
          "line": "‘Yes. Lin heard me and organized a rescue. I watched the book leave in blue cloth, but I didn't see where it ended up.’ How should we preserve that distinction?",
          "replies": [
            "Mark the leak and the route on a map; leave the destination unconfirmed.",
            "Ask Theo to show the volunteers the leak while you follow the book's trail."
          ],
          "outcomes": [
            {
              "reaction": "Theo marks the stand. ‘A warning explains why someone moved it. We still need to find it.’",
              "consequence": "Theo maps the leak; the book's final destination is still unknown.",
              "effect": {
                "libraryHelp": "map"
              }
            },
            {
              "reaction": "Theo gathers the volunteers. ‘I'll show them the damage. Lin can tell you who arranged the move.’",
              "consequence": "Theo shows the leak to volunteers while you follow the rescue trail.",
              "effect": {
                "libraryHelp": "escort"
              }
            }
          ]
        }
      },
      "next": "Theo produces a witness's reply. Asked ‘Did you see who took it?’, they answered: ‘I saw a lantern heading toward the market.’"
    },
    {
      "line": "‘I saw a lantern heading toward the market.’ That's all the witness said when asked who carried the book. What can we put in the case file?",
      "replies": [
        "The reply suggests they couldn't identify the carrier. Let's ask whether they saw a face or the book.",
        "The lantern must belong to the thief; we have identified them.",
        "They may be offering a direction instead of an identity. Ask what they actually saw."
      ],
      "routes": [
        {
          "outcome": {
            "reaction": "The witness clarifies: ‘No face. A blue bundle and a moving lantern.’ Theo adds Lin's rescue slip. ‘Lin arranged the move; start there.’",
            "consequence": "A lantern and blue bundle went toward the market; the carrier is unidentified.",
            "effect": {}
          }
        },
        {
          "repair": true
        },
        {
          "branch": "check"
        }
      ],
      "reaction": [
        null,
        "Theo: ‘A lantern is a useful lead, not a person's identity. That answer doesn't establish theft either.’"
      ],
      "repair": "A relevant but incomplete answer can suggest a limit to the speaker's knowledge. Test that inference rather than promoting it to fact.",
      "repairs": [
        "Let's ask whether they could see the carrier's face.",
        "We'll write ‘lantern thief’ and investigate later.",
        "Record the direction, then check whether the witness saw the blue bundle."
      ],
      "repairRoutes": [
        {
          "branch": "check"
        },
        {
          "hint": "Theo: ‘That label invents both an identity and a crime.’"
        },
        {
          "branch": "check"
        }
      ],
      "branches": {
        "check": {
          "line": "The witness says, ‘I saw a lantern and blue cloth. I couldn't see a face.’ Lin's signed rescue slip is tucked behind the account. What do we record?",
          "replies": [
            "A blue bundle travelled toward the market; carrier unidentified. Follow up with Lin.",
            "The witness gives a route, not a name. Ask Lin who arranged the rescue."
          ],
          "outcomes": [
            {
              "reaction": "Theo nods. ‘The follow-up confirmed the limit we inferred.’",
              "consequence": "The trail leads through Lin's rescue slip toward the market.",
              "effect": {}
            },
            {
              "reaction": "‘Exactly. More information, without making the witness claim more than they saw.’",
              "consequence": "You take the witness account to Lin for the next link in the trail.",
              "effect": {}
            }
          ]
        }
      }
    }
  ],
  "prof": [
    {
      "line": "My first update said, ‘Some pages were rescued.’ People took that to mean the rest of the town's stories were gone. Before I open the page count, what does that sentence alone tell you?",
      "replies": [
        "At least one page was rescued; it can suggest not all, but doesn't rule out all.",
        "Only some survived. The remaining stories are definitely lost.",
        "It doesn't give a final total. Were all the pages rescued?"
      ],
      "routes": [
        {
          "outcome": {
            "reaction": "Lin opens the tally: ‘All forty pages, in fact. I sent the first update before the count was finished.’ The later sentence cancels the usual ‘not all’ inference without contradicting ‘some’.",
            "consequence": "The complete tally confirms all forty pages were rescued.",
            "effect": {}
          }
        },
        {
          "repair": true
        },
        {
          "branch": "count"
        }
      ],
      "reaction": [
        null,
        "Lin: ‘All forty survived. “Some” didn't promise that others were lost; that was an understandable inference, not an entailment.’"
      ],
      "repair": "Separate a suggested upper limit from what the words require to be true.",
      "repairs": [
        "Then ‘some—in fact, all’ is consistent. Let's correct the missing-pages claim.",
        "If all survived, your earlier statement must have been false.",
        "Let's check the tally rather than infer a final total from ‘some’."
      ],
      "repairRoutes": [
        {
          "outcome": {
            "reaction": "‘Exactly.’ Lin gives you the final count and the courier's delivery slip.",
            "consequence": "All forty pages survived; the delivery slip leads onward.",
            "effect": {}
          }
        },
        {
          "hint": "Lin: ‘If all forty survived, at least one did. The earlier statement was less informative, not false.’"
        },
        {
          "branch": "count"
        }
      ],
      "branches": {
        "count": {
          "line": "‘All forty. The courier took them to Jules's covered stall.’ The first update was sent before counting ended. How do we correct it?",
          "replies": [
            "All forty pages were rescued. The earlier ‘some’ update wasn't a final count.",
            "No pages are missing from the tally. Follow the delivery slip to Jules."
          ],
          "outcomes": [
            {
              "reaction": "‘Good. Your correction gives the stronger information we now have.’",
              "consequence": "Lin verifies all forty pages and the transfer to Jules.",
              "effect": {}
            },
            {
              "reaction": "‘Exactly. We know the count, but still need the book's current location.’",
              "consequence": "The final tally rules out missing pages; Jules is the next lead.",
              "effect": {}
            }
          ]
        }
      },
      "next": "Lin reaches for the delivery slip on the windowsill. A gust lifts its corner. ‘That paper won't stay there for long…’"
    },
    {
      "line": "The delivery slip is our only link to the courier. The window is open. Lin says, ‘That paper won't stay there for long…’ How do you respond?",
      "replies": [
        "It probably won't. Anyway, tell me more about the courier.",
        "Shall I close the window before the slip blows away?",
        "Want me to move it to the sheltered table and weigh it down?"
      ],
      "routes": [
        {
          "repair": true
        },
        {
          "outcome": {
            "reaction": "‘Please.’ You close the window. Lin hands you the slip: ‘I followed the courier with the lantern.’ Jules wrote it.",
            "consequence": "You secure Jules's delivery slip by closing the window.",
            "effect": {
              "classroomComfort": "window"
            }
          }
        },
        {
          "branch": "sunny"
        }
      ],
      "reaction": [
        "The slip slides toward the edge. Lin: ‘I was hoping you'd help me keep it here.’"
      ],
      "repair": "A prediction can also function as a request. Identify the goal; more than one action can achieve it.",
      "repairs": [
        "I'll close the window. Is that okay?",
        "The prediction was accurate, so nothing else is needed.",
        "Let's carry the slip to the sheltered table."
      ],
      "repairRoutes": [
        {
          "outcome": {
            "reaction": "Lin nods. The slip is safe: ‘I followed the courier with the lantern.’ Take it to Jules.",
            "consequence": "The delivery slip is safe beside a closed window.",
            "effect": {
              "classroomComfort": "window"
            }
          }
        },
        {
          "hint": "Lin: ‘Agreeing with me doesn't protect our only delivery record.’"
        },
        {
          "branch": "sunny"
        }
      ],
      "branches": {
        "sunny": {
          "line": "‘Yes, let's keep the air.’ Lin reads the rescued slip: ‘I followed the courier with the lantern.’ Whose lantern? Jules will know. How do you secure the paper?",
          "replies": [
            "Lay it flat under a paperweight, then copy the exact words.",
            "Photocopy it and return the original to a folder on the table."
          ],
          "outcomes": [
            {
              "reaction": "Lin checks your copy. ‘Same words, still two possible readings. Ask Jules before following the wrong person.’",
              "consequence": "You preserve the slip on the sheltered table and take its wording to Jules.",
              "effect": {
                "classroomComfort": "sunny"
              }
            },
            {
              "reaction": "‘Thank you.’ The original stays protected; you take a copy to its writer.",
              "consequence": "The delivery slip is safe on the sheltered table.",
              "effect": {
                "classroomComfort": "sunny"
              }
            }
          ]
        }
      }
    }
  ],
  "nova": [
    {
      "line": "You traced the bundle to Crate B. It's here, with a red book inside. A message says, ‘The stories are safe with me.’ A polished version and a casual version are circulating. Which should we trust enough to call the search off?",
      "replies": [
        "The casual one. It sounds like someone from town.",
        "The polished one. It sounds more official.",
        "Neither style proves it. Check the book's gold star, count its pages, and compare the delivery record."
      ],
      "routes": [
        {
          "repair": true
        },
        {
          "repair": true
        },
        {
          "branch": "verify"
        }
      ],
      "reaction": [
        "Nova: ‘A friendly sentence can be copied or generated. Familiar wording doesn't identify this book.’",
        "Nova: ‘An official tone can be imitated too. We need the object and its record.’"
      ],
      "repair": "Naturalness, preference, and perceived authorship are judgments about wording. None authenticates the book or its contents.",
      "repairs": [
        "Check the inventory and count the forty pages before announcing a recovery.",
        "Average the two styles and call the result trustworthy.",
        "Compare the courier's signed slip and the book's identifying marks."
      ],
      "repairRoutes": [
        {
          "branch": "verify"
        },
        {
          "hint": "Nova: ‘Combining styles doesn't create evidence.’"
        },
        {
          "branch": "verify"
        }
      ],
      "branches": {
        "verify": {
          "line": "The gold star matches the inventory; all forty numbered pages are here. Nova's receipt matches Jules's transfer. ‘The book is found. But that note on the empty stand—why did it say “Tonight, your voice is mine”?’",
          "replies": [
            "Compare the note with the rehearsal scripts from the same crate.",
            "Ask for the complete page around that sentence, including speaker labels."
          ],
          "outcomes": [
            {
              "reaction": "Nova opens a rehearsal script. There is the sentence—under a character's name. ‘Let's read the lines around it.’",
              "consequence": "You recover the complete storybook and locate the note's source in a script.",
              "effect": {}
            },
            {
              "reaction": "Nova finds the full page. ‘Here is the context the loose cue card left out.’",
              "consequence": "The authenticated book is recovered; the full script can explain the note.",
              "effect": {}
            }
          ]
        }
      },
      "next": "The script reads: VOICE THIEF: ‘Tonight, your voice is mine.’ CHORUS: ‘Then we'll tell our stories together.’ A prop list identifies the loose note as the Voice Thief's cue card."
    },
    {
      "line": "Nova checks the prop list: the cue card was left at the stand during rehearsal, before the rain. The book was moved later. Does the same sentence do the same thing on stage and in an unsigned note?",
      "replies": [
        "Yes. ‘Your’ must always refer to whoever is reading, so it is still a real threat.",
        "No. In the script, ‘I’ and ‘your’ belong to fictional roles. On the stand, readers supplied a real speaker and target.",
        "The card is in a script, so nobody could reasonably have felt threatened."
      ],
      "routes": [
        {
          "repair": true
        },
        {
          "branch": "context"
        },
        {
          "repair": true
        }
      ],
      "reaction": [
        "Nova points to the cast list. ‘On stage, “I” is the Voice Thief and “your” addresses the chorus—not the actor and the audience as real people.’",
        null,
        "Nova: ‘They saw an empty stand and an unsigned sentence. Their reading made sense with incomplete context; now we can revise it.’"
      ],
      "repair": "Track who is speaking to whom, and whether the words are a performed quotation or a real-world act.",
      "repairs": [
        "The script and prop record explain the line. The loose card hid that context.",
        "Its scary style proves someone intended to threaten us.",
        "The fear was understandable, but the full records support a rehearsal line and a separate rescue."
      ],
      "repairRoutes": [
        {
          "branch": "context"
        },
        {
          "hint": "Nova: ‘Style alone doesn't establish who was speaking, to whom, or with what intention.’"
        },
        {
          "branch": "context"
        }
      ],
      "branches": {
        "context": {
          "line": "‘The records fit,’ Nova says. ‘A warning prompted a rescue. A cue card looked like a threat. A vague update and ambiguous directions hid the trail.’ How do we explain it to Leila?",
          "replies": [
            "You weren't wrong to be worried. We found the book and the context missing from the note.",
            "You helped find the book. The note was a rehearsal line; here's the complete page."
          ],
          "outcomes": [
            {
              "reaction": "Leila exhales. ‘So I didn't send everyone after a thief?’ Nova: ‘You told us what you saw. That helped.’",
              "consequence": "The cue card and rescue records explain the apparent theft without blaming a witness.",
              "effect": {}
            },
            {
              "reaction": "‘Oh. That changes everything.’ Nova lays the cue card beside the script, and the delivery slips beside the recovered book.",
              "consequence": "The note is matched to its theatrical source; the rescue trail is complete.",
              "effect": {}
            }
          ]
        }
      },
      "next": "Nova puts the red book in your hands. ‘Before we return it to the square, show me how the five clues fit. Then you choose how to tell the town.’"
    }
  ]
};
