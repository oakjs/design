#The Nature of Data

Pieces of "data/configuration" we need to store


 Who | What | Who Changes It?
-----|------|----------------
"configuration" | Directory structure + pre-defined fields for project/stack/card/components -- the shape of which is the same for all instances of that data type. (includes indexes, card.jsx, card.js) | Explicit changes by IDE or Developer, implicit changes by the system (eg: new component was added).
"state" | Per card/stack/project data which affects what's being seen (eg: current card, current sort on current card, etc).  This data may or may not be persisted across sessions. | Implicit changes by End User
"preferences" | Per-app choices explicitly provided/manipulable by the user (eg: "Send an email when something is due")| Explicit changes by End User
"content" | Persisted card content (same for all users who see that card), which is stored with the card. | Explicit changes by End User, IDE or Developer
"data" | External datasets which are used by a card to do it's thing. | Implcitly provided/chanaged by the external datasource.  May be explicitly affect by end user actions.
"profile" | Per-user "profile" information for organizations and users (name, email address, etc).  This data is not project/stack specific. | Explicit change by End Users




- gulp/etc/watchers

- Card/Stack/Project/etc components (player)
- SUI Components

- JSXParser
