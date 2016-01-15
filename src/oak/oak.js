"use strict";
//////////////////////////////
//
//	`oak` framework singleton.
//
//////////////////////////////

import CancellablePromise from "CancellablePromise.js";

if (typeof global === "undefined") {
  throw new TypeError("Expected `global` to be defined when setting up `oak` singleton.");
}


// Create the `oak` singleton and make it available globally.
global.oak = {}


// TODOC:  Set up initial stuff.

Object.defineProperties(oak, {
  // Use CancellablePromises by default.
  Promise : { value: CancellablePromise },


});
