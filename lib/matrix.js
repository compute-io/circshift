'use strict';

// MODULES //

var circshiftArray = require( './array.js' ),
	incrspace = require( 'compute-incrspace' ),
	isNumber = require( 'validate.io-number-primitive');


// CIRCSHIFT //

/**
* FUNCTION circshift( x, k, dim )
*	Shifts rows / columns of a matrix circularly (x is mutated).
*
* @param {Matrix} x - input matrix
* @param {Number|Array} k - specifies the positions to shift along the matrix dimensions
* @param {Number} dim - dimension along which to shift (when `k` is an integer)
* @returns {Matrix} shifted matrix
*/
function circshift( x, k, dim ) {
	var nRows, nCols,
		ids, rowIDs, colIDs;

	nRows = x.shape[ 0 ];
	nCols = x.shape[ 1 ];

	ids = incrspace( 0, x.data.length );
	rowIDs = incrspace( 0, nRows );
	colIDs = incrspace( 0, nCols );

	if ( isNumber( k ) ) {
		if ( dim === 1) {
			circshiftArray( rowIDs, k );
			x.mset( ids, x.mget( rowIDs, colIDs ) );
		}
		if ( dim === 2 ) {
			circshiftArray( colIDs, k );
			x.mset( ids, x.mget( rowIDs, colIDs ) );
		}
		return x;
	}

	// k must be an array
	circshiftArray( rowIDs, k[ 0 ] );
	circshiftArray( colIDs, k[ 1 ] );
	x = x.mset( ids, x.mget( rowIDs, colIDs ) );
	return x;

} // end FUNCTION circshift()


// EXPORTS //

module.exports = circshift;
