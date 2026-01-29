// Expected globals: x (number), y (number), right (number), bottom (number) - rect bounds in px
var x = (typeof x !== 'undefined') ? x : 0;
var y = (typeof y !== 'undefined') ? y : 0;
var right = (typeof right !== 'undefined') ? right : 0;
var bottom = (typeof bottom !== 'undefined') ? bottom : 0;
app.activeDocument.crop([UnitValue(x, 'px'), UnitValue(y, 'px'), UnitValue(right, 'px'), UnitValue(bottom, 'px')]);
