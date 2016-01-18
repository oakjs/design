#Component scoping

	
###Plan for Manually Scoping

At each theme/project/stack/card level, we generate `components/index.js` file.  



######projects/PROJECT/stacks/STACK/cards/CARD/components/.index.json
Ordered list of components derived from files/folders in the components folder:
		
	{
		"components": [
			{ "path": "ComponentA", "modified": "<date>" },
			{ "path": "ComponentB", "modified": "<date>" },
		]
	}

###### projects/PROJECT/stacks/STACK/cards/CARD/components/.index.js:
We then generate the following from the above:
	
	// Get named components defined at the stack level.
	import { default as superComponents } from "../../../components/";

	// Copy supers into local `components` map
	const components = Object.assign({}, superComponents);
	
	// Add components from the card's component directory explicitly:
	import { default as ComponentA } from "./ComponentA";
	import { default as ComponentB } from "./ComponentB";

	// add the card-specific ones to `components`, overriding the supers
	Object.assign(components, exports);
	
	// export components map as default
	export default components;
		

###### projects/PROJECT/stacks/STACK/cards/CARD/.card.jsx
In the `card.jsx` file, we'll bring this composited components file into scope as `$$` or something and then prefix all jsx components with it:

	import oak from "oak";
	import $$ from "../components/.index.js"
	
	export default class Card extends oak.Card {
		render() {
			const { card, template, stack, project, data } = this.props;
			const { state } = this;
			return (
				<$$.ComponentA ...>
					<$$.ComponentB/>
					<$$.ParentComponent/>
					<div/>
				</$$.ComponentA>
			);
		}
	}
	

###### projects/PROJECT/stacks/STACK/cards/CARD/card.jsxs:
The `card.jsxs` file we're actually creating/manipulating is just the contents of the `return (...)` bits inside the `render()` function, **without** the `$$.` bits:

	<ComponentA ...>
		<ComponentB/>
		<ParentComponent/>
		<div/>
	</ComponentA>