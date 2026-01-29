var docId;
try {
    var documentReference = new ActionReference();
    documentReference.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("DocI"));
    documentReference.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var documentDescriptor = app.executeActionGet(documentReference);
    docId = documentDescriptor.getInteger(charIDToTypeID("DocI"));
} catch (e) {
    docId = 0;
}
docId === 0 ? null : docId;
