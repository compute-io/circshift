/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	circshift = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array circshift', function tests() {

	it( 'should export a function', function test() {
		expect( circshift ).to.be.a( 'function' );
	});

	it( 'should shift elements of a typed array circularly', function test() {
		var data, actual, expected;

		// +2 elements
		data = new Int32Array( [1,2,3,4,5] );
		expected = new Int32Array( [4,5,1,2,3] );

		actual = circshift( data, 2 );

		assert.deepEqual( actual, expected );

		// -2 elements
		data = new Int32Array( [1,2,3,4,5] );
		expected = new Int32Array( [3,4,5,1,2] );

		actual = circshift( data, -2 );

		assert.deepEqual( actual, expected );
	});

});
