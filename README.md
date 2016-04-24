# slowLoop(iterable, op, ms (milliseconds), cfg)

Throttled iteration over an iterable, passing items into passed custom function with custom params.
Works well for large scale i/o (e.g. scraping, db read/write, file read/write).

```javascript
var slowLoop = require('slowloop');
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// logs a number and config object once per second until finished
slowLoop(arr, (num, cfg) => {
  console.log(num, cfg);
}, 1000, { hello: 'world' });

// logs a number and config object once per second until finished, then... (bluebird)
var numLoop = slowLoop(slowLoop(arr, (num, cfg) => {
  console.log(num, cfg);
}, 1000, { hello: 'world' });

numLoop.then(() => {
  console.log("Done!");
});

```
