function calcLengths (y, x, mData) {
	var 
		x = x,
		y = y,
		l2,x2,y2,
	endvar;

	x1 = mData[1].x - x;
	y1 = y - mData[1].y;
	l1 = Math.sqrt(x1*x1 + y1*y1);

	x2 = x - mData[0].x;
	y2 = y - mData[0].y;
	l2 = Math.sqrt(x2*x2 + y2*y2);

	return { l1 : l1, l2 : l2 };

};