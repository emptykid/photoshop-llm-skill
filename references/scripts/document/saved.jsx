var a = new ActionReference();
a.putEnumerated(charIDToTypeID("Dcmn"), stringIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var documentDescriptor = app.executeActionGet(a);
documentDescriptor.hasKey(stringIDToTypeID("fileReference"));
