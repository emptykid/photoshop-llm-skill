var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(app.stringIDToTypeID("layerSection"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
var ref2 = new ActionReference();
ref2.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
desc1.putReference(app.stringIDToTypeID("from"), ref2);
app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
