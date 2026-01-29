var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putProperty(app.stringIDToTypeID("channel"), app.stringIDToTypeID("selection"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
var ref2 = new ActionReference();
ref2.putEnumerated(app.stringIDToTypeID("channel"), app.stringIDToTypeID("channel"), app.stringIDToTypeID("transparencyEnum"));
desc1.putReference(app.stringIDToTypeID("to"), ref2);
app.executeAction(app.stringIDToTypeID("set"), desc1, DialogModes.NO);
