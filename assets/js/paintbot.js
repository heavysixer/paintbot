(function () {
'use strict';
// - - - - - - - - - -
	// declarations
	var
		interval = 10,
		R     = {},
		R1    = {},
		R2    = {},
		P     = {},
		mouse = {},
		translate = {},
		rotate    = {},
		l1,
		l2,
		Plot = {},
	endvar

	var
		canvas  = document.querySelector('canvas'),
		drawing = canvas.getContext('2d'),
		plot = true,
		fx=0, fy=0, speed=0.025, gravity=0.9,
	endvar;

	// void setup()
	R1.id = '#R1';  R1.x = 100               ;  R1.y = 150 ;  R1.r = 25   ; R1.alpha = 0;
	R2.id = '#R2';  R2.x = canvas.width - 100;  R2.y = R1.y;  R2.r = R1.r ; R2.alpha = 0;
	P.id  = '#P' ;  
	Plot.x  = R1.x+(R2.x-R1.x)/2;  Plot.y  = R1.y+400;
	mouse.id = '#mouse'; mouse.x = Plot.x; mouse.y = Plot.y;
	translate.x  = canvas.offsetLeft;
	translate.y  = canvas.offsetTop;
	rotate.alpha = 0;
	// void loop

	function draw () {
		R1.draw('R1');			// Linken Motor zeichnen
		R2.draw('R2');			// Rechten Motor zeichnen

		calculateTheMotors();	// Die Motorenbewegung berechnen

		P.draw();				// Zeichnet die Radien und die roten Hilfslinien.
		
		
		fx += (mouse.x-fx)*speed*gravity;
		fy += (mouse.y-fy)*speed*gravity;

		Plot.x = fx;
		Plot.y = fy;

		if ( Plot.x < R1.x ) Plot.x = R1.x;
		if ( Plot.x > R2.x ) Plot.x = R2.x;
		if ( Plot.y < R1.y ) Plot.y = R1.y;
		if ( Plot.y > canvas.height ) Plot.y = canvas.height;

		paint();				// LET THE BOT PAINT!
	};

	// go!
	setInterval( draw, interval);
	setInterval( function () {
		var dif = 20;
		mouse.x += Math.random()*-dif + Math.random()*dif;
		mouse.y += Math.random()*-dif + Math.random()*dif;

		if ( mouse.x < R1.x ) mouse.x = R1.x;
		if ( mouse.x > R2.x ) mouse.x = R2.x;
		if ( mouse.y < R1.y ) mouse.y = R1.y;
		if ( mouse.y > canvas.height ) mouse.y = canvas.height;

	}, 250);

	// eventlistener
	window.addEventListener('click', function (event) {
		mouse.x = event.pageX; mouse.y = event.pageY; mouse.draw();
	});

	window.addEventListener('keydown', function (event) {
		switch (event.which) {
			case 89: // Y
				l1 -= 10;
				console.log(Math.round(l1));
				break;
			case 88: // X
				l1 += 10;
				console.log(Math.round(l1));
				break;
			case 78: // N
				l2 -= 10;
				console.log(Math.round(l2));
				break;
			case 77: // M
				l2 += 10;
				console.log(Math.round(l2));
				break;
		};
	});


	// - - - - - - - - - -
	// Calculate the Motors
	// Berechnez die Länge der beiden Seile,
	// und die Koordinaten der beiden Seilenden,
	// die den Stift halten. (Beide sind theoretisch identisch).
	var 
		oldX1, oldY1,
		oldX2, oldY2,
	endvar;

	function calculateTheMotors () {
		var 
			x1,y1,
			x2,y2,
		endvar;

		// MOTOR 1
		// Seil des Motor 1
		// R1 ist die Position des linken Motors
		// Plot ist die Position der gewünschten Position zum Zeichnen.
		// Danach muss sich der Motor von seiner aktuellen Position auf die Zielposition bewegen.
		x1 = -1*(R1.x - Plot.x);            // Zielkoordinate x
		y1 = Plot.y - R1.y;                 // Zielkoordinate y
		l1 = Math.sqrt(x1*x1 + y1*y1); 		// Länge der Schnur

		// MOTOR 2
		// Seil des Motor 2
		x2 = R2.x - Plot.x;
		y2 = Plot.y - R2.y;
		l2 = Math.sqrt(x2*x2 + y2*y2);

		if (oldX1 === undefined || oldX1 !== x1) {
			//console.log( 'Zielkoordinaten 1: ' + x1 + ',' + y1 + ', Seillänge: ' + l1);
			//console.log( 'Zielkoordinaten 2: ' + x2 + ',' + y2 + ', Seillänge: ' + l2);
			oldX1 = x1; oldY1 = y1;
			oldX2 = x2; oldY2 = y2;
		}

		R1.initLength = R2.initLength = (R2.x-R1.x)/2;
		R1.circum     = 2*Math.PI*R1.r;
		R2.circum     = 2*Math.PI*R2.r;

		R1.difLength = Math.round(Math.abs(R1.initLength - l1));
		R2.difLength = Math.round(Math.abs(R2.initLength - l2));

		R1.alpha = R1.difLength/Math.PI*180/10;
		R2.alpha = -R2.difLength/Math.PI*180/10;

		return { x1 : x1, y1 : y2, x2 : x2, y2 : y2, l1 : l1, l2 : l2 };
	}




















	function paint () {

		// DRAWING
	 	drawing.strokeStyle = 'rgba(50, 50, 50, 0.025)';
	 	drawing.lineWidth=5;
	 	drawing.lineCap='round';
	 	drawing.lineWidth=5;

	 	drawing.beginPath();
	 	drawing.moveTo(Plot.x-translate.x-0.1, Plot.y-translate.y);
	 	drawing.lineTo(Plot.x-translate.x    , Plot.y-translate.y);
	    drawing.stroke();
	};

	mouse.draw = function () {
		var 
			element = document.querySelector(mouse.id + ' circle'),
			cross   = document.querySelector(mouse.id + ' polyline'),
		endvar;

		element.setAttribute('cx', mouse.x);
		element.setAttribute('cy', mouse.y);
		element.setAttribute( 'r', 5);

		var _points =  "" 
			+ (mouse.x-10) + ", " + mouse.y 
			+ " " 
			+ (mouse.x+10) + ", " + mouse.y
			+ " " 
			+ mouse.x    + ", " + mouse.y 
			+ " " 
			+ mouse.x    + ", " + (mouse.y-10)
			+ " " 
			+ mouse.x    + ", " + (mouse.y+10)
		;
		cross.setAttribute('points', _points);

		var _translate = 'translate(' + -translate.x + ", "+ -translate.y + ') ';
		var _rotate    = 'rotate(' + rotate.alpha + ') ';

		element.parentNode.setAttribute( 'transform', _translate + _rotate);
	};

	P.draw = function () {
		var 
			t1 = document.querySelector(P.id + ' polyline'),
			m1 = document.querySelector(P.id + ' text'),
			c1 = document.querySelector(P.id + ' circle'),
			t2 = document.querySelector('#T2 polyline'),
			c2 = document.querySelector('#T2 circle'),
			m2 = document.querySelector('#T2 text'),			
			_translate = 'translate(' + -translate.x + ", "+ -translate.y + ') ',
		    _rotate    = 'rotate(' + rotate.alpha + ') ',
			tx  = mouse.x,
			ty  = mouse.y,
		endvar;


		t1.parentNode.setAttribute( 'transform', _translate + _rotate);

		var _points =   
				  R1.x + ", " + (R1.y + R1.initLength*3 - l1 )
				+ " "
				+ R1.x + ", " + R1.y 
				+ " " 
				+ Plot.x  + ", " + Plot.y
				+ " " 
				+ R2.x + ", " + R2.y 
				+ " "		
				+ R2.x + ", " + (R2.y + R2.initLength*3 - l2);

		t1.setAttribute('points', _points);

		// text
		m1.setAttribute('x', Plot.x+10);
		m1.setAttribute('y', Plot.y);
		m1.innerHTML = "(" + Math.round(Plot.x) + "," + Math.round(Plot.y) + ")";

		// circle
		c1.setAttribute('cx', R1.x);
		c1.setAttribute('cy', R1.y);
		c1.setAttribute('r', l1);

		var _points =  "" 

				+ R2.x + ", " + R2.y 
				+ " " 
				+ Plot.x + ", " + Plot.y
		;
		t2.setAttribute('points', _points);
		
		// text
		// m2.setAttribute('x', tx);
		// m2.setAttribute('y', ty+25);
		// m2.innerHTML = "(" + -x2 + "," + y2 + ")";

		// circle
		c2.setAttribute('cx', R2.x);
		c2.setAttribute('cy', R2.y);
		c2.setAttribute('r', l2);

		t2.parentNode.setAttribute( 'transform', _translate + _rotate);
	};

	R1.draw = function () {
		var 
			element    = document.querySelector(R1.id + ' circle'),
			rotation   = document.querySelector(R1.id + ' polyline'),
			_translate = 'translate(' + -translate.x + ", "+ -translate.y + ') ',
			_rotate    = 'rotate(' + rotate.alpha + ') ',
			Px, Py,
		endvar;

		// translation
		element.parentNode.setAttribute( 'transform', _translate + _rotate);

		// circle
		element.setAttribute('cx', R1.x);
		element.setAttribute('cy', R1.y);
		element.setAttribute( 'r', R1.r);

		// rotation
		if (R1.alpha>360) R1.alpha=R1.alpha-360;
		Px = R1.x + Math.cos((R1.alpha * Math.PI/180)) * R1.r;
		Py = R1.y + Math.sin((R1.alpha * Math.PI/180)) * R1.r;
		var _points =   
				  R1.x + ", " + R1.y 
				+ " " 
				+ Px  + ", " + Py 
		; 
		rotation.setAttribute('points', _points);


	};
	R2.draw = function () {
		var 
			element  = document.querySelector(R2.id + ' circle'),
			rotation = document.querySelector(R2.id + ' polyline'),
			_translate = 'translate(' + -translate.x + ", "+ -translate.y + ') ',
			_rotate    = 'rotate(' + rotate.alpha + ') ',
			Px, Py,
		endvar;

		// translation
		element.parentNode.setAttribute( 'transform', _translate + _rotate);

		// circle
		element.setAttribute('cx', R2.x);
		element.setAttribute('cy', R2.y);
		element.setAttribute( 'r', R2.r);
		
		// rotation
		if (R2.alpha>360) R2.alpha=R2.alpha-360;
		Px = R2.x + Math.cos((R2.alpha * Math.PI/180)) * R2.r;
		Py = R2.y + Math.sin((R2.alpha * Math.PI/180)) * R2.r;
		var _points =   
				  R2.x + ", " + R2.y 
				+ " " 
				+ Px  + ", " + Py 
		; 
		rotation.setAttribute('points', _points);
	};

// 	var fx=0, fy=0, speed=0.1, gravity=0.09;
// 	var dx, dy, px, py;
// function follower () {
// 	console.log('follower');
	
		
// 		fx += (mouse.x-fx)*speed*gravity;
// 		fy += (mouse.y-fy)*speed*gravity;
// 		px = fx - translate.x;
// 		py = fy - translate.y
// 		// DRAWING
// 	 	drawing.strokeStyle = 'rgba(50, 50, 50, 0.25)';
// 	 	drawing.lineWidth=5;
// 	 	drawing.lineCap='round';
// 	 	drawing.lineWidth=5;

// 	 	drawing.beginPath();
// 	 	drawing.moveTo(px-0.1, py);
// 	 	drawing.lineTo(px    , py);
// 	    drawing.stroke();

// };

// - - - - - - - - - -
})()