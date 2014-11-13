circshift
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Shifts array elements (or string characters) circularly.


## Installation

``` bash
$ npm install compute-circshift
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var circshift = require( 'compute-circshift' );
```

#### circshift( x, k )

Shifts elements. `x` may be either an `array` or a `string`. `k` is an `integer` specifying how many positions to shift.

``` javascript
// Arrays...
var arr = [ 1, 2, 3, 4, 5 ];

// Circularly shift the array 2 positions to the right:
circshift( arr, 2 );
// returns [ 4, 5, 1, 2, 3 ]

// Circularly shift the mutated array 3 positions to the left:
circshift( arr, -3 );
// returns [ 2, 3, 4, 5, 1 ]

// Strings...
var str = 'beepboop';

str = circshift( str, 3 );
// returns 'oopbeepb'

str = circshift( str, -4 );
// returns 'eepboopb'
```

Note: mutates an input `array`.


## Examples

``` javascript
var circshift = require( 'compute-circshift' );

// Simulate some data...
var data = new Array( 10 ),
	len = data.length;

for ( var i = 0; i < len; i++ ) {
	data[ i ] = i;
}

// Repeatedly shift elements a random number of positions...
var rand, k;
for ( var j = 0; j < 20; j++ ) {
	rand = Math.random() - 0.5;
	k = Math.round( rand * len * 2 );
	circshift( data, k );
	console.log( data.join( ',' ) );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Notes

If provided an input `array`, the `array` is mutated. If mutation is undesired,

``` javascript
var data = [ 1, 2, 3, 4, 5 ],
	copy = data.slice();

circshift( copy, 2 );

console.log( copy.join( '\n' ) );
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-circshift.svg
[npm-url]: https://npmjs.org/package/compute-circshift

[travis-image]: http://img.shields.io/travis/compute-io/circshift/master.svg
[travis-url]: https://travis-ci.org/compute-io/circshift

[coveralls-image]: https://img.shields.io/coveralls/compute-io/circshift/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/circshift?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/circshift.svg
[dependencies-url]: https://david-dm.org/compute-io/circshift

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/circshift.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/circshift

[github-issues-image]: http://img.shields.io/github/issues/compute-io/circshift.svg
[github-issues-url]: https://github.com/compute-io/circshift/issues
