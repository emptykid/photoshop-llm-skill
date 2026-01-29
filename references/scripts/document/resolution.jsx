var ref = new ActionReference();
ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("resolution"));
ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var descriptor = app.executeActionGet(ref);
descriptor.getInteger(stringIDToTypeID("resolution"));
