const logIf = {
    server: true,
    client: false,
    archive: false,
    paypal: false,
    auth: false
};


/**
 * This is a special way to export the module, it will work in both Node.js and the browser.
 */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = logIf;
  } else {
    // ES6 export
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return logIf;
      });
    } else {
      window.logIf = logIf;
    }
  }