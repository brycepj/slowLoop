var _ = require('lodash');
var Promise = require('bluebird');
var isPromise = require('is-promise');

exports = slowLoop;

function slowLoop(iter, fn, ms, cfg) {
  return new Promise((resolve, reject) => {
    var syncResults = [];
    var asyncResults = [];

    var isObj = _.isObject(iter);
    var isArr = _.isArray(iter);

    if (!isObj && !isArr) return;
    if (isObj) var keys = Object.keys(iter);

    var idx = 0;

    var setter = setInterval(() => {
      var item = isObj ? iter[keys[idx]] : iter[idx];

      if (idx === arr.length - 1) {
        clearInterval(setter);
        if (asyncResults.length) {
          resolve(Promise.all(asyncResults))
        } else if (syncResults.length) {
          resolve(syncResults);
        } else {
          resolve();
        }
      }
      var exed = fn(item, cfg);
      
      if (exed) {
        if (isPromise(exed)) {
          asyncResults.push(exed);
        } else {
          syncResults.push(exed);
        }
      }

      idx++;
    }, ms || 300);
  });

}
