/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	circshift = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix circshift', function tests() {

	var out1, out2, out3,
		mat,
		d;

	d = new Int16Array( [1,2,3,4,5,6,7,8,9] );
	beforeEach( function before() {
		mat = matrix( d, [3,3], 'int16' );
		// Shift one column:
		out1 = mat.mget([0,1,2],[2,0,1]);
		// Shift two rows:
		out2 = mat.mget([1,2,0],[0,1,2]);
		// Shift two rows and one column:
		out3 = mat.mget([1,2,0],[2,0,1]);
	});

	it( 'should export a function', function test() {
		expect( circshift ).to.be.a( 'function' );
	});

	it( 'should shift columns of a matrix', function test() {
		circshift( mat, 1, 2 );
		assert.deepEqual( mat.data, out1.data );
	});

	it( 'should shift rows of a matrix', function test() {
		circshift( mat, 2, 1 );
		assert.deepEqual( mat.data, out2.data );
	});

	it( 'should shift rows and columns of a matrix', function test() {
		circshift( mat, [ 2, 1 ] );
		assert.deepEqual( mat.data, out3.data );
	});

});
