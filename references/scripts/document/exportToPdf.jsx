// Expected globals: path (string), filename (string), docId (number, optional - current doc if not set)
var path = (typeof path !== 'undefined') ? path : '';
var filename = (typeof filename !== 'undefined') ? filename : 'export.pdf';
var docId = (typeof docId !== 'undefined') ? docId : 0;
if (docId === 0) {
    try {
        var documentReference = new ActionReference();
        documentReference.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("DocI"));
        documentReference.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var documentDescriptor = app.executeActionGet(documentReference);
        docId = documentDescriptor.getInteger(charIDToTypeID("DocI"));
    } catch (e) {}
}
var desc1 = new ActionDescriptor();
var desc2 = new ActionDescriptor();
desc2.putEnumerated(stringIDToTypeID("pdfCompatibilityLevel"), stringIDToTypeID("pdfCompatibilityLevel"), stringIDToTypeID("pdf15"));
desc2.putBoolean(stringIDToTypeID("pdfPreserveEditing"), false);
desc2.putInteger(stringIDToTypeID("pdfCompressionType"), 7);
desc2.putBoolean(stringIDToTypeID("pdfIncludeProfile"), false);
desc1.putObject(charIDToTypeID("As  "), charIDToTypeID("PhtP"), desc2);
desc1.putPath(charIDToTypeID("In  "), new File(path + '/' + filename));
desc1.putInteger(charIDToTypeID("DocI"), docId);
desc1.putBoolean(charIDToTypeID("Cpy "), true);
desc1.putBoolean(charIDToTypeID("Lyrs"), false);
desc1.putEnumerated(stringIDToTypeID("saveStage"), stringIDToTypeID("saveStageType"), stringIDToTypeID("saveSucceeded"));
app.executeAction(charIDToTypeID("save"), desc1, DialogModes.NO);
