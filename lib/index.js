'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' ),
	isArray = require( 'validate.io-array' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isString = require( 'validate.io-string-primitive' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var circshiftArray = require( './array.js' ),
	circshiftTypedArray = require( './typedarray.js' ),
	circshiftString = require( './string.js' ),
	cirschiftMatrix = require( './matrix.js' );


// CIRCSHIFT //

/**
* FUNCTION: circshift( x, k )
*	Shifts elements/characters circularly.
*
* @param {Array|String|Matrix|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} x - array or string to be shifted
* @param {Number} k - integer specifying the number of positions to shift
* @param {Object} [options] - options object
* @param {Boolean} [options.copy=true] - boolean indicating if the function should return a new data structure
* @param {Number} [options.dim=1] - dimension along which so shift multi-dimensional input data structure
* @param {Array|String|Matrix|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} shifted results
*/
function circshift( x, k, options ) {
	var opts = {},
		d,
		dim,
		err,
		out;

	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	// Case: Matrix-like input
	if ( isMatrixLike( x ) ) {
		if ( !( isInteger( k ) || ( isArray( k ) && k.length === 2 ) ) ) {
			throw new TypeError( 'circshift()::invalid input argument. Second argument must be an integer or array of length two when `x` is matrix-like. Value: `' + k + '`' );
		}
		dim = opts.dim || 1;
		if ( dim > 2 ) {
			throw new RangeError( 'circshift()::Invalid option. Dim option must be equal to 1 or 2. Value: `' + opts.dim + '`');
		}
		if ( opts.copy !== false ) {
			// Copy the underlying data and create a new typed array
			d = new x.data.constructor( x.data );
			out = matrix( d, x.shape, x.dtype );
		} else {
			out = x;
		}
		return cirschiftMatrix( out, k, dim );
	}

	// Cases: array-like
	if ( isArrayLike( x ) ) {
		if ( !isInteger( k ) ) {
			throw new TypeError( 'circshift()::invalid input argument. Second argument must be an integer when `x` is array-like. Value: `' + k + '`' );
		}
		// Case: Typed Array
		if ( isTypedArrayLike( x ) ) {
			if ( opts.copy === false ) {
				out = x;
			} else {
				out = new x.constructor( x.length );
				out.set( x );
			}
			return circshiftTypedArray( out, k );
		}
		// Case: String
		if ( isString( x ) ) {
			return circshiftString( x, k );
		}
		// Case: Array
		if ( opts.copy === false ) {
			out = x;
		}
		else {
			out = x.slice();
		}
		out = circshiftArray( out, k );
		return out;
	}

	// All valid cases exhausted:
	throw new TypeError( 'circshift()::invalid input argument. Must provide either a matrix, typed array, array or string to shift.' );

} // end FUNCTION circshift()


// EXPORTS //

module.exports = circshift;
