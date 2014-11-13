/**
*
*	COMPUTE: circshift
*
*
*	DESCRIPTION:
*		- Shifts array elements (or string characters) circularly.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// CIRCSHIFT //

/**
* FUNCTION: circshift( x, k )
*	Shifts elements/characters circularly.
*
* @param {Array|String} x - array or string to be shifted
* @param {Number} k - integer specifying the number of positions to shift
* @param {Array|String} shifted results
*/
function circshift( x, k ) {
	var type = typeof x,
		dir = 1, // right
		len,
		i;
	if ( !Array.isArray( x ) && type !== 'string' ) {
		throw new TypeError( 'circshift()::invalid input argument. Must provide either an array or string to shift.' );
	}
	if ( !isInteger( k ) ) {
		throw new TypeError( 'circshift()::invalid input argument. Second argument must be an integer.' );
	}
	if ( type === 'string' ) {
		x = x.split( '' );
	}
	len = x.length;
	if ( k < 0 ) {
		// Get the equivalent positive number of positions...
		k = len + k; // len - |x|
	}
	// We only care about the remainder when we circularly shift. k === len means the elements stay in place.
	k = k % len;

	// Determine the direction which requires the fewest operations...
	if ( k > len/2 ) {
		dir = 0; // left
		k = len - k;
	}
	if ( dir ) {
		// Pop an element off the end and move to the front...
		for ( i = 0; i < k; i++ ) {
			x.unshift( x.pop() );
		}
	} else {
		// Shift an element off the front and move to the end...
		for ( i = 0; i < k; i++ ) {
			x.push( x.shift() );
		}
	}
	if ( type === 'string' ) {
		x = x.join( '' );
	}
	return x;
} // end FUNCTION circshift()


// EXPORTS //

module.exports = circshift;
