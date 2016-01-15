<Card id="images" template="main" title="Images" locked {...props}>
  // card parameters accessible in URL, passed as card getter/setters? state?
  <Params>
    <Param name="selector" type="text" values={["images", "people"]} default="images"/>
    <Param name="sort" type="text"/>
    <Param name="filter" type="text"/>
  </Params>

  <Toolbar ref="header" layout="flow" class="top attached hiding">
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
