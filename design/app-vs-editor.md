Owen’s thoughts after general discussion on Mar 24
===

- We’ve decided to use “page” as the main unit of display, in place of “card”.

- It doesn’t make sense for an "editor page” to include multiple “pages” — one special “page” we’re currently editing (the “current page”) and a bunch of “editor pages” for the various editor toolbars.  

- It seems really confusing to try to explain how the editor or player works because we’re re-using the same term for everything, and conflating “system stuff” (editor) with “user stuff” (current page).

- The “player app" will have a menubar, some sort of generic notification mechanism, open/save dialogs, possibly a “message box” etc.  So even in the “player” we’ll have decorators around the “current page” and dialogs/overlays for manipulating the current state of the app.

- Part of the plan is to have a “component editor”, where you can drag-and-drop to create custom .jsxe components for use in projects.  This can be used to create the “toolbars” and “sidebars” for the editor dynamically within oakjs, without requiring each bit to be a separate “page”.


Proposal
---
- Internally, we have exactly 2 “projects” open at the same time:
	- the “ui” project which controls the chrome around:
	- the “current project” which we’re actually displaying / editing

- the URL is dictated by the (app or editor) “ui” project , eg:
	- `/projects`
		- shows the “project finder” page of the player or editor “ui"
	- `/project/PROJECT/SECTION/PAGE`
		- shows the “page runner” page of the player “ui”
	- `/edit-page/PROJECT/SECTION/PAGE`
		- shows the “page layout editor” page of the editor “ui”


Implementation Details
---
- The root JS object in the system remains “app”, whether in “editor” or “player” mode.
	- There is exactly one "current page”, “-section” and “-app” that we’re playing/editing at a time
	- These structures are accessible as `app.page`, `app.section`, `app.project`.

- The “editor app" is a `Project` which has a number of `Sections` and `Pages`.
	- On those “editor pages" are “editor components” (defined in the editor project) + the “`CurrentPage`” that we’re editing.

- The “player app” is a project just like the “editor app” (or possibly a subset of the editor app).
	- These “player pages” can likewise have components sprinkled around or on top of the `CurrentPage`.

- We’ll use the term “app.ui” to refer to the “editor page” around the `CurrentPage`.
	- Thus the current “editor page” or “player page" we’re displaying is accessible as `app.ui.page`, `app.ui.section`, `app.ui.project`.
	- Note that this concept of a “second project” will be hidden from anyone who’s not modifying the editor itself.

- Whether you’re in the “editor” or the “player”, there is a single “app.state” which controls, eg
	- the path to the “current page"
	- the current “selection" (assuming “selection” makes sense in the “player", which I think it does)
	- whether we’re in “editing” mode, etc

	Note that some bits of this app state will be persisted to localStorage so that,
		  on the same machine/browser, you can reload and be in the same state as you were before.
		  However, changing these bits of state will still go through the “app.actions” mechanism.



More to think about
---

- Dialogs
	- In Studio, we had “Dialogs” as peers of “Pages” which can be displayed from the UI.
	- We also had high-level “Menus”, etc (eg: ContextMenus)
	- Modify the section “index.json” index to reflect that we can have `Page`s and `Dialog`s within a `Section` ?

- Do `Section`s and `Project`s have visual artifacts?
	- The ability to have a `PageMenu` defined at the `Section` level so it applies to all cards is actually really useful.
	- The proposal above makes that proposal viable again, since there are only 2 “pages” active at a time.
	- However, when selecting to “edit the current page”, we’ll have to distinguish those bits that are editable (because they’re in the `Page`)
		from those in the `Section` which are probably (?) not currently editable.
	- This is likely to be confusing to users.
	- This need could be solved with Templates, but that will have the same selection problem.
