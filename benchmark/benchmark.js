'use strict';

var circshift = require( './../lib' );

// Create a test data set...
var data = new Array( 100 ),
	len = data.length;

for ( var i = 0; i < len; i++ ) {
	data[ i ] = i;
}

// Run the benchmarks...
var total = 1e6,
	start,
	diff,
	elapsed;

// [0] Positive shift...
start = process.hrtime();
for ( var i = 0; i < total; i++ ) {
	circshift( data, 25 );
}
diff = process.hrtime( start );
elapsed = diff[ 0 ] + diff[ 1 ]*1e-9;
console.log( 'ops/sec: %d', total/elapsed );

// [1] Negative shift...
start = process.hrtime();
for ( var i = 0; i < total; i++ ) {
	circshift( data, -25 );
}
diff = process.hrtime( start );
elapsed = diff[ 0 ] + diff[ 1 ]*1e-9;
console.log( 'ops/sec: %d', total/elapsed );

