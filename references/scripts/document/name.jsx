var result;
try {
    var documentReference = new ActionReference();
    documentReference.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("Ttl "));
    documentReference.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var documentDescriptor = app.executeActionGet(documentReference);
    result = documentDescriptor.getString(charIDToTypeID("Ttl "));
} catch (e) {
    result = "";
}
result;
