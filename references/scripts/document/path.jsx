var result;
var a = new ActionReference();
a.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("fileReference"));
a.putEnumerated(charIDToTypeID("Dcmn"), stringIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var documentDescriptor = app.executeActionGet(a);
if (documentDescriptor.hasKey(stringIDToTypeID("fileReference"))) {
    result = documentDescriptor.getPath(stringIDToTypeID("fileReference"));
} else {
    result = null;
}
result;
