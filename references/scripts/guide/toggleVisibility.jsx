var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putEnumerated(app.charIDToTypeID("Mn  "), app.charIDToTypeID("MnIt"), app.charIDToTypeID("Tgld"));
desc1.putReference(app.charIDToTypeID("null"), ref1);
app.executeAction(app.charIDToTypeID("slct"), desc1, DialogModes.NO);
