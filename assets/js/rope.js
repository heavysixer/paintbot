'use strict';

function Rope (_data, l) {
	var 
		_data      = _data || {},
		_l         = l || [],
		_translate = '',
		_rotate    = '',
	endvar;
	
	this.x           = 0; 
	this.y           = 0;
	this.element	 = document.querySelector(_data.id + ' polyline');
	this.translate   = [];
	this.rotate      = [];

	this.r = _data.r || 10;
	this.translate.x = _data.x || 0;
	this.translate.y = _data.y || 0;
	this.rotate.a    = _data.a || 0;

	this.px = _l.l1;
	this.py = _l.l2;

	this.draw = function () {

		var _points = this.x 
				+ "," + this.y 
				+ " " 
				+ (this.px-this.translate.x) 
				+ ", " 
				+ (this.py-this.translate.y); 
		this.element.setAttribute('points', _points);

		_translate = 'translate(' + this.translate.x + ", "+ this.translate.y + ') ';
		_rotate    = 'rotate(' + this.rotate.a + ') ';
		this.element.parentNode.setAttribute( 'transform', _translate + _rotate);
	};
};