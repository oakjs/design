"use strict";
//////////////////////////////
//
// <LoadableComponent/>
//
// Component wrapper which loads a theme/project/stack/card component for you automatically.
//
// Uses `API.loadComponent(<contextIds>)` to dynamically load a component,
//  optionally rendering a loader component if the component hasn't already been loaded.
//
// DOWNSIDE:
//    - using this will create a wrapper element in the DOM output
//      even once the component has loaded.
//      That could mess up the html structure of, eg, a form etc.
//
//////////////////////////////
import Stub from "Stub.jsx";
export class LoadableComponent extends React.Component {

  static defaultProps = {
    // Path to load component:
    //  - "foo/bar"               <- automagic lookup
    //  - "/project/foo"          <- explicit: projects/components/foo/
    //  - "http://..."            <- absolute path on the interwebs
    _path: undefined,

    // Constructor for component to be returned if the component at `_path` is loading.
    _loadingConstructor: undefined,

    // Constructor for component to be returned if the component at `_path` was not found.
    _notFoundConstructor: Stub,
  };

  static contextTypes = {
    project: React.PropTypes.object,
    stack: React.PropTypes.object,
    template: React.PropTypes.object,
    card: React.PropTypes.object
  }

  render() {
    // Separate out props we handle from everything else.
    const { _path, _loadingConstructor, _notFoundConstructor, children, props } = this.props;

    // Pull the context ids out of the context.
    const contextIds = this.getContextIds();

    // Ask the API for the component.
    const component = API.loadComponent( { path, contextIds });

    // if we got the LOADING flag, create an instance of our `_loadingConstructor`.
    if (component === oak.LOADING) component = _loadingConstructor;

    // If we still don't know what to use, create an instance of our `_notFoundContructor`.
    if (!component) component = _notFoundConstructor;

    return <component {...props}>{children}</component>
  }

  // Return the a context id map for the curent context.
  getContextIds() {
    if (!this.context) return undefined;

    const ids = {};
    const { project, stack, template, card } = this.context;
    if (project)  ids.project  = project.props.id;
    if (stack)    ids.stack    = stack.props.id;
    if (template) ids.template = template.props.id;
    if (card)     ids.card     = card.props.id;
    return ids;
  }

}
