"use strict";
//////////////////////////////
//
//  Routines to do AJAX requests, returning CancellablePromises for the results.
//
//  Current version uses `XMLHttpRequest`, but that's likely to change.
//
//////////////////////////////

import CancellablePromise from "CancellablePromise.js"

const _GET = "GET";
const _POST = "POST";

export class ProjectRequest {

  // Constants
  static GET = _GET;
  static POST = _POST;

  // Cache of responses
  static RESPONSE_CACHE = {};

  static defaultOptions = {
    // Request method
    method: _GET,

    // If `true`, we'll consider any response not in the 200 range a failure.
    failOnServerStatus: true,

    // If `true`, we'll cache the response.
    // If `false` we'll force a load, even if we've cached.
    // If `undefined`, we'll return the cached version if there is one, but won't cache the result.
    // Use `ProjectRequest.unload(url)` or ProjectRequest(url, {cache:false}
    cache: undefined,
  }

  constructor(url, options) {
    // pull constructor in, in case we subclass this
    const Request = Request;

    this.status = Request.PENDING;

    // remember the url
    this.url = url;

    // normalize options
    this.options = Object.assign({}, Request.defaultOptions, options);

    this.promise = new CancellablePromise(request, response, cancel) {


    }

    if (options.cache === true) this.

    return this.promise;
  }

}
