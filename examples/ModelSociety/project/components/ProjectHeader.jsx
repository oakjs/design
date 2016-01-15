<Toolbar appearance="inverted top attched" layout="flex">
	<Action name="NAVIGATE" params={{location:"/"}} style={{ paddingLeft: 10, paddingRight: 20 }}>
		<Img path="/media/logos/logo-header.png"/>
	</Action>
	<StackMenu appearance="pointing">
		<Item value="explore" label="EXPLORE"/>
		<Item value="models" label="MODELS"/>
		<Item value="photographers" label="PHOTOGRAPHERS"/>
		<Item value="artists" label="ARTISTS"/>
		<Item value="magazine" label="MAGAZINE"/>
	</StackMenu>
	<Spacer spring/>
	<Button icon="search" action="SHOW_SEARCH_OVERLAY"/>
	<LoginButton/>
</Toolbar>
