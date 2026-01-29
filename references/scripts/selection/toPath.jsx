// Expected global: tolerance (number, default 2)
var tolerance = (typeof tolerance !== 'undefined') ? tolerance : 2;
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(app.stringIDToTypeID("path"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
var ref2 = new ActionReference();
ref2.putProperty(app.stringIDToTypeID("selectionClass"), app.stringIDToTypeID("selection"));
desc1.putReference(app.stringIDToTypeID("from"), ref2);
desc1.putUnitDouble(app.stringIDToTypeID("tolerance"), app.stringIDToTypeID("pixelsUnit"), tolerance);
app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
