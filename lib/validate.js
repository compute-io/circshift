'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Boolean} [options.copy] - boolean indicating if the function should return a new data structure
* @param {Number} [options.dim] - dimension along which to shift
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'circshift()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'circshift()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dim' ) ) {
		opts.dim = options.dim;
		if ( !isPositiveInteger( opts.dim ) ) {
			return new TypeError( 'circshift()::invalid option. dim option must be a positive integer. Option: `' + opts.dim + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
