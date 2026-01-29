var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(app.stringIDToTypeID("layer"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
