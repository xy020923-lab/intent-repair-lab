# Intent Repair Lab

**README prose word count:** 361 (excluding headings, link URLs and this count line).

## Project status

A browser-based interactive simulation compares targeted confirmation with an open-ended repair question in a refund customer-service conversation. The user can try three goals: check an existing refund, start a refund, or change payment details outside the offered options. The dialogue, decision trace, and simple measures work locally. Order 2048, its status, and the handoff are invented. There is no real account access, trained intent model, payment change, or live human agent.

## Technology stack

HTML, CSS and plain JavaScript. A transparent keyword rule set simulates intent classification and a small state machine controls the dialogue. No API, external library, network call or secret is needed. A trained classifier and real service integration remain possible future work, not part of this prototype.

## Run or inspect

Open `index.html` in a modern browser. Choose a customer task and repair approach; press **Start / reset**. Send the prefilled request. Use the buttons or type a response. Repeat with another mode or scenario. Inspect `script.js` for the rules, states and sample data. The interface works offline.

To check the six scenario/mode paths, run `node test_demo.js` from this folder. This script requires Node.js and no packages.

## Development record

1. Narrowed the A1 research question to common, low-risk refund tasks so that the interaction could be demonstrated without a backend.
2. Added two repair approaches to expose the trade-off between quick recognition and space for an unanticipated goal.
3. Added “Something else” and human handoff after noticing that fixed options can trap a user whose actual need is missing.
4. Added visible status, turn counts and a decision trace so a reviewer can inspect the simulated behaviour and task outcome. Checked all three scenarios in both modes with a local state-machine test.

Relevant commits: [interface](https://github.com/xy020923-lab/intent-repair-lab/commit/8f30a299c0932d896ac783ce416ac8bcebf12b56), [layout](https://github.com/xy020923-lab/intent-repair-lab/commit/46751944dc5e7020e8c0f2ca33d3d54454d76450), and [dialogue logic](https://github.com/xy020923-lab/intent-repair-lab/commit/0eda5fe14f05a7e30cd608d5511f2c53dc393fb2). The report identifies the submitted commit separately.

## AI assistance

OpenAI Codex helped draft the prototype, report and diagrams from the A1 document and assignment instructions. Its output was checked against the A1 scope, the implemented JavaScript and the six demonstration paths. The rule-based mechanism and invented order data are explicitly labelled. No AI model runs inside the demo.

## Additional files

The report PDF is supplied separately. No ZIP is needed after the folder is uploaded to GitHub.
