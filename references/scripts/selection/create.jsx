// Expected globals: left (number), top (number), right (number), bottom (number) - rect in pixels
var left = (typeof left !== 'undefined') ? left : 0;
var top = (typeof top !== 'undefined') ? top : 0;
var right = (typeof right !== 'undefined') ? right : 0;
var bottom = (typeof bottom !== 'undefined') ? bottom : 0;
var selectionDescriptor = new ActionDescriptor();
var selectionReference = new ActionReference();
selectionReference.putProperty(app.charIDToTypeID("Chnl"), app.charIDToTypeID("fsel"));
selectionDescriptor.putReference(app.charIDToTypeID("null"), selectionReference);
var rectDesc = new ActionDescriptor();
rectDesc.putUnitDouble(app.charIDToTypeID("Left"), app.stringIDToTypeID("pixelsUnit"), left);
rectDesc.putUnitDouble(app.charIDToTypeID("Top "), app.stringIDToTypeID("pixelsUnit"), top);
rectDesc.putUnitDouble(app.charIDToTypeID("Rght"), app.stringIDToTypeID("pixelsUnit"), right);
rectDesc.putUnitDouble(app.charIDToTypeID("Btom"), app.stringIDToTypeID("pixelsUnit"), bottom);
selectionDescriptor.putObject(app.charIDToTypeID("T   "), app.stringIDToTypeID("Rctn"), rectDesc);
app.executeAction(app.charIDToTypeID("setd"), selectionDescriptor, DialogModes.NO);
