// Expected globals: path (string), filename (string), docId (number, optional)
var path = (typeof path !== 'undefined') ? path : '';
var filename = (typeof filename !== 'undefined') ? filename : 'export.bmp';
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
desc2.putEnumerated(stringIDToTypeID("platform"), stringIDToTypeID("platform"), stringIDToTypeID("windows"));
desc2.putEnumerated(stringIDToTypeID("bitDepth"), stringIDToTypeID("bitDepth"), stringIDToTypeID("bitDepth24"));
desc2.putBoolean(stringIDToTypeID("compression"), false);
desc1.putObject(stringIDToTypeID("as"), stringIDToTypeID("bMPFormat"), desc2);
desc1.putPath(charIDToTypeID("In  "), new File(path + '/' + filename));
desc1.putInteger(stringIDToTypeID("documentID"), docId);
desc1.putBoolean(stringIDToTypeID("copy"), true);
desc1.putBoolean(stringIDToTypeID("lowerCase"), true);
desc1.putEnumerated(stringIDToTypeID("saveStage"), stringIDToTypeID("saveStageType"), stringIDToTypeID("saveSucceeded"));
app.executeAction(stringIDToTypeID("save"), desc1, DialogModes.NO);
