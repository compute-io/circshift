'use strict';

/**
* FUNCTION circshift( x, k )
*	Shifts elements of a typed array circularly (x is mutated).
*
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} x - input array
* @param {Number} k - integer specifying the number of positions to shift
* @returns {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} shifted array
*/
function circshift( x, k ) {
	var len,
		i,
		dir = 1,
		val,
		newX; // right

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
	newX = new x.constructor( len );
	if ( dir ) {
		for ( i = 0; i < k; i++ ) {
			val = x[ len - 1 ];
			newX.set( x.subarray( 0, len - 1 ), 1 );
			newX[ 0 ] = val;
			x = newX;
		}
	} else {
		for ( i = 0; i < k; i++ ) {
			val = x[ 0 ];
			newX.set( x.subarray( 1, len ), 0 );
			newX[ len - 1 ] = val;
			x = newX;
		}
	}
	return x;
} // end FUNCTION circshift()


// EXPORTS //

module.exports = circshift;
