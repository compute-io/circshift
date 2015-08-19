/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	circshift = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array circshift', function tests() {

	it( 'should export a function', function test() {
		expect( circshift ).to.be.a( 'function' );
	});

	it( 'should shift array elements circularly', function test() {
		var data, actual, expected;

		data = [ 1, 2, 3, 4, 5 ];

		// +1 elements:
		expected = [ 5, 1, 2, 3, 4 ];
		actual = data.slice();
		circshift( actual, 1 );

		assert.deepEqual( actual, expected );

		// -2 elements:
		expected = [ 3, 4, 5, 1, 2 ];
		actual = data.slice();
		circshift( actual, -2 );

		assert.deepEqual( actual, expected );

		// 0 elements:
		expected = [ 1, 2, 3, 4, 5 ];
		actual = data.slice();
		circshift( actual, 0 );

		assert.deepEqual( actual, expected );

		// +7 elements:
		expected = [ 4, 5, 1, 2, 3 ];
		actual = data.slice();
		circshift( actual, 7 );

		assert.deepEqual( actual, expected );
	});

});
