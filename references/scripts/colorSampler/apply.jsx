// Expected globals: x (number), y (number) - position in pixels
var x = (typeof x !== 'undefined') ? x : 0;
var y = (typeof y !== 'undefined') ? y : 0;
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(app.stringIDToTypeID("colorSampler"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
var desc2 = new ActionDescriptor();
desc2.putUnitDouble(app.stringIDToTypeID("horizontal"), app.stringIDToTypeID("pixelsUnit"), x);
desc2.putUnitDouble(app.stringIDToTypeID("vertical"), app.stringIDToTypeID("pixelsUnit"), y);
desc1.putObject(app.stringIDToTypeID("position"), app.stringIDToTypeID("paint"), desc2);
app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
