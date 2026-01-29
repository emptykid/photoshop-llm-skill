// Expected globals: left (number), top (number), right (number), bottom (number), unitType (string, default "pixelsUnit")
var left = (typeof left !== 'undefined') ? left : 0;
var top = (typeof top !== 'undefined') ? top : 0;
var right = (typeof right !== 'undefined') ? right : 0;
var bottom = (typeof bottom !== 'undefined') ? bottom : 0;
var unitType = (typeof unitType !== 'undefined') ? unitType : "pixelsUnit";
var result = new ActionDescriptor();
result.putUnitDouble(app.charIDToTypeID("Left"), app.stringIDToTypeID(unitType), left);
result.putUnitDouble(app.charIDToTypeID("Top "), app.stringIDToTypeID(unitType), top);
result.putUnitDouble(app.charIDToTypeID("Rght"), app.stringIDToTypeID(unitType), right);
result.putUnitDouble(app.charIDToTypeID("Btom"), app.stringIDToTypeID(unitType), bottom);
result;
