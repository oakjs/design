export class ImageListViewer extends oak.ListViewer {

  static presets = {
    // properties which apply to all
    default: {
      selector: undefined,
      sort: "popular",
      filter: undefined,
      itemConstructor: "/components/MeteorImages/ImageThumb"
    },

    // overrides for "medium" preset
    fullPageScroller: {
      layoutConstructor: "/oak/ListMasonryLayout",
      infiniteScroll: true
    },

    // overrides for "medium" preset
    horizontalStrip: {
      layoutConstructor: "/oak/HorizonalStrip",
      itemProps: {}
    }
  };

  // Select the data for the listviewer.
  // Called during `componentDidMount` and `onPropsChanged`.
  // `props` has been munged with `presets` as necessary.
  getData({ props, state }) {
    const fetcher = (this.state && this.state.list) || new Meteor.Images.ListFetcher({ delegate: this });
    fetcher.set({
      selector: props.selector,
      sort: props.sort,
      filter: props.filter,
    });
    this.setState({ list: fetcher });
  }

  onComponentWillUnmount() {
    if (this.state && this.state.list) this.state.list.unmount();
  }


}
