// Expected global: docId (number) - document id to set as active
var docId = (typeof docId !== 'undefined') ? docId : 0;
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putIdentifier(charIDToTypeID("Dcmn"), docId);
desc1.putReference(stringIDToTypeID("null"), ref1);
app.executeAction(stringIDToTypeID("select"), desc1, DialogModes.NO);
