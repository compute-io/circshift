/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	circshift = require( './../lib/string.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'string circshift', function tests() {

	it( 'should export a function', function test() {
		expect( circshift ).to.be.a( 'function' );
	});

	it( 'should shift string characters', function test() {
		var data, expected, actual;

		data = 'abcdefg';

		// +1 characters:
		expected = 'gabcdef';
		actual = circshift( data, 1 );

		assert.strictEqual( actual, expected );

		// -2 characters:
		expected = 'cdefgab';
		actual = circshift( data, -2 );

		assert.strictEqual( actual, expected );

		// 0 characters:
		expected = 'abcdefg';
		actual = circshift( data, 0 );

		assert.strictEqual( actual, expected );

		// 20 characters:
		expected = 'bcdefga';
		actual = circshift( data, 20 );

		assert.strictEqual( actual, expected );
	});

});
