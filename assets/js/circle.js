'use strict';

function Circle (_data) {
	var 
		_data      = _data || {},
		_q         = 1 || [],
		_translate = '',
		_rotate    = '',
	endvar;
	
	this.x           = 0; 
	this.y           = 0;
	this.element     = document.querySelector(_data.id + ' circle');
	this.rope 		 = document.querySelector(_data.id + ' polyline');
	this.translate   = [];
	this.rotate      = [];

	this.r = _data.r || 10;
	this.translate.x = _data.x || 0;
	this.translate.y = _data.y || 0;
	this.rotate.a    = _data.a || 0;

	this.px = _q[0];
	this.py = _q[1];
	
	this.draw = function () {
		this.element.setAttribute('cx', this.x);
		this.element.setAttribute('cy', this.y);
		this.element.setAttribute( 'r', this.r);

		_translate = 'translate(' + this.translate.x + ", "+ this.translate.y + ') ';
		_rotate    = 'rotate(' + this.rotate.a + ') ';

		this.element.parentNode.setAttribute( 'transform', _translate + _rotate);
	};
};

Circle.prototype.drawRope = function () {
	var _points = this.x 
				+ "," + this.y 
				+ " " 
				+ (this.px-this.translate.x) 
				+ ", " 
				+ (this.py-this.translate.y); 
	this.rope.setAttribute('points', _points);
};
