circshift
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Shifts elements circularly.


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

Shifts elements. `x` may be either a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). `k` is an `integer` specifying how many positions to shift. In the case that `x` is a matrix, `k` can also be an `array` with two elements specifying how many positions to shift along rows and columns, respectively.

``` javascript
var data,
	out,
	matrix = require( 'dstructs-matrix' );

// Arrays...
data = [ 1, 2, 3, 4, 5 ];

// Circularly shift the array 2 positions to the right:
out = circshift( arr, 2 );
// returns [ 4, 5, 1, 2, 3 ]

// Circularly shift the  array 1 position to the left:
circshift( arr, -1 );
// returns [ 2, 3, 4, 5, 1 ]

// Strings...
data = 'beepboop';

out = circshift( data, 3 );
// returns 'oopbeepb'

out = circshift( data, -1 );
// returns 'eepboopb'
```

The function accepts the following `options`:

*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__dim__: dimension along which to shift when x is a `matrix`, either `1` or `2`. Default: `1` (shift along rows).

For matrices, the function by default shifts the rows of the matrix when `k` is an integer. To shift the columns, set the `dim` option to `2`.

```javascript
var mat;

mat = matrix( [1,2,3,4], [2,2] );
/*
	[ 1 2
	  3 4 ]
*/

// Shift rows...
circshift( mat, 1 );
/*
	[ 3 4
	  1 2 ]
*/

// Shift columns...
circshift( mat, 1, {
	'dim': 2
});
/*
	[ 2 1
	  4 3 ]
*/
```

When `x` is a matrix, one can alternatively pass in an array of two elements for `k` specifying how many shift operations should be performed on the rows and columns.

```javascript
var mat;

mat = matrix( [1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0], [4,4] );
/*
	[ 1 1 0 0
	  1 1 0 0
	  0 0 0 0
	  0 0 0 0 ]
*/

// Shift two columns and two rows
circshift( mat, [2,2] );
/*
	[ 0 0 0 0
	  0 0 0 0
	  0 0 1 1
	  0 0 1 1 ]
*/
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 3, 7, 9 ];

out = circshift( data, 1, {
	'copy': false
});
// returns [ 9, 3, 7 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = circshift( mat, 2, {
	'copy': false
});
/*
	[  2  3
	   4  5
	   0  1 ]
*/

bool = ( mat === out );
// returns true
```

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
	data = circshift( data, k );
	console.log( data.join( ',' ) );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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

---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-circshift.svg
[npm-url]: https://npmjs.org/package/compute-circshift

[travis-image]: http://img.shields.io/travis/compute-io/circshift/master.svg
[travis-url]: https://travis-ci.org/compute-io/circshift

[codecov-image]: https://img.shields.io/codecov/c/github/compute-io/circshift/master.svg
[codecov-url]: https://codecov.io/github/compute-io/circshift?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/circshift.svg
[dependencies-url]: https://david-dm.org/compute-io/circshift

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/circshift.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/circshift

[github-issues-image]: http://img.shields.io/github/issues/compute-io/circshift.svg
[github-issues-url]: https://github.com/compute-io/circshift/issues
