export class ImageThumb extends oak.ListViewer {

  static presets = {
    // properties which apply to all
    default: {
      imageId: undefined,
    },

    medium: {},
    horizontalStrip: {},
  };

  // Select the data for the listviewer.
  // Called during `componentDidMount` and `onPropsChanged`
  getData({ props, state, card, template, stack, project }) {
    const fetcher = (this.state && this.state.image) || new Meteor.Images.ItemFetcher({ delegate: this });
    fetcher.set({ imageId: props.imageId });
    this.setState({ image: fetcher });
  }

  onComponentWillUnmount() {
    if (this.state && this.state.image) this.state.image.unmount();
  }

  render() {
    const { image } = state;
    if (!image) return <EmptyStub/>;
    if (image.isLoading) return <Loader/>;
    if (image.notFound) return <ImageNotFound/>;

    return (
      <Panel {...props}>
        {this.renderImage()}
        {this.renderContent()}
      </Panel>
    )
  }

}
