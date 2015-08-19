'use strict';

/**
* FUNCTION circshift( x, k )
*	Shifts elements of an array circularly (x is mutated).
*
* @param {Array} x - input array
* @param {Number} k - integer specifying the number of positions to shift
* @returns {Array} shifted array
*/
function circshift( x, k ) {
	var len,
		i,
		dir = 1; // right

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
	return x;
} // end FUNCTION circshift()


// EXPORTS //

module.exports = circshift;
