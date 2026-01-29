var ref = new ActionReference();
ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("format"));
ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var descriptor = app.executeActionGet(ref);
descriptor.getString(stringIDToTypeID("format"));
