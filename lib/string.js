'use strict';

// FUNCTIONS //

var circshiftArray = require( './array.js' );


// CIRCSHIFT

/**
* FUNCTION circshift( x, k )
*	Shifts characters of a string circularly.
*
* @param {String} x - input string
* @param {Number} k - integer specifying the number of positions to shift
* @returns {String} shifted string
*/
function circshift( x, k ) {
	x = x.split( '' );
	x = circshiftArray( x, k );
	x = x.join( '' );
	return x;
} // end FUNCTION circshift()


// EXPORTS //

module.exports = circshift;
