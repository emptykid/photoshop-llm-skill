// Expected globals: filePath (string), format (string: "JPEG"|"PNGFormat"|"photoshop35Format"|"bMPFormat"), saveAsCopy (boolean, default false), docId (number - current document id)
var filePath = (typeof filePath !== 'undefined') ? filePath : '';
var format = (typeof format !== 'undefined') ? format : 'photoshop35Format';
var saveAsCopy = (typeof saveAsCopy !== 'undefined') ? saveAsCopy : false;
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
if (format == "JPEG") {
    desc2.putInteger(stringIDToTypeID("extendedQuality"), 12);
    desc2.putEnumerated(stringIDToTypeID("matteColor"), stringIDToTypeID("matteColor"), stringIDToTypeID("none"));
} else if (format == "PNGFormat") {
    desc2.putEnumerated(stringIDToTypeID("method"), stringIDToTypeID("PNGMethod"), stringIDToTypeID("quick"));
    desc2.putEnumerated(stringIDToTypeID("PNGInterlaceType"), stringIDToTypeID("PNGInterlaceType"), stringIDToTypeID("PNGInterlaceNone"));
    desc2.putEnumerated(stringIDToTypeID("PNGFilter"), stringIDToTypeID("PNGFilter"), stringIDToTypeID("PNGFilterAdaptive"));
    desc2.putInteger(stringIDToTypeID("compression"), 6);
    desc2.putEnumerated(stringIDToTypeID("embedIccProfileLastState"), stringIDToTypeID("embedOff"), stringIDToTypeID("embedOff"));
} else if (format == "photoshop35Format") {
    desc2.putBoolean(stringIDToTypeID("maximizeCompatibility"), true);
} else if (format == "bMPFormat") {
    desc2.putEnumerated(stringIDToTypeID("platform"), stringIDToTypeID("platform"), stringIDToTypeID("OS2"));
    desc2.putEnumerated(stringIDToTypeID("bitDepth"), stringIDToTypeID("bitDepth"), stringIDToTypeID("bitDepth24"));
}
desc1.putObject(stringIDToTypeID("as"), stringIDToTypeID(format), desc2);
desc1.putPath(stringIDToTypeID("in"), new File(filePath));
desc1.putInteger(stringIDToTypeID("documentID"), docId);
desc1.putBoolean(stringIDToTypeID("copy"), saveAsCopy);
desc1.putBoolean(stringIDToTypeID("lowerCase"), true);
app.executeAction(stringIDToTypeID("save"), desc1, DialogModes.NO);
