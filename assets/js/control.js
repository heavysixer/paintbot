window.onload = function () {

	'use strict';

	var 
		rData   = [],
		mData   = [],
		ropeData   = [],
		r       = [],
		m       = [],
		rope    = [],
		canvas  = document.querySelector('canvas'),
		drawing = canvas.getContext('2d'),
		mouseX = 0,
		mouseY = 0,
	endvar;

	mData[0] = {
		id : '#motor1',
		x  : 100,
		y  : 50,
		r  : 25
	};
	mData[1] = {
		id : '#motor2',
		x  : canvas.width - 100,
		y  : 50,
		r  : 25
	};
	rData[0] = {
		id : '#rope1',
		x : mData[0].x + mData[0].r,
		y : mData[0].y,
		r : 400
	};
	rData[1] = {
		id : '#rope2',
		x : mData[1].x - mData[1].r,
		y : mData[1].y,
		r : 400
	};
	ropeData[0] = {
		id : '#rope3',
		x : mData[0].x - mData[0].r,
		y : mData[0].y,
	};

	var 
		A  = [rData[0].x, rData[0].y],
		a  =  rData[0].r,
		B  = [rData[1].x, rData[1].y],
		b  =  rData[0].r,

		q  = [], // Menge der Schnittpunkte
		l,
	endvar;

	q = intersect2Circles( [rData[0].x, rData[1].y], rData[0].r, [rData[1].x, rData[1].y], rData[1].r );
	l = calcLengths(mouseX, mouseY, mData);

	m[0] = new Circle(mData[0]); 
	m[1] = new Circle(mData[1]); 
	r[0] = new Circle(rData[0], q[0]); 
	r[1] = new Circle(rData[1], q[1]);

	rope[0] = new Rope(ropeData[0], l);
	rope[1] = new Rope(ropeData[1], l);

	function drawAll () {
		m[0].draw();
		m[1].draw();
		
		r[0].draw();
		r[1].draw();

		q = intersect2Circles( [rData[0].x, rData[1].y], r[0].r, [rData[1].x, rData[1].y], r[1].r );
		l = calcLengths(mouseX, mouseY, mData);

		// r[0].px = q[0][0];
		// r[0].py = q[0][1];
		// r[1].px = q[0][0];
		// r[1].py = q[0][1];
		
	 	//r[0].drawRope();
	 	//r[1].drawRope();

	 	//rope[0].draw();

	 	// LET THE PAINTBOT DRAW !
	 	drawing.strokeStyle = '#ff0000';
	 	drawing.lineWidth   = 5;
	 	drawing.lineCap     = 'round';

	 	var draw = false;

	 	if (draw === true) {
		 	drawing.beginPath();
		 	drawing.moveTo(q[0][0]-0.1,q[0][1]);
		 	drawing.lineTo(q[0][0],q[0][1]);
		    drawing.stroke();

		    drawing.beginPath();
		    drawing.moveTo(mouseX-0.1, mouseY-0.1);
		    drawing.lineTo(mouseX, mouseY);
		    drawing.stroke();
	    }
	};



	window.addEventListener('keydown', function (event) {
		switch (event.which) {
			case 89: // Y
				r[0].r -= 10;
				break;
			case 88: // X
				r[0].r += 10;
				break;
			case 78: // N
				r[1].r -= 10;
				break;
			case 77: // M
				r[1].r += 10;
				break;
		}

		drawAll();
	});
	window.addEventListener('mousemove', function (event) {
		mouseX = event.pageX;
		mouseY = event.pageY;
	});

	setInterval(function () { drawAll(); }, 100);
};