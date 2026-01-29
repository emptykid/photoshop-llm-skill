var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putEnumerated(app.stringIDToTypeID("colorSampler"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("allEnum"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
app.executeAction(app.stringIDToTypeID("delete"), desc1, DialogModes.NO);
