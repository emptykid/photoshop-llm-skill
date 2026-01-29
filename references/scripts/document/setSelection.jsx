// Expected globals: left (number), top (number), right (number), bottom (number) - rect in pixels
var left = (typeof left !== 'undefined') ? left : 0;
var top = (typeof top !== 'undefined') ? top : 0;
var right = (typeof right !== 'undefined') ? right : 0;
var bottom = (typeof bottom !== 'undefined') ? bottom : 0;
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putProperty(stringIDToTypeID("channel"), stringIDToTypeID("selection"));
desc1.putReference(stringIDToTypeID("null"), ref1);
var rectDesc = new ActionDescriptor();
rectDesc.putUnitDouble(charIDToTypeID("Left"), stringIDToTypeID("pixelsUnit"), left);
rectDesc.putUnitDouble(charIDToTypeID("Top "), stringIDToTypeID("pixelsUnit"), top);
rectDesc.putUnitDouble(charIDToTypeID("Rght"), stringIDToTypeID("pixelsUnit"), right);
rectDesc.putUnitDouble(charIDToTypeID("Btom"), stringIDToTypeID("pixelsUnit"), bottom);
desc1.putObject(stringIDToTypeID("to"), stringIDToTypeID("rectangle"), rectDesc);
app.executeAction(stringIDToTypeID("set"), desc1, DialogModes.NO);
