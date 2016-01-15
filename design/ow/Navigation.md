#Navigation

##Routing
Rather than a router, our URL / navigation structure is based on the project/stack/card paradigm.

| url | meaning |
|---|---|
| aProject/ | card 1 of stack 1 of aProject |
| aProject/aStack | card 1 of stack “aStack” of aProject |
| aProject/aStack/aCard	 | card id “aCard” of stack “aStack” |
| aProject/aStack/2 | card 2 of stack “aStack” |

- **TODO**: Can we shortcut this for project that have only one stack to `aProject/aCard`?

##Parameters:
Each card can declare a number of `<Param>`s:  named input variables from the URL.
 
	<Card>
		<Params>
			<Param name=“selector” type=“text” value=“images”/>
			<Param name=“sort” type=“text” value=“newest”/>
			<Param name=“page” type=“number” value=“1”/>
		</Params>
	</Card>

- Parameters are available as `card.selector` or `card.sort`
- Parameters can be added to the url as normal URL parameters, eg:
		`project/stack/card?selector=people&sort=popular`
- **TODO**: store these in persistent `state` variables?
- **TODO**: some sort of more RESTy version of this would be cool…


##Remembering parameters / locking
- If the card is not locked:
	- the parameters are part of the card state
	- thus the parameters should be stored / reset automatically when going back to the card
- if the card IS locked:
	- the parameters get reset when they come back to the card
