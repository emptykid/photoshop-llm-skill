var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(stringIDToTypeID("document"));
desc1.putReference(stringIDToTypeID("null"), ref1);
var ref2 = new ActionReference();
ref2.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
desc1.putReference(stringIDToTypeID("using"), ref2);
desc1.putInteger(stringIDToTypeID("version"), 5);
app.executeAction(stringIDToTypeID("make"), desc1, DialogModes.NO);
