'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	circshift = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-circshift', function tests() {

	it( 'should export a function', function test() {
		expect( circshift ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided either a string or an array', function test() {
		var values = [
			5,
			NaN,
			null,
			undefined,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				circshift( value, 0 );
			};
		}
	});

	it( 'should throw an error if not provided an integer number of positions to shift', function test() {
		var values = [
			'5',
			4.56,
			-4.56,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				circshift( [], value );
			};
		}
	});

	it( 'should shift array elements circularly', function test() {
		var data, expected, actual;

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
