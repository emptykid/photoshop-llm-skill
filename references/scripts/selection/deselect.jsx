var selectionDescriptor = new ActionDescriptor();
var selectionReference = new ActionReference();
selectionReference.putProperty(app.charIDToTypeID("Chnl"), app.charIDToTypeID("fsel"));
selectionDescriptor.putReference(app.charIDToTypeID("null"), selectionReference);
selectionDescriptor.putEnumerated(app.charIDToTypeID("T   "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("None"));
app.executeAction(app.charIDToTypeID("setd"), selectionDescriptor, DialogModes.NO);
