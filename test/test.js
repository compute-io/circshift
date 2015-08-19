/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

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

	it( 'should throw an error if provided a non array-like x argument', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				circshift( value, 2 );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				circshift( [1,2,3], 1, {
					'copy': value
				});
			};
		}
	});

	it( 'should thow if provided a matrix and a dim option larger than two', function test() {
		expect( badValue ).to.throw( RangeError );
		function badValue() {
			circshift( matrix([1,2,3,4],[2,2]), 1, {
				'dim': 4
			});
		}
	});

	it( 'should thow if provided a matrix and `k` is not an integer or an array of length 2', function test() {
		var values = [
			'5',
			2.5,
			[2],
			[1,2,3],
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				circshift( matrix([1,2,3,4],[2,2]), value );
			};
		}
	});

	it( 'should throw if provided a k argument that is not an integer', function test() {
		var values = [
			'5',
			2.5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				circshift( [1,2,3], value );
			};
		}
	});

	it( 'should shift elements when provided a plain array', function test() {
		var data, actual, expected;

		data = [ 1, 2, 3, 4, 5 ];
		expected = [ 5, 1, 2, 3, 4 ];

		actual = circshift( data, 1 );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate...
		actual = circshift( data, 1, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should shift elements when provided a typed array', function test() {
		var data, actual, expected;

		data = new Int8Array( [1,2,3,4,5] );
		expected = new Int8Array( [3,4,5,1,2] );

		actual = circshift( data, -2 );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = circshift( data, -2, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should shift characters when provided a string', function test() {
		var data, expected, actual;

		data = 'abcdefg';

		// +1 characters:
		expected = 'gabcdef';

		actual = circshift( data, 1 );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );
	});

	it( 'should shift rows when provided a matrix', function test() {
		var mat,
			actual,
			expected,
			d;

		d = new Int16Array( [1,2,3,4,5,6,7,8,9] );
		mat = matrix( d, [3,3], 'int16' );
		actual = circshift( mat, 2 );
		// Shift two rows:
		expected = mat.mget([1,2,0],[0,1,2]);
		assert.deepEqual( actual, expected );

		// Mutate...
		actual = circshift( mat, 2, {
			'copy': false
		});
		assert.strictEqual( mat, actual );
		assert.deepEqual( actual, expected );
	});

	it( 'should shift columns when provided a matrix', function test() {
		var mat,
			actual,
			expected,
			d;

		d = new Int16Array( [1,2,3,4,5,6,7,8,9] );
		mat = matrix( d, [3,3], 'int16' );
		actual = circshift( mat, 1, {
			'dim': 2
		});
		// Shift one column:
		expected = mat.mget([0,1,2],[2,0,1]);
		assert.deepEqual( actual, expected );

		// Mutate...
		actual = circshift( mat, 1, {
			'dim': 2,
			'copy': false
		});
		assert.strictEqual( mat, actual );
		assert.deepEqual( actual, expected );
	});

});
