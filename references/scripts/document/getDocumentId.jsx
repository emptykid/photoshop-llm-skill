var result;
try {
    var documentReference = new ActionReference();
    documentReference.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("DocI"));
    documentReference.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var documentDescriptor = app.executeActionGet(documentReference);
    result = documentDescriptor.getInteger(charIDToTypeID("DocI"));
} catch (e) {
    result = 0;
}
result;
