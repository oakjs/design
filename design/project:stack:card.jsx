
// PROJECT JSX
<Project id="baz" numeric={1} booleanProp={true} locked={foo==bar}>
  <Stack id="foo" title="Foo"/>
</Project>

// Translates To:
{
  TYPE:"Project",
  props: { id:"baz", numeric:1, booleanProp:true, locked=expression("foo==bar") },
  children: [
    {
      TYPE:"Stack",
      props: { id:"foo", title:"Foo" }
    }
  ]
}


// STACK JSX
<Stack id="foo" title="Fooo" ...>
  <ComponentRef path="..."/>
  <CardRef id="x" title="x-card" template={14} locked={foo==bar}/>
  <CardRef id="y" title="y-card" template={12}/>
  <CardRef id="z" title="z-card" template={12}/>
</Stack>


// CARD JSX
<Card id="collaborations" template="main" title="Collaborations" locked {...props}>
  // card parameters accessible in URL, passed as card getter/setters ?
  <Param name="selector" type="text" values={["images", "people"]} default="images"/>
  <Param name="sort" type="text"/>
  <Param name="filter" type="text"/>

  <Toolbar ref="header" layout="flow" className="top attached hiding">
    <Spacer width={50}/>
    <Menu appearance="pointing">
      <Item action="NAVIGATE" params="/explore/images?selector=images"
        active={card.selector === "images"} label="Images"/>
      <Item action="NAVIGATE" params="/explore/people?selector=people"
        active={card.selector === "people"} label="People"/>
    </Menu>
    <Spacer spring/>
    <Component path="MeteorImages/sortSelector" source="card.sort"/>
    <Component path="MeteorImages/filterSelector" source="card.filter"/>
  </Toolbar>

  <Component path="MeteorImages/ImageListViewer" preset="fullPageScroller"
    selector={card.selector} sort={card.sort} filter={card.filter}/>
</Card>



// UPDATE CARD API CALL
/api/updateCard/project=X/stack=Y/card=Z
  PAYLOAD:  cardJSXText

// START TRANSACTION

// convert card text into a wrapper object
const cardJSX = JSX.parse(cardJSXText);

// save card text to disk
oak.server.saveCardJSX({ project:"X", stack:"Y", card:"Z", jsx:cardJSX });

// load stack from disk into it's JSX representation
const stackJSXText = oak.server.loadStackJSX({ project:"X", stack:"Y" });
const stackJSX = JSX.parse(stackJSXText);

// figure out the card reference data
const cardRef = cardJSX.getRefJSX();

const stackOutputJSX = stackJSX.replaceWith("CardRef#Z", cardRef);
// OR: stackJSX.find("CardRef#Z").replaceWith(cardRef);

oak.server.saveStackJSX({ project:"X", stack:"Y", jsx:stackOutputJSX });

// END TRANSACTION
