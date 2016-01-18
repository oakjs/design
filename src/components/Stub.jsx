"use strict";
//////////////////////////////
//
// <EmptyStub/>
//
// React won't let you return `null`/`undefined` from a `render()` method.
// If you really don't want to render anything, return an `<EmptyStub/>`.
// It will not be visible, although it may mess up CSS adjacency, `:first-child`, etc rules.
//
// NOTE: ignores `props` and `children`.
//
//////////////////////////////
export default function Stub(props) {
  return <span className="EmptyStub" style={{ position: absolute, left: -1000, top: -1000, width: 0, height: 0 }}/>
}
