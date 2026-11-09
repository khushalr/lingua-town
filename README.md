# Lingua Town: The Stolen Voice

A short, offline pixel-art mystery for introductory linguistics. The town's handwritten storybook disappears before Story Night; an unsigned note reads, “Tonight, your voice is mine.” Players recover it by interpreting conversations and tracing evidence.

Open `index.html` in a browser or serve this directory with any static HTTP server. GitHub Pages serves the root files; there is no build step, package installation, or backend.

## The learning route

| Encounter | Player activity | Concepts | Contribution to the case |
| --- | --- | --- | --- |
| Mina | Interview a worried friend; check an inventory | Register, audience design, conversational repair | Match the book and establish its first direction without inventing a suspect |
| Theo | Interpret a warning; question an incomplete witness answer | Cooperation, indirect meaning, conversational implicature | Discover the leak and trace a blue bundle and lantern toward the market |
| Professor Lin | Evaluate “some”; respond to an indirect request | Scalar implicature versus entailment, indirect speech acts | Verify all forty pages and protect the delivery record |
| Jules | Rearrange two ambiguous records | Prepositional-phrase attachment, coordination and modifier scope | Identify the lantern carrier and Crate B, then follow its transfer to Nova |
| Dr. Nova | Authenticate the book; interpret a complete script | Style versus authorship, deixis, speaking context | Recover the book and distinguish a theatrical cue card from a real-world threat |

The final reconstruction uses all five clues. Three valid announcements produce different epilogues. Dialogue repairs do not deduct points; different successful styles earn equal progression. Field notes explain the concept after the interaction. The story has no real-time countdown.

## Progress and comparison judgments

Gameplay progress is saved locally under `lingua-town-stolen-voice-v2-progress`. This case deliberately starts independently of the previous festival-cancellation story; the older save is left untouched. New Game resets only the current case.

Nova's optional blind comparison desk is a **teaching prototype**, not a research study. It asks personal preference, naturalness in context, and perceived AI authorship separately, with equal/uncertain responses. Each pair's A/B order is randomized once and stays stable throughout its questions. Feedback follows all three judgments. Judgments remain only in memory and are cleared on closing the desk. They are not included in gameplay saves, sent anywhere, graded, or assigned a source answer key. The samples are constructed examples without verified human/AI provenance.

A later research version should be separate from this lesson flow: establish consent and applicable ethics approval, use documented stimulus provenance, collect blind pre-lesson baselines, separate post-lesson measures, balance presentation order, and define retention/export/deletion controls. Ratings taken after these lessons would be influenced by instruction and should not be described as an unprimed baseline. Preference data alone would not establish a causal tradeoff between a model's writing and coding/math ability.

## Checks

```sh
node --check game.js
node --check dialogue-content.js
node --check lab-comparisons.js
node --test tests/story.test.cjs
```

The dependency-free tests validate dialogue routes, exercise the actual game state transitions with a minimal DOM adapter, check both puzzles and all endings, restore partial conversations and completed saves, and verify comparison-session ordering and disposal. Browser QA is still needed for visual layout and movement.
