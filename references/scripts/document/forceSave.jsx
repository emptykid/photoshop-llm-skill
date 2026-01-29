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
var docPath = null;
var a = new ActionReference();
a.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("fileReference"));
a.putEnumerated(charIDToTypeID("Dcmn"), stringIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var documentDescriptor = app.executeActionGet(a);
if (documentDescriptor.hasKey(stringIDToTypeID("fileReference"))) {
    docPath = documentDescriptor.getPath(stringIDToTypeID("fileReference"));
}
if (docPath !== null) {
    var desc1 = new ActionDescriptor();
    desc1.putPath(stringIDToTypeID("in"), docPath);
    desc1.putInteger(stringIDToTypeID("documentID"), docId);
    desc1.putEnumerated(stringIDToTypeID("saveStage"), stringIDToTypeID("saveStageType"), stringIDToTypeID("saveSucceeded"));
    app.executeAction(stringIDToTypeID("save"), desc1, DialogModes.NO);
}
