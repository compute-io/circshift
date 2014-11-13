'use strict';

var circshift = require( './../lib' );

// Simulate some data...
var data = new Array( 10 ),
	len = data.length;

for ( var i = 0; i < len; i++ ) {
	data[ i ] = i;
}

console.log( data.join( ',' ) + '\n' );

// Repeatedly shift elements a random number of positions...
var rand, k;
for ( var j = 0; j < 20; j++ ) {
	rand = Math.random() - 0.5;
	k = Math.round( rand * len * 2 );
	circshift( data, k );

	console.log( data.join( ',' )+'\t'+k );
}
