#Component scoping

##Design goals:

- Each level of the heirarchy (theme/project/stack/card) can specify components which override parent components of the same name (eg: to have a specialized Button class for a card).
- The IDE shouldn't have to worry about component scoping when manipulating `.jsxs` files.
- Developers editing `card.jsxs` files manually should not have to worry about component scoping.
- Card authors creating custom components should be able to pull in the nested component heirarchy and work with it easily (eg: they don't have to worry about where components come from either).
- Ideally we'd be able to use babel/eslint/etc to catch missing component errors.

---

## Component Index:
Ordered list of components derived from files/folders in the components folder.  

- Maintained automatically by watching the components folder.  
- New, unknown components are added to the end of the list.  
- MAY BE edited by hand to change the include order.
		
######projects/PROJECT/stacks/STACK/cards/CARD/components/index.json
	[
		{ "path": "ComponentA", "modified": "<date>" },
		{ "path": "ComponentB", "modified": "<date>" },
	]


## Component include file

JS file which bundles card components with project + template components into a single namespace.

- Generated from the `index.json` file whenever that file changes.
- MUST NOT be edited by hand.
- **TODO:** How to we get a pointer to the template's component index file?
	- Could have a symbolic link to the template's folder within the card folder?

###### projects/PROJECT/stacks/STACK/cards/CARD/components/.index.js:

	const components = {};
	
	// Get named components defined at the stack level and copy into components map.
	import { default as stackComponents } from "../../../components/.index.js";
	Object.assign(components, superComponents);
	
	// Get named components defined at the template level.
	import { default as templateComponents } from "TODO: TEMPLATE PATH???"
	Object.assign(components, templateComponents);

	// Add card's components directory to exports:
	import { default as ComponentA } from "./ComponentA";
	import { default as ComponentB } from "./ComponentB";

	// add the card-specific ones to `components`, overriding the supers
	Object.assign(components, exports);
	
	// export components map
	export default components;

## Sample card.jsxs file
The `card.jsxs` file the developer or IDE is actually creating/manipulating.

- Generally created via the IDE.
- MAY BE edited by hand.

###### projects/PROJECT/stacks/STACK/cards/CARD/card.jsxs:

	<ComponentA ...>
		<ComponentB/>
		<ParentComponent/>
		<div/>
	</ComponentA>


## Sample card.js file
Extra logic included in the card at runtime.

- A single object of methods / getters / setters / etc.
- Generally created via the IDE.
- MAY BE edited by hand.
- *TODO:* Ideally a developer can directly lint this file, but that won't work without a class wrapper around the methods, includes, etc... ???

###### projects/PROJECT/stacks/STACK/cards/CARD/card.js:

	static const FOOBAR = "FOOBAR";

	someMethod() {
		super.someMethod();
		...
	}
		
	get foo() {...}
		
	



## Compiled Card Output file
JSX file which wraps the `.jsxs` file and creates a fully-legal .jsx file.

- Generated automatically whenever `card.jsxs` file changes.
- MUST NOT be edited by hand.
- NOTE: we may want to bring in, eg @memoize, etc here for developers

###### projects/PROJECT/stacks/STACK/cards/CARD/.card.jsx

	import React as "react";
	import oak from "oak";
	import $$ from "../components"
	
	export default class Card extends oak.Card {
		/**--------------------------------------**/
		/** stuff from card.js                   **/
		/**--------------------------------------**/
		
		static const FOOBAR = "FOOBAR";

		someVar = foo;
		
		someMethod() {
			super.someMethod();
			...
		}
		
		get foo() {...}
		
		/**--------------------------------------**/
		/** end stuff from card.js               **/
		/**--------------------------------------**/
		
		render() {
			const { card, template, stack, project, data } = this.props;
			const { state } = this;
			return (
				/**--------------------------------------**/
				/** stuff from card.jsx with `$$.` added **/
				/**--------------------------------------**/
				
				<$$.ComponentA ...>
					<$$.ComponentB/>
					<$$.TemplateComponent/>
					<$$.ParentComponent/>
					<div/>
				</$$.ComponentA>
				
				/**--------------------------------------**/
				/** end stuff from card.jsx              **/
				/**--------------------------------------**/
			);
		}
	}
	

	
