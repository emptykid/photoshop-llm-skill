var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
desc1.putReference(charIDToTypeID("null"), ref1);
app.executeAction(charIDToTypeID("Dplc"), desc1, DialogModes.NO);
