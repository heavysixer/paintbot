function intersect2Circles( A, a, B, b ) {
	// A, B = [ x, y ]
	// return = [ Q1, Q2 ] or [ Q ] or [] where Q = [ x, y ]
	var 
		AB0 = B[0] - A[0],
		AB1 = B[1] - A[1],
		c = Math.sqrt( AB0 * AB0 + AB1 * AB1 ),
	endvar;

	if (c == 0) {
	    // same center: A = B
	    return [];
	}
	var 
		x = (a*a + c*c - b*b) / (2*c),
		y = a*a - x*x
	endvar;

	if (y < 0) {
	    // no intersection
	    return [];
	}

	if (y > 0) y = Math.sqrt( y );

	// compute unit vectors ex and ey
	var 
		ex0 = AB0 / c,
		ex1 = AB1 / c,
		ey0 = -ex1,
		ey1 =  ex0,
		Q1x = A[0] + x * ex0,
		Q1y = A[1] + x * ex1,
	endvar;

	if (y == 0) {
    	// one touch point
    	return [ [ Q1x, Q1y ] ];
    }

	 // two intersections
	 var 
	 	Q2x = Q1x - y * ey0,
	 	Q2y = Q1y - y * ey1,
	 endvar;

	 Q1x += y * ey0;
	 Q1y += y * ey1;

	 return [ [ Q1x, Q1y ], [ Q2x, Q2y ] ];
	}